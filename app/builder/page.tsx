export const dynamic = "force-dynamic";
export const revalidate = 0;
"use client";

import { BuilderShell } from "@/components/builder/BuilderShell";
import { SaveStatus, type SaveState } from "@/components/builder/SaveStatus";
import { Sidebar } from "@/components/builder/Sidebar";
import { StepCarrierIssue } from "@/components/builder/steps/StepCarrierIssue";
import { StepContentsValue } from "@/components/builder/steps/StepContentsValue";
import { StepEvidenceUploads } from "@/components/builder/steps/StepEvidenceUploads";
import { StepReviewGenerate } from "@/components/builder/steps/StepReviewGenerate";
import { StepShipmentDetails } from "@/components/builder/steps/StepShipmentDetails";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PacketDraft, PacketSummary } from "@/lib/packets/types";
import { validateStep } from "@/lib/packets/validation";
import { useCallback, useEffect, useMemo, useState, type ReactElement } from "react";
import Link from "next/link";

type StepComponentProps = {
  draft: PacketDraft;
  errors: Record<string, string>;
  onChange: <K extends keyof PacketDraft>(key: K, value: PacketDraft[K]) => void;
};

const steps: { title: string; component: (props: StepComponentProps) => ReactElement }[] = [
  { title: "Carrier & issue", component: StepCarrierIssue },
  { title: "Shipment details", component: StepShipmentDetails },
  { title: "Contents & value", component: StepContentsValue },
  { title: "Evidence uploads", component: StepEvidenceUploads },
  { title: "Review & generate", component: StepReviewGenerate },
];

export default function BuilderPage() {
  const [draft, setDraft] = useState<PacketDraft | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [dirty, setDirty] = useState(false);

  const StepComponent = useMemo(() => steps[currentStep].component, [currentStep]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const listRes = await fetch("/api/packets", { cache: "no-store" });
        if (!listRes.ok) throw new Error("Failed to load packets");
        const listJson = (await listRes.json()) as { packets: PacketSummary[] };

        const chosenId = pickPacketId(listJson.packets);
        if (chosenId) {
          const packet = await fetchPacket(chosenId);
          setDraft(packet);
        } else {
          const created = await createPacket();
          setDraft(created);
        }

        setHasLoaded(true);
        setSaveState("saved");
        setDirty(false);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Unable to load packet");
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const handleChange = useCallback(
    <K extends keyof PacketDraft>(key: K, value: PacketDraft[K]) => {
      setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
      setDirty(true);
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    },
    [],
  );

  const persistDraft = useCallback(async () => {
    if (!dirty || !draft) return;
    try {
      setSaveState("saving");
      const updated = await saveDraft(draft);
      setDraft(updated);
      setDirty(false);
      setSaveState("saved");
    } catch (error) {
      console.error(error);
      setSaveState("error");
    }
  }, [dirty, draft]);

  const handleBlur = useCallback(() => {
    void persistDraft();
  }, [persistDraft]);

  const handleNext = () => {
    if (!draft) return;
    const result = validateStep(currentStep, draft);
    setErrors(result.errors);
    if (result.ok) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md space-y-4 text-center">
          <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700">
            PARCELSCRIBE
          </Link>
          <Card className="p-6 text-center text-gray-700">Loading the PARCELSCRIBE BUILDER...</Card>
        </div>
      </main>
    );
  }

  if (loadError || !draft) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md space-y-4 text-center">
          <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700">
            PARCELSCRIBE
          </Link>
          <Card className="p-6 text-center text-red-700">{loadError ?? "Unable to load packet"}</Card>
        </div>
      </main>
    );
  }

  return (
    <BuilderShell
      title="Build your UPS/FedEx claim packet"
      subtitle="Fill out the steps, we will generate the packet in the next chunk."
      sidebar={
        <Sidebar
          draft={draft}
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      }
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</div>
        <SaveStatus state={saveState} />
      </div>

      <div onBlurCapture={handleBlur}>
        <StepComponent draft={draft} errors={errors} onChange={handleChange} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        <div className="flex items-center gap-3">
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </BuilderShell>
  );
}

function pickPacketId(packets: PacketSummary[]) {
  const draft = packets.find((p) => p.status === "draft");
  return draft?.id ?? packets[0]?.id ?? null;
}

async function fetchPacket(id: string): Promise<PacketDraft> {
  const res = await fetch(`/api/packets/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch packet");
  }
  const json = (await res.json()) as { packet: PacketDraft };
  return json.packet;
}

async function createPacket(): Promise<PacketDraft> {
  const res = await fetch(`/api/packets`, { method: "POST" });
  if (!res.ok) {
    throw new Error("Failed to create packet");
  }
  const json = (await res.json()) as { packet: PacketDraft };
  return json.packet;
}

async function saveDraft(draft: PacketDraft): Promise<PacketDraft> {
  const { id, user_id, created_at, updated_at, ...payload } = draft;
  const res = await fetch(`/api/packets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to save packet");
  }

  const json = (await res.json()) as { packet: PacketDraft };
  return json.packet;
}

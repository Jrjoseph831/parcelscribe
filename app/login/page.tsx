"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorText, Help, Input, Label } from "@/components/ui/Form";
import Link from "next/link";
import { type FormEvent, useState } from "react";

type Mode = "signin" | "signup";
type Status = "idle" | "loading" | "success" | "error";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    if (mode === "signin") {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok || json?.error) {
        setStatus("error");
        setMessage(json?.error ?? "Unable to sign in.");
        return;
      }

      setStatus("success");
      setMessage("Signed in. Redirecting...");
      window.location.href = "/builder";
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = (await res.json().catch(() => null)) as { error?: string; needs_confirmation?: boolean } | null;

    if (!res.ok || json?.error) {
      setStatus("error");
      setMessage(json?.error ?? "Unable to create account.");
      return;
    }

    if (json?.needs_confirmation) {
      setStatus("success");
      setMessage("Check your email to confirm, then sign in.");
      return;
    }

    setStatus("success");
    setMessage("Account created. Redirecting...");
    window.location.href = "/builder";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Welcome</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="text-gray-600">
            {mode === "signin"
              ? "Use your email and password to access the PARCELSCRIBE BUILDER."
              : "Create your PARCELSCRIBE account to start a claim packet."}
          </p>
        </div>

        <Card className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
              <Help>Minimum 6 characters.</Help>
            </div>

            {status === "error" && message ? <ErrorText>{message}</ErrorText> : null}
            {status === "success" && message ? (
              <p className="text-sm text-green-600">{message}</p>
            ) : null}

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading"
                ? mode === "signin"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>
        </Card>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {mode === "signin" ? "Need an account?" : "Already have an account?"}
          </span>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setStatus("idle");
              setMessage(null);
            }}
          >
            {mode === "signin" ? "Create account" : "Sign in"}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Prefer to start later?</span>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function GuideNotFound() {
  return (
    <main className="bg-white px-4 py-16 md:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Guide</p>
        <h1 className="text-3xl font-semibold text-gray-900">Guide not found</h1>
        <p className="text-base text-gray-700">That guide is not available. Check the list and pick another.</p>
        <div className="mt-4 flex justify-center">
          <Link className={buttonClasses("primary")} href="/guides">
            Back to guides
          </Link>
        </div>
      </div>
    </main>
  );
}

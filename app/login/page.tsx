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
    <main className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
            Parcelscribe
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/guides" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Guides
            </Link>
            <Link href="/pricing" className="text-sm text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] mb-6">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-[15px] text-[#6e6e73]">
              {mode === "signin"
                ? "Sign in to continue building your claim packet."
                : "Get started with Parcelscribe in seconds."}
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
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
                  placeholder="Enter your password"
                />
                <Help>Minimum 6 characters</Help>
              </div>

              {status === "error" && message ? <ErrorText>{message}</ErrorText> : null}
              {status === "success" && message ? (
                <p className="text-[14px] text-[#30d158] font-medium flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {message}
                </p>
              ) : null}

              <Button type="submit" className="w-full text-[15px] py-3" disabled={status === "loading"}>
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

          {/* Toggle Mode */}
          <div className="text-center">
            <p className="text-[14px] text-[#6e6e73]">
              {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="ml-2 text-[#0071e3] hover:text-[#0077ed] font-medium transition-colors"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setStatus("idle");
                  setMessage(null);
                }}
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Back Home */}
          <div className="text-center">
            <Link href="/" className="text-[14px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

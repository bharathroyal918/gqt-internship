"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  GraduationCap,
  Building2,
  Lock,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<"student" | "company" | "college">("student");
  const [authMethod, setAuthMethod] = useState<"password" | "otp">("password");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState("rohan.patil@student.rvce.ac.in");
  const [password, setPassword] = useState("••••••••");
  const [phone, setPhone] = useState("9845012345");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", {
        description: `Logged in as ${role.toUpperCase()} account.`,
      });
      router.push("/dashboard");
    }, 900);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    toast.info("One-Time Password (OTP) Sent!", {
      description: `6-digit verification code sent to +91 ${phone} and registered email.`,
    });
  };

  return (
    <div className="min-h-screen bg-brand-slate flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="h-12 w-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6 text-amber-400" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-lg text-brand-navy block leading-tight">
              GLOBAL QUEST
            </span>
            <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
              Technologies Portal
            </span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign in to your Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Access your VTU internships, application tracking, and verified certificates.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-soft-xl rounded-3xl border border-slate-200/80">
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-2xl gap-1 mb-6 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                role === "student"
                  ? "bg-white text-brand-blue shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("company")}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                role === "company"
                  ? "bg-white text-brand-blue shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Company HR
            </button>
            <button
              type="button"
              onClick={() => setRole("college")}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                role === "college"
                  ? "bg-white text-brand-blue shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Placement Officer
            </button>
          </div>

          {/* Auth Method Toggle: Password vs OTP */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMethod("password")}
                className={`pb-1 border-b-2 transition-colors ${
                  authMethod === "password"
                    ? "border-brand-blue text-brand-blue font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod("otp")}
                className={`pb-1 border-b-2 transition-colors ${
                  authMethod === "otp"
                    ? "border-brand-blue text-brand-blue font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                OTP Instant Login
              </button>
            </div>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
              VTU 2FA Protected
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {authMethod === "password" ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {role === "student"
                      ? "Institutional Email / USN"
                      : role === "company"
                      ? "Work Email"
                      : "College Officer Email"}
                  </label>
                  <Input
                    type="text"
                    required
                    icon={<Mail className="h-4 w-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-xs text-brand-blue hover:underline font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      icon={<Lock className="h-4 w-4" />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-brand-blue focus:ring-brand-blue"
                    />
                    <span>Remember this browser for 30 days</span>
                  </label>
                </div>
              </>
            ) : (
              /* OTP Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      required
                      icon={<Smartphone className="h-4 w-4" />}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleSendOtp}
                      className="whitespace-nowrap"
                    >
                      {otpSent ? "Resend OTP" : "Get OTP"}
                    </Button>
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="flex gap-2 justify-between">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          defaultValue={idx + 1}
                          className="w-12 h-12 text-center font-mono font-bold text-lg border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Demo code prefilled: 123456
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full rounded-xl shadow-soft font-bold mt-4"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick Demo Credentials Reminder */}
          <div className="mt-6 p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-blue" />
              <span>
                <strong>Demo Mode Active:</strong> Click Sign In to preview Student Dashboard.
              </span>
            </div>
            <Link
              href="/dashboard"
              className="text-brand-blue font-bold hover:underline"
            >
              Direct Access →
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <Modal
          isOpen={forgotModalOpen}
          onClose={() => setForgotModalOpen(false)}
          title="Reset Account Password"
          description="Enter your registered email address to receive password reset instructions."
        >
          <div className="space-y-4 text-xs">
            <Input
              type="email"
              placeholder="name@student.college.ac.in"
              defaultValue={email}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setForgotModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setForgotModalOpen(false);
                  toast.success("Password reset link emailed!");
                }}
              >
                Send Reset Link
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

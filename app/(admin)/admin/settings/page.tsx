"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Building2,
  Key,
  MessageSquare,
  CreditCard,
  Image,
  Users,
  ShieldCheck,
  Save,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [orgName, setOrgName] = useState("Global Quest Technologies");
  const [orgEmail, setOrgEmail] = useState("admin@gqtech.in");
  const [orgPhone, setOrgPhone] = useState("+91 080 4920 7800");
  const [vtuAffiliationCode, setVtuAffiliationCode] = useState("VTU-GQT-2026-REG");

  // Integrations state
  const [smtpHost, setSmtpHost] = useState("smtp.sendgrid.net");
  const [smtpUser, setSmtpUser] = useState("apikey");
  const [whatsappApiToken, setWhatsappApiToken] = useState("wh_sec_9948271049281");
  const [razorpayKey, setRazorpayKey] = useState("rzp_live_8984920194");
  const [cloudinaryCloud, setCloudinaryCloud] = useState("gqt-media-cdn");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("System Settings Saved!", {
      description: "Organization parameters and gateway credentials updated.",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Portal & System Administration Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure organization branding, API gateways, third-party integrations, and administrative roles.
        </p>
      </div>

      <Tabs defaultValue="org">
        <TabsList className="grid grid-cols-3 sm:grid-cols-4 max-w-lg mb-4">
          <TabsTrigger value="org">Organization</TabsTrigger>
          <TabsTrigger value="integrations">Gateways</TabsTrigger>
          <TabsTrigger value="team">Admin Team</TabsTrigger>
          <TabsTrigger value="security">Compliance</TabsTrigger>
        </TabsList>

        {/* Tab 1: Organization Profile */}
        <TabsContent value="org">
          <form
            onSubmit={handleSaveSettings}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4 text-xs"
          >
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              GQT Corporate Branding & Headquarters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Portal Organization Name
                </label>
                <Input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  VTU Partnership Accreditation Token
                </label>
                <Input
                  value={vtuAffiliationCode}
                  onChange={(e) => setVtuAffiliationCode(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Official Administrative Email
                </label>
                <Input
                  type="email"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Helpline Contact
                </label>
                <Input
                  value={orgPhone}
                  onChange={(e) => setOrgPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button type="submit" variant="primary" size="sm">
                <Save className="h-4 w-4 mr-1" />
                <span>Save Organization Info</span>
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Tab 2: Integrations & API Placeholders */}
        <TabsContent value="integrations">
          <form
            onSubmit={handleSaveSettings}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-6 text-xs"
          >
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              API Gateways & Notification Integrations
            </h2>

            {/* SMTP */}
            <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Key className="h-4 w-4 text-brand-blue" />
                <span>SMTP Email Delivery Server</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Host"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                />
                <Input
                  placeholder="Username / API Key"
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                />
              </div>
            </div>

            {/* WhatsApp Business API */}
            <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp Business Cloud API Token</span>
              </div>
              <Input
                type="password"
                value={whatsappApiToken}
                onChange={(e) => setWhatsappApiToken(e.target.value)}
              />
            </div>

            {/* Razorpay Config */}
            <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <CreditCard className="h-4 w-4 text-brand-blue" />
                <span>Razorpay Verification & Evaluation Gateway</span>
              </div>
              <Input
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
              />
            </div>

            {/* Cloudinary */}
            <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Image className="h-4 w-4 text-amber-600" />
                <span>Cloudinary Media Cloud Bucket</span>
              </div>
              <Input
                value={cloudinaryCloud}
                onChange={(e) => setCloudinaryCloud(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button type="submit" variant="primary" size="sm">
                <Save className="h-4 w-4 mr-1" />
                <span>Update Gateway Keys</span>
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Tab 3: Admin Team */}
        <TabsContent value="team">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Authorized Administrative Users</span>
              <Button size="sm" variant="outline" className="text-xs h-8">
                + Invite Officer
              </Button>
            </h2>

            <div className="divide-y divide-slate-100">
              {[
                {
                  name: "Dr. Arvind K. Swamy",
                  email: "arvind.swamy@gqtech.in",
                  role: "Super Administrator",
                  status: "Active",
                },
                {
                  name: "Dr. Malathi N. Rao",
                  email: "malathi.rao@gqtech.in",
                  role: "Academic Directorate Head",
                  status: "Active",
                },
                {
                  name: "Sandeep V. Murthy",
                  email: "sandeep.murthy@gqtech.in",
                  role: "Industry Placement Officer",
                  status: "Active",
                },
              ].map((adm, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{adm.name}</h3>
                    <p className="text-slate-500 text-[11px]">{adm.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md">
                      {adm.role}
                    </span>
                    <Badge variant="success">{adm.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Compliance */}
        <TabsContent value="security">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              VTU & AICTE Data Protection Compliance
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Student institutional records and cryptographic hashes are encrypted at rest with AES-256 and synchronized daily with the Visvesvaraya Technological University regional verification cache in Belagavi.
            </p>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Security Audit Passed: ISO 27001 & VTU 2026 Scheme</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Last integrity checksum validated today at 04:00 AM IST.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

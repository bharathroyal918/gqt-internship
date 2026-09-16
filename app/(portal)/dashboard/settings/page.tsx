"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Settings,
  Lock,
  Moon,
  Sun,
  Bell,
  Trash2,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function StudentSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Notification Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [vtuCircularAlerts, setVtuCircularAlerts] = useState(true);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password Updated Successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    toast.error("Account Scheduled for Deletion (Demo)", {
      description: "Data retention period: 30 days under VTU record guidelines.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Account & Privacy Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your credentials, notification channels, and security settings.
        </p>
      </div>

      {/* Security: Password Update */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lock className="h-4 w-4 text-brand-blue" />
          <span>Change Password</span>
        </h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <Input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password
            </label>
            <Input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <Input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="sm" className="rounded-xl">
            Update Password
          </Button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Bell className="h-4 w-4 text-brand-blue" />
          <span>Notification Preferences</span>
        </h2>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">
                Email Notifications
              </span>
              <span className="text-slate-500">
                Receive offer letters, interview invites, and recruiter feedback.
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-brand-blue"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">
                WhatsApp Urgent Alerts
              </span>
              <span className="text-slate-500">
                Direct WhatsApp messages for same-day interview confirmations.
              </span>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-brand-blue"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">
                VTU Circular Broadcasts
              </span>
              <span className="text-slate-500">
                Official notifications regarding curriculum credits and exam dates.
              </span>
            </div>
            <input
              type="checkbox"
              checked={vtuCircularAlerts}
              onChange={(e) => setVtuCircularAlerts(e.target.checked)}
              className="h-4 w-4 rounded text-brand-blue"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-200 space-y-3">
        <h2 className="text-sm font-bold text-rose-700 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-rose-600" />
          <span>Danger Zone</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Deleting your student account will permanently withdraw active applications and unlink your VTU credits portfolio from the portal.
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setDeleteModalOpen(true)}
          className="rounded-xl mt-1"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          <span>Delete Student Account</span>
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Account Confirmation"
          description="Are you absolutely sure you want to proceed?"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <p>
              This will remove all your submitted applications, bookmarked internships, and cached verification tokens.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

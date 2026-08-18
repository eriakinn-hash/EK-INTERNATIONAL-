import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { EK_LOGO_SRC } from '../constants/branding';
import { resizeImageToDataUrl } from '../utils/imageUtils';
import {
  X,
  User,
  ShieldCheck,
  Lock,
  Mail,
  Award,
  Key,
  CheckCircle2,
  AlertCircle,
  Phone,
  LogOut,
  Edit3,
  Save,
  Camera,
  Check,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Trash2,
  Link as LinkIcon
} from 'lucide-react';

const AVATAR_PRESETS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Jordan',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Morgan',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Taylor',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Casey',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Riley',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Sam',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Nova'
];

export const UserProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [pinCode, setPinCode] = useState(user.pinCode);
  const [avatar, setAvatar] = useState(user.avatar);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    logout();
  };

  const handleStartEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || '');
    setPinCode(user.pinCode);
    setAvatar(user.avatar);
    setCustomUrlInput('');
    setShowUrlInput(false);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsEditing(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }

    // Check file size (max 5MB before compression)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image file is too large. Please select a photo under 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);
      const dataUrl = await resizeImageToDataUrl(file, 256);
      setAvatar(dataUrl);
      setIsUploading(false);
      setSuccessMessage('Photo uploaded successfully! Click "Save Changes" to apply.');
    } catch (err) {
      setIsUploading(false);
      setErrorMessage('Failed to process uploaded image. Please try another photo.');
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    setAvatar(customUrlInput.trim());
    setShowUrlInput(false);
    setSuccessMessage('Custom avatar URL selected. Click "Save Changes" to apply.');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPin = pinCode.trim();

    if (!cleanName) {
      setErrorMessage('Full Name is required.');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!cleanPhone) {
      setErrorMessage('Mobile Money phone number is required.');
      return;
    }
    if (cleanPin.length !== 4 || !/^\d{4}$/.test(cleanPin)) {
      setErrorMessage('Security PIN must be exactly 4 digits.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const result = updateProfile({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        pinCode: cleanPin,
        avatar
      });

      setIsSaving(false);
      if (result.success) {
        setSuccessMessage('Profile and profile picture saved to Firebase!');
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          setIsEditing(false);
          setSuccessMessage(null);
        }, 900);
      } else {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {isEditing ? 'Edit Profile & Picture' : 'Account & Security Profile'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEditing ? 'Upload new photo, update personal details & PIN' : 'EKWorld Verified Member Profile'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {!isEditing ? (
          /* VIEW MODE */
          <div className="mt-5 space-y-4 text-xs">
            {/* User Card */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/50 bg-slate-900 shadow-md shadow-amber-500/10"
                />
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    {user.name}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {user.vipTier} VIP
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">{user.email}</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">● Firebase Synced</div>
                </div>
              </div>
              <button
                id="edit-profile-btn"
                onClick={handleStartEdit}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile fields */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400">Account ID:</span>
                <span className="font-mono-num font-bold text-slate-200">{user.id}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400">Mobile Money Phone:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {user.phone || 'Not set (Tap Edit)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400">Identity / KYC Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Tier 2
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400">Security PIN (4-Digit):</span>
                <span className="font-mono font-bold text-amber-400 tracking-widest">{user.pinCode}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400">Referral Code:</span>
                <span className="font-mono font-bold text-cyan-400">{user.referralCode}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Firebase Cloud Security Active: 2FA, Vault rules & PIN authorization enforced.</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-2.5">
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* EDIT MODE FORM */
          <form onSubmit={handleSaveProfile} className="mt-5 space-y-4 text-xs">
            
            {/* Profile Picture Upload & Selector Section */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-200 font-bold flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Profile Picture</span>
                </label>
                {avatar.startsWith('data:') && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    Custom Upload Active
                  </span>
                )}
              </div>

              {/* Preview & Upload Actions */}
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <img
                    src={avatar}
                    alt="Preview"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/60 bg-slate-900 shadow-md"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex items-center justify-center text-amber-400">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      id="upload-photo-btn"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Image URL</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Upload from device (JPG, PNG, WEBP) or pick a preset avatar below.
                  </p>
                </div>
              </div>

              {/* Custom URL Input dropdown */}
              {showUrlInput && (
                <div className="flex gap-2 pt-2 border-t border-slate-800/80 animate-in fade-in">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-xs outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Preset Gallery */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 font-medium block mb-2">
                  Or select a Cyber Avatar:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {AVATAR_PRESETS.map((presetUrl, idx) => {
                    const isSelected = avatar === presetUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(presetUrl)}
                        className={`relative p-1 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/40'
                            : 'border-slate-800 hover:border-slate-700 bg-slate-900'
                        }`}
                      >
                        <img
                          src={presetUrl}
                          alt={`Avatar ${idx + 1}`}
                          className="w-8 h-8 mx-auto rounded-lg object-cover"
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="edit-profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Legal Name"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-white outline-none font-medium transition-colors"
                  required
                />
              </div>
            </div>

            {/* Mobile Money Phone */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Mobile Money Phone (MTN / Airtel Uganda)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="edit-profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +256 772 123456 or 0772123456"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-white font-mono outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="edit-profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-white outline-none font-medium transition-colors"
                  required
                />
              </div>
            </div>

            {/* 4-Digit Security PIN */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                <span>Withdrawal Security PIN (4 Digits)</span>
                <span className="text-[10px] text-amber-400 font-normal">Used for instant Mobile Money payouts</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="edit-profile-pin"
                  type="text"
                  maxLength={4}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="1234"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-amber-400 font-mono font-bold tracking-widest text-base outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                id="save-profile-btn"
                type="submit"
                disabled={isSaving || isUploading}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

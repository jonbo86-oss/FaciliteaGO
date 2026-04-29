"use client";

import { setStoredLang, type Lang } from "@/lib/i18n";

export default function LanguageToggle({ lang, setLang, dark = false }: { lang: Lang; setLang: (lang: Lang) => void; dark?: boolean }) {
  function change(next: Lang) {
    setLang(next);
    setStoredLang(next);
  }

  return (
    <div className={`flex items-center gap-1 rounded-full p-1 ${dark ? "bg-white/10" : "bg-blue-50"}`}>
      <button
        onClick={() => change("es")}
        className={`rounded-full px-2 py-1 text-base transition ${lang === "es" ? "grayscale opacity-40" : "opacity-100"}`}
        title="Español"
      >
        🇪🇸
      </button>
      <button
        onClick={() => change("ca")}
        className={`rounded-full px-2 py-1 text-xs font-black transition ${dark ? "text-caixa-yellow" : "text-[#a32626]"} ${lang === "ca" ? "grayscale opacity-40" : "opacity-100"}`}
        title="Català"
      >
        CAT
      </button>
    </div>
  );
}

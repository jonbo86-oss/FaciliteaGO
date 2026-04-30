"use client";

import { Store } from "lucide-react";

export default function MerchantDirectoryShortcut() {
  return (
    <a
      href="/comercios"
      className="fixed bottom-6 left-6 z-[89] hidden items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black text-[#002B5C] shadow-2xl ring-1 ring-blue-100 transition hover:-translate-y-0.5 hover:bg-[#FFCC00] md:flex"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0072CE] text-white"><Store className="h-5 w-5" /></span>
      Buscar comercios
    </a>
  );
}

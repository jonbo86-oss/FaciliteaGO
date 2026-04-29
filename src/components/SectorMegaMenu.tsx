"use client";

import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { sectorMenuGroups } from "@/lib/sectors";

type Props = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function SectorMegaMenu({ selectedCategory, onSelectCategory }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const activeGroup = sectorMenuGroups.find((group) => group.title === openGroup) ?? null;

  function selectSector(sector: string) {
    onSelectCategory(sector);
    setOpenGroup(null);
  }

  function openOrClose(groupTitle: string) {
    setOpenGroup((current) => current === groupTitle ? null : groupTitle);
  }

  return (
    <nav className="relative bg-[#002B5C] text-white" onMouseLeave={() => setOpenGroup(null)}>
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-4 md:px-6">
        <button
          onMouseEnter={() => setOpenGroup(null)}
          onClick={() => onSelectCategory("Todos")}
          className={`text-[15px] font-black transition ${selectedCategory === "Todos" ? "text-[#FFCC00]" : "text-white hover:text-[#FFCC00]"}`}
        >
          Todos
        </button>

        <div className="hidden flex-1 items-center gap-7 overflow-x-auto md:flex">
          {sectorMenuGroups.map((group) => (
            <button
              key={group.title}
              onMouseEnter={() => setOpenGroup(group.title)}
              onFocus={() => setOpenGroup(group.title)}
              onClick={() => openOrClose(group.title)}
              className={`whitespace-nowrap text-[15px] font-black transition ${openGroup === group.title ? "text-[#FFCC00]" : "text-white hover:text-[#FFCC00]"}`}
            >
              {group.title}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#002B5C] shadow-sm">
            Buscar <Search className="h-4 w-4" />
          </button>
        </div>

        <select
          className="w-full rounded-2xl bg-white px-4 py-2 text-sm font-black text-[#002B5C] md:hidden"
          value={selectedCategory}
          onChange={(event) => onSelectCategory(event.target.value)}
        >
          <option value="Todos">Todos</option>
          {sectorMenuGroups.flatMap((group) => group.sectors).map((sector) => <option key={sector} value={sector}>{sector}</option>)}
        </select>
      </div>

      {activeGroup && (
        <div className="absolute left-0 right-0 top-full z-[80] border-t border-white/10 bg-white/80 text-slate-950 shadow-[0_24px_50px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-8 py-8">
            <button
              onClick={() => setOpenGroup(null)}
              className="mb-9 flex items-center gap-2 text-lg font-semibold text-[#002B5C] transition hover:text-[#0072CE]"
            >
              Ir a {activeGroup.title} <ChevronRight className="h-5 w-5" />
            </button>

            <div className="grid gap-x-16 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {activeGroup.sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => selectSector(sector)}
                  className="border-b border-[#002B5C]/25 pb-3 text-left text-base font-black text-[#002B5C] transition hover:border-[#0072CE] hover:text-[#0072CE]"
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { sectorMenuGroups } from "@/lib/sectors";

type Props = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function SectorMegaMenu({ selectedCategory, onSelectCategory }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const activeGroup = sectorMenuGroups.find((group) => group.title === openGroup) ?? sectorMenuGroups[0];

  function selectSector(sector: string) {
    onSelectCategory(sector);
    setOpenGroup(null);
  }

  return (
    <div className="border-b border-blue-100 bg-[#004750] text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-7 px-4 py-3 md:px-6">
        <button onClick={() => onSelectCategory("Todos")} className={`text-sm font-black ${selectedCategory === "Todos" ? "text-[#FFCC00]" : "text-white"}`}>Todos</button>
        <div className="hidden flex-1 items-center gap-6 overflow-x-auto md:flex">
          {sectorMenuGroups.map((group) => (
            <button
              key={group.title}
              onMouseEnter={() => setOpenGroup(group.title)}
              onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
              className={`whitespace-nowrap text-sm font-black transition ${openGroup === group.title ? "text-[#FFCC00]" : "text-white hover:text-[#FFCC00]"}`}
            >
              {group.title}
            </button>
          ))}
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
      {openGroup && (
        <div onMouseLeave={() => setOpenGroup(null)} className="absolute left-0 right-0 z-40 border-b border-slate-200 bg-white text-slate-950 shadow-2xl">
          <div className="mx-auto max-w-7xl px-8 py-8">
            <button onClick={() => setOpenGroup(null)} className="mb-8 flex items-center gap-2 text-lg font-semibold text-slate-800">
              Ir a {activeGroup.title} <ChevronRight className="h-5 w-5" />
            </button>
            <div className="grid gap-x-14 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {activeGroup.sectors.map((sector) => (
                <button key={sector} onClick={() => selectSector(sector)} className="border-b border-slate-300 pb-3 text-left text-base font-black text-slate-900 transition hover:text-[#0072CE]">
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

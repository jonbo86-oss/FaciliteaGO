"use client";

import { useEffect } from "react";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function forceAllCategoriesIfTextSearch() {
  const input = document.querySelector<HTMLInputElement>('input[placeholder*="Busca"], input[placeholder*="pinzas"], input[placeholder*="gominolas"]');
  const value = normalize(input?.value ?? "");
  if (!value) return;

  const allButton = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find((button) => normalize(button.textContent ?? "") === "todos");
  allButton?.click();
}

function scrollToResults() {
  const headings = Array.from(document.querySelectorAll<HTMLElement>("h2"));
  const resultsHeading = headings.find((heading) => {
    const text = normalize(heading.textContent ?? "");
    return text.includes("productos") || text.includes("disponibles") || text.includes("ferretería") || text.includes("bricolaje") || text.includes("souvenirs");
  });

  const target = resultsHeading?.closest("section") ?? document.querySelector("section:nth-of-type(2)");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (target instanceof HTMLElement) {
    target.classList.add("faciliteago-search-highlight");
    window.setTimeout(() => target.classList.remove("faciliteago-search-highlight"), 1200);
  }
}

function showToast() {
  const previous = document.getElementById("faciliteago-search-toast");
  previous?.remove();

  const toast = document.createElement("div");
  toast.id = "faciliteago-search-toast";
  toast.textContent = "Resultados actualizados";
  toast.style.position = "fixed";
  toast.style.left = "50%";
  toast.style.bottom = "28px";
  toast.style.transform = "translateX(-50%)";
  toast.style.zIndex = "9999";
  toast.style.background = "#002B5C";
  toast.style.color = "white";
  toast.style.fontWeight = "900";
  toast.style.fontSize = "14px";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "999px";
  toast.style.boxShadow = "0 18px 45px rgba(15,23,42,0.28)";
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 1400);
}

function executeSearch() {
  forceAllCategoriesIfTextSearch();
  window.setTimeout(() => {
    scrollToResults();
    showToast();
  }, 80);
}

export default function SearchButtonEnhancer() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .faciliteago-search-highlight {
        transition: box-shadow 0.25s ease, transform 0.25s ease;
        box-shadow: 0 0 0 5px rgba(255, 204, 0, 0.55), 0 24px 60px rgba(0, 43, 92, 0.18);
        border-radius: 28px;
      }
    `;
    document.head.appendChild(style);

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button) return;
      const text = normalize(button.textContent ?? "");
      if (text === "buscar") executeSearch();
    }

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (event.key !== "Enter") return;
      if (target?.tagName !== "INPUT") return;
      const input = target as HTMLInputElement;
      const placeholder = normalize(input.placeholder ?? "");
      if (placeholder.includes("busca") || placeholder.includes("pinzas") || placeholder.includes("gominolas")) {
        executeSearch();
      }
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      style.remove();
    };
  }, []);

  return null;
}

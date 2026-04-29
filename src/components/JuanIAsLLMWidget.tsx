"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

const juaniasImage = "https://i.imgur.com/LfWe8VX.png";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  store: string;
};

const starterPrompts = [
  "Quiero un regalo para un niño",
  "Necesito herramientas para una reforma",
  "Busca productos en promoción cerca",
  "Ordéname opciones por cercanía"
];

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem("faciliteago-cart") || "[]");
  } catch {
    return [];
  }
}

function readLocation() {
  if (typeof window === "undefined") return "Las Ramblas, Barcelona";
  return window.localStorage.getItem("faciliteago-location") || "Las Ramblas, Barcelona";
}

function renderMessage(text: string) {
  const parts = text.split(/\[([^\]]+)\]\((\/producto\/[^)]+)\)/g);
  return parts.map((part, index) => {
    if (index % 3 === 1) {
      const href = parts[index + 1];
      return (
        <a key={`${part}-${index}`} href={href} className="font-black text-[#0072CE] underline decoration-2 underline-offset-2 hover:text-[#002B5C]">
          {part}
        </a>
      );
    }
    if (index % 3 === 2) return null;
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export default function JuanIAsLLMWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hola, soy JuanIAs. Dime qué necesitas y busco opciones reales en comercios cercanos."
    }
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text = input) {
    const clean = text.trim();
    if (!clean || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: clean }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/juanias/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          history: messages,
          cart: readCart(),
          location: readLocation(),
          lang: window.localStorage.getItem("faciliteago-lang") || "es"
        })
      });

      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", text: data?.reply || "He encontrado opciones, pero necesito que me concretes un poco más." }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "No he podido conectar con JuanIAs ahora mismo. Prueba de nuevo en unos segundos."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-[#0072CE] transition hover:scale-105"
        aria-label="Abrir JuanIAs"
      >
        <img src={juaniasImage} alt="JuanIAs" className="h-full w-full object-cover" />
      </button>

      {open && (
        <div className="fixed bottom-28 right-4 z-[95] flex h-[610px] w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-blue-100">
          <div className="flex items-center justify-between bg-[#002B5C] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white">
                <img src={juaniasImage} alt="JuanIAs" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-black">JuanIAs</p>
                <p className="text-xs text-blue-100">Asistente inteligente de compra local</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Cerrar JuanIAs"><X className="h-5 w-5" /></button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-auto bg-blue-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${
                  message.role === "user"
                    ? "ml-auto max-w-[86%] bg-[#0072CE] text-white"
                    : "max-w-[88%] bg-white text-slate-700 shadow-sm"
                }`}
              >
                {message.role === "assistant" ? renderMessage(message.text) : message.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[78%] rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-500 shadow-sm">
                JuanIAs está pensando...
              </div>
            )}
          </div>

          <div className="border-t border-blue-100 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#002B5C] transition hover:bg-[#FFCC00]"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") send(); }}
                placeholder="Escribe a JuanIAs..."
                className="flex-1 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-semibold outline-none focus:border-[#0072CE]"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className="rounded-2xl bg-[#0072CE] px-4 text-white disabled:opacity-50"
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

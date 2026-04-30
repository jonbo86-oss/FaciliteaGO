import type { Metadata } from "next";
import CheckoutRedirectGuard from "@/components/CheckoutRedirectGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "faciliteaGO by CaixaBank",
  description: "Marketplace local funcional para comercio de proximidad.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: ["/icon.svg"],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <CheckoutRedirectGuard />
      </body>
    </html>
  );
}

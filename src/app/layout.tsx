import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "faciliteaGO by CaixaBank",
  description: "Marketplace local funcional para comercio de proximidad.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

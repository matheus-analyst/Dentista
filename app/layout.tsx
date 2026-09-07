import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OdontoVida — Clínica Odontológica",
  description:
    "Sorriso saudável começa aqui. Agende sua consulta online na Clínica OdontoVida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

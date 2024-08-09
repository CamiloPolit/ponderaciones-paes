import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Simulador PAES",
  description:
    "Simula tu puntaje PAES en la carrera y universidad que quieras, obteniendo información detallada en un solo lugar,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <header className="flex w-11/12 justify-between">
          <img
            src="mainlogo.webp"
            alt="Logo"
            className="ml-[5%] block w-32 py-3 sm:w-52"
            draggable="false"
          />
          <nav className="flex items-center justify-center gap-8 sm:gap-12">
            <Link
              href="/"
              className="text-[1.1rem] font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Inicio
            </Link>
            <Link
              href="/simulador"
              className="text-[1.1rem] font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Simulador
            </Link>
            <Link
              href="/mallas"
              className="text-[1.1rem] font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Mallas
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

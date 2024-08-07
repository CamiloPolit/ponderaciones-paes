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
        <header className="absolute right-0 flex h-14 items-center px-4 lg:px-6">
          <Link
            href="/"
            className="flex items-center justify-center"
            prefetch={false}
          >
            <span className="sr-only">Simulador</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-sm font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Inicio
            </Link>
            <Link
              href="/simulador"
              className="text-sm font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Simulador
            </Link>
            <Link
              href="/"
              className="text-sm font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Cuenta Regresiva
            </Link>
            <Link
              href="/"
              className="text-sm font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              Fechas Importantes
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

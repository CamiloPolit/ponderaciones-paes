import React from "react";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CareerCardContainer from "@/components/CareerCardContainer";
import CountDown from "@/components/CountDown";
import DatesContainer from "@/components/DatesContainer";
import UniversitySearch from "@/components/UniversitySearch";
import PreviewSimulator from "@/components/PreviewSimulator";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const events = [
  {
    month: "SEP",
    day: 25,
    description:
      "Publicación Oferta Definitiva de Carreras, Ponderaciones y Vacantes regulares y PACE",
  },
  {
    month: "NOV",
    day: 21,
    description: "Publicación oficial Servicios y Beneficios Universitarios",
  },
  {
    month: "DIC",
    day: "2-4",
    description: "Rendición PAES Regular",
  },
  {
    month: "ENE",
    day: 6,
    description: "Resultados de Puntajes PAES Regular",
  },
  {
    month: "ENE",
    day: 6,
    description: "Inicio Etapa de Postulaciones",
  },
  {
    month: "ENE",
    day: 9,
    description:
      "Finaliza Etapa de Postulaciones y publicación oficial Instrucciones de Matrícula",
  },
  {
    month: "ENE",
    day: 20,
    description: "Resultados del Proceso de Selección",
  },
  {
    month: "ENE",
    day: 21,
    description: "Proceso de Matrícula: Inicio de primera etapa",
  },
  {
    month: "ENE",
    day: 23,
    description: "Proceso de Matrícula: Cierre de primera etapa",
  },
  {
    month: "ENE",
    day: 24,
    description: "Proceso de Matrícula: Inicio de segunda etapa",
  },
  {
    month: "ENE",
    day: 30,
    description: "Proceso de Matrícula: Cierre de segunda etapa",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
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
            href="/"
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
            Estadísticas
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

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Simulador de Puntajes para Decisiones Universitarias
                    Inteligentes
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] py-4 text-stone-600 md:text-xl">
                    Navega por el panorama académico con nuestro simulador de
                    puntajes. Descubre las carreras y universidades que mejor se
                    adaptan a tus metas y aspiraciones.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    href="/"
                    className="focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Prueba el Simulador
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Simula tu puntaje PAES</CardTitle>
                    <CardDescription>
                      Ingresa la universidad y carrera donde quieres hacer la
                      simulación.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PreviewSimulator />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Simular Puntaje</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="simulator"
          className="bg-muted w-full bg-stone-100 py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="mb-10 text-3xl font-bold tracking-tighter sm:text-5xl">
                  Cuenta Regresiva PAES
                </h2>
                <CountDown />
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="mb-7 text-3xl font-bold tracking-tighter sm:text-5xl">
                  Carreras Destacadas
                </h2>
                <p className="text-muted-foreground max-w-[900px] text-stone-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  También tienes la opción de no hacer una simulación, y
                  simplemente explorar las diferentes carreras y universidades,
                  aquí tienes algunos ejemplos de programas destacados basados
                  en la alta demanda entre los postulantes y sus altos
                  requisitos de admisión.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-evenly py-12 sm:flex-row">
              <CareerCardContainer
                career="Medicina"
                university={[
                  "Pontificia Universidad Católica de Chile",
                  "Universidad de los Andes",
                ]}
                last_enrolled={[949.3, 936.85]}
                slots_available={[82, 70]}
                lectura={[56, 56]}
                m1={[59, 60]}
                m2={[41, 38]}
                ciencias={[73, 70]}
              />

              <CareerCardContainer
                career="Ingeniería"
                university={[
                  "Pontificia Universidad Católica de Chile",
                  "Universidad de Chile",
                ]}
                last_enrolled={[894.2, 828.1]}
                slots_available={[650, 730]}
                lectura={[53, 51]}
                m1={[59, 58]}
                m2={[41, 36]}
                ciencias={[66, 60]}
                women_enrolled={["31.21%", "31.82%"]}
              />
            </div>
          </div>
        </section>

        <section
          id="resources"
          className="bg-muted w-full bg-stone-100 py-10 md:py-24 lg:py-28"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="m-auto w-2/3 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
                  Fechas Importantes del Proceso de Admisión 2025
                </h2>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12">
              <DatesContainer events={events} />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black py-12">
        <div className="m-auto flex flex-col items-center justify-center">
          <p className="leading-7 text-white">Desarrollado por @kmilo0o0</p>
          <p className="text-center text-xs leading-7 text-stone-400">
            Absolutamente todos los datos de la página corresponden a bases de
            datos oficiales tanto del DEMRE como del Mineduc.
          </p>
        </div>

        <p className="text-center text-xs leading-7 text-stone-400">
          Quiero agradecer a Benjamín y Francisco por el constante apoyo en la
          creación de esta página
        </p>
      </footer>
    </div>
  );
}

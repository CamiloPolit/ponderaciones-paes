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
import events from "@/utils/events";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
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
                <Link href="/simulador" prefetch={false}>
                  <Button>Prueba el Simulador</Button>
                </Link>
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
                    <Link href="/simulador" prefetch={false}>
                      <Button className="w-full">Simular Puntaje</Button>
                    </Link>
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
                grades={[6.92, 6.86]}
                rankings={[991, 974]}
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
                grades={[6.82, 6.7]}
                rankings={[967, 939]}
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
      <footer className="bg-black px-7 py-12">
        <div className="m-auto flex flex-col items-center justify-center">
          <p className="leading-7 text-white">Desarrollado por @kmilo0o0</p>
          <p className="mb-5 leading-7 text-white">
            Puedes contactarme a través de mi{" "}
            <a
              href="https://www.linkedin.com/in/camilopolit/"
              className="text-center leading-7 text-blue-500"
            >
              Linkedin
            </a>
          </p>

          <p className="mb-3 text-center text-xs leading-7 text-stone-400">
            Absolutamente todos los datos de la página corresponden a bases de
            datos oficiales tanto del DEMRE como del Mineduc.
          </p>
        </div>

        <p className="text-center text-xs leading-7 text-stone-400">
          Quiero agradecer a Benjamín Henríquez y Francisco Cea por el constante
          apoyo y feedbacks en la creación de esta página, sin ellos nada de
          esto hubiese sido posible.
        </p>

        <div className="flex justify-center">
          <a
            href="https://www.linkedin.com/in/benjamin-henriquez-soto/"
            className="px-5 text-center text-xs leading-7 text-blue-500"
          >
            Linkedin de Benjamín
          </a>
          <a
            href="https://github.com/fcocea"
            className="text-center text-xs leading-7 text-slate-400"
          >
            Github de Francisco
          </a>
        </div>
      </footer>
    </div>
  );
}

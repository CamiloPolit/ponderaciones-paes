import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IoInformationCircle } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CareerCard({
  university,
  career,
  last_enrolled,
  slots_available,
  lectura,
  m1,
  m2,
  ciencias,
  women_enrolled = undefined,
  grade,
  ranking,
}) {
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>{university}</CardTitle>
        <CardDescription>{career}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-[-15px] flex flex-col items-center justify-center">
          <p className="pb-2 text-center font-bold">
            Media de Alternativas Correctas
          </p>
          <Card>
            <div className="flex">
              <div className="flex flex-col items-center justify-center px-2">
                <p className="font-bold">Lectura</p>
                <p>{lectura}</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <p className="font-bold">M1</p>
                <p>{m1}</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <p className="font-bold">M2</p>
                <p>{m2}</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <p className="font-bold">Ciencias</p>
                <p>{ciencias}</p>
              </div>
            </div>
          </Card>

          <div className="my-2 flex w-full justify-between">
            <div className="mx-5 flex flex-col sm:flex-row">
              <p className="pr-1 font-bold">Nota Promedio: </p>
              <p className="mr-3">{grade}</p>
            </div>
            <div className="mx-5 flex flex-col sm:flex-row">
              <p className="pr-1 font-bold">Ranking Promedio: </p>
              <p>{`${ranking} ptos`}</p>
            </div>
          </div>

          <Separator className="mt-3" />
        </div>

        <div className="mt-6">
          <p className="text-muted-foreground">
            <span className="font-bold">Puntaje Corte: </span>
            {last_enrolled}
          </p>
          <p className="text-muted-foreground">
            <span className="font-bold">Vacantes: </span>
            {slots_available}
          </p>
          {women_enrolled ? (
            <p className="text-muted-foreground">
              <span className="font-bold">
                Porcentaje Mujeres Matriculadas
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoInformationCircle />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-72 font-semibold">
                        Tener conocimiento de la proporción de género, sobretodo
                        en carreras STEM, es un aspecto muy relevante al momento
                        de postular para poder asegurar un ambiente diverso y
                        que se adapte a tus pretensiones personales.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                :{" "}
              </span>
              {women_enrolled}
            </p>
          ) : (
            <p className="cursor-default opacity-0">vacío</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

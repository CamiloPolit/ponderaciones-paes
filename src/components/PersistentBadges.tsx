import React from "react";
import { Badge } from "@/components/ui/badge";

export default function PersistentBadges() {
  return (
    <>
      <div className="my-5">
        <div className="m-auto my-4 flex w-11/12 items-center gap-3">
          <Badge
            variant="outline"
            className="h-8 min-w-20 border border-stone-400 bg-green-300"
          ></Badge>
          <p>=</p>
          <p className="text-sm font-medium leading-none text-stone-800">
            Debes rendir esta prueba obligatoriamente.
          </p>
        </div>
      </div>
      <div className="my-5">
        <div className="m-auto my-4 flex w-11/12 items-center gap-3">
          <Badge
            variant="outline"
            className="h-8 min-w-20 border border-stone-400 bg-blue-300"
          ></Badge>
          <p>=</p>
          <p className="text-sm font-medium leading-none text-stone-800">
            Obligatoria sólo para algunas carreras.
          </p>
        </div>
      </div>
      <div className="my-5">
        <div className="m-auto my-4 flex w-11/12 items-center gap-3">
          <Badge
            variant="outline"
            className="h-8 min-w-20 border border-stone-400 bg-yellow-300"
          ></Badge>
          <p>=</p>
          <p className="text-sm font-medium leading-none text-stone-800">
            Debes rendir al menos una de estas pruebas.
          </p>
        </div>
      </div>
    </>
  );
}

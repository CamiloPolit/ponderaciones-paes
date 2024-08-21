import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useParseDateRange from "@/hooks/useParseDataRange";

export default function AccreditationCard({
  university,
  acreditada_inst,
  acre_inst_desde_hasta,
  imageSrc,
}) {
  const { yearsElapsed } = useParseDateRange(acre_inst_desde_hasta);

  return (
    <Card className="mx-auto my-10 flex w-full max-w-3xl flex-row items-center gap-6 p-6">
      <div className="bg-primary flex items-center justify-center rounded-md p-3">
        <img
          className="h-min"
          src={imageSrc}
          alt="Logo Universidad"
          draggable="false"
        />
      </div>
      <div className="grid flex-1 gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[0.9rem] font-bold md:text-xl md:font-semibold">
            {university}
          </h3>
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              true ? "bg-green-500 text-green-50" : "bg-red-500 text-red-50"
            }`}
          >
            {acreditada_inst ? "Acreditada" : "No acreditada"}
          </div>
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium">Acreditada por:</span>{" "}
          {`${yearsElapsed !== null ? yearsElapsed : "N/A"} años.`}
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium">Periodo de Acreditación:</span>{" "}
          {acre_inst_desde_hasta}
        </div>
      </div>
    </Card>
  );
}

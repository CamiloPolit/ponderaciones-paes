import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccreditationCard() {
  return (
    <Card className="mx-auto my-10 flex w-full max-w-3xl flex-row items-center gap-6 p-6">
      <div className="bg-primary flex items-center justify-center rounded-md p-3">
        <div className="text-primary-foreground h-8 w-8" />
      </div>
      <div className="grid flex-1 gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Universidad de Chile</h3>
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              true ? "bg-green-500 text-green-50" : "bg-red-500 text-red-50"
            }`}
          >
            {true ? "Acreditada" : "No acreditada"}
          </div>
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium">Acreditada por:</span> 10 años
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium">Periodo de Acreditación:</span> 2020 -
          2030
        </div>
      </div>
    </Card>
  );
}

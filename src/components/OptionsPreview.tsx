import React from "react";
import OptionRow from "./OptionRow";
import { Button } from "@/components/ui/button";

export default function OptionsPreview({
  useType,
  setUseType,
  searchType,
  setSearchType,
  toast,
}) {
  return (
    <div className="flex min-h-[500px] w-11/12 justify-center md:min-h-[380px]">
      <div className="flex w-full flex-col items-center justify-center rounded-b-xl border-[1px] border-gray-300 py-10 md:w-2/3">
        <h1 className="mb-7 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 md:mb-8">
          Opciones ⚙️
        </h1>
        <OptionRow
          filter_type="Tipo de uso de la página"
          options={["Simulador", "Mostrar sólo estadísticas"]}
          optionSelected={useType}
          setOptionSelected={setUseType}
        />
        <OptionRow
          filter_type="Tipo de búsqueda"
          options={[
            "Búsqueda por Universidad y Carrera",
            "Búsqueda por Universidad",
            "Búsqueda por Carrera",
            "Búsqueda por Área de Conocimiento",
          ]}
          optionSelected={searchType}
          setOptionSelected={setSearchType}
        />
        <Button
          onClick={() =>
            toast({
              title: "Los cambios se han guardado correctamente",
              description:
                "La próxima vez que entres al simulador, se iniciará esta configuración por defecto.",
            })
          }
          className="mt-10"
        >
          Guardar como predeterminado
        </Button>
      </div>
    </div>
  );
}

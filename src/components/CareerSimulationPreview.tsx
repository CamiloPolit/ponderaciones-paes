import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import CareerSimulationCard from "./CareerSimulationCard";

export default function CareerSimulationPreview({
  universityData,
  areElectivesFilled,
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">
            Oferta de Carreras Ofrecidas por la {universityData[0].nomb_inst}
          </h2>
          <p className="text-muted-foreground">
            Explora las diferentes carreras
          </p>
        </div>
        <div className="space-y-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="space-x-4">
              <Button variant="outline">Tecnología</Button>
              <Button variant="outline">Salud</Button>
              <Button variant="outline">Humanista</Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <ArrowUpDownIcon className="mr-2 h-4 w-4" />
                  Ordenar por
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup value="featured">
                  <DropdownMenuRadioItem value="featured">
                    Destacado
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Newest">
                    Más nuevo
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="low">
                    Puntaje: Bajo a Alto
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="high">
                    Puntaje: Alto a Bajo
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-6">
            {universityData.map((career) => (
              <CareerSimulationCard
                key={career.nombre_carrera}
                university={career.nomb_inst}
                career={career.nombre_carrera}
                careerLogo={career.area_conocimiento}
                nem={career.nem}
                ranking={career.ranking}
                clec={career.clec}
                m1={career.m1}
                m2={career.m2}
                cien={career.cien}
                hsco={career.hsco}
                areElectivesFilled={areElectivesFilled}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}

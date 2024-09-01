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
  setShowCareerInfoCards,
  setAreElectivesFilled,
  setShowStatistics,
  setCareerData,
  setPosition,
  setShowCalculations,
}) {
  const cienciasValue = sessionStorage.getItem("Ciencias");
  const historiaValue = sessionStorage.getItem("Historia");

  setAreElectivesFilled(cienciasValue && historiaValue);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="text-black hover:bg-gray-200"
            onClick={() => {
              setShowCareerInfoCards(false);
              setShowCalculations(true);
            }}
          >
            Volver
          </Button>
          <h2 className="text-3xl font-bold">
            Oferta de Carreras Ofrecidas por la {universityData[0].nomb_inst}
          </h2>
          <p className="text-stone-700">Explora las diferentes carreras</p>
          <p className="text-stone-700">
            * Recuerda que las carreras listadas corresponden sólo a las que fue
            posible hacer la simulación en base a los puntajes ingresados en los
            input.
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
                last_score={career.puntaje_corte}
                areElectivesFilled={areElectivesFilled}
                setShowCareerInfoCards={setShowCareerInfoCards}
                setShowStatistics={setShowStatistics}
                setCareerData={setCareerData}
                universityData={universityData}
                setPosition={setPosition}
                location={career.nomb_sede}
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

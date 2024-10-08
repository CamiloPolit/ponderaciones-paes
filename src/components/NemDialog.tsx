import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";

import groupA from "../../NEM_transformation/NEM_GRUPO_A.json";
import groupB from "../../NEM_transformation/NEM_GRUPO_B.json";
import groupC from "../../NEM_transformation/NEM_GRUPO_C.json";

export default function Component({ text, onNemChange }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Seleccionar");
  const [nem, setNem] = useState("");

  const handleSubmit = () => {
    let formattedNem = nem.toString().replace(",", ".");

    if (selectedOption === "Seleccionar") {
      toast({
        variant: "destructive",
        title: "Debes seleccionar un tipo de establecimiento",
        description:
          "No tienes ningun tipo de establecimiento seleccionado. Por favor, selecciona uno para poder calcular tu NEM.",
      });
      return;
    }

    if (formattedNem.endsWith(".00") || formattedNem.endsWith(".0")) {
      formattedNem = formattedNem.replace(".00", "");
      formattedNem = formattedNem.replace(".0", "");
    }

    const nemValue =
      selectedOption === "Grupo A"
        ? groupA[formattedNem]
        : selectedOption === "Grupo B"
          ? groupB[formattedNem]
          : selectedOption === "Grupo C"
            ? groupC[formattedNem]
            : null;

    if (nemValue !== undefined) {
      onNemChange(nemValue);
      toast({
        title: "NEM calculado con éxito",
        description:
          "El NEM ha sido calculado con éxito. Puedes ver el resultado en el input de simulación.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "El NEM ingresado no es válido",
        description:
          "El NEM ingresado no es válido. Recuerda que el NEM debe ser un número entre 1 y 7 con hasta dos decimales.",
      });
      return;
    }

    setIsOpen(false);
    setNem("");
  };

  const handleNemChange = (e) => {
    let value = e.target.value;

    // Regular expression to match a number between 1 and 7 with up to two decimal places
    const regex = /^[1-7]([.,][0-9]{0,2})?$/;

    // Allow input if it's empty or matches the regex
    if (value === "" || regex.test(value)) {
      setNem(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="mb-[-5px] cursor-pointer text-[0.86rem] font-medium text-blue-300">
          {text}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ingresa los Datos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="establishment-type">
              Selecciona el tipo de establecimiento donde egresaste
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  id="establishment-type"
                >
                  {selectedOption} <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuItem onClick={() => setSelectedOption("Grupo A")}>
                  Grupo A: Enseñanza Humanístico-Científica
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOption("Grupo B")}>
                  Grupo B: Enseñanza Media Humanístico-Científica de adultos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOption("Grupo C")}>
                  Grupo C: Enseñanza Media Técnico Profesional
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nem">Ingresa el NEM (Dos cifras decimales)</Label>
            <Input
              id="nem"
              type="text"
              placeholder="Ingresa NEM (Escala del 1 al 7)"
              value={nem}
              onChange={handleNemChange}
              maxLength={4}
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <Button onClick={handleSubmit}>Calcular</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";

import groupA from "../../NEM_transformation/NEM_GRUPO_A.json";
import groupB from "../../NEM_transformation/NEM_GRUPO_B.json";
import groupC from "../../NEM_transformation/NEM_GRUPO_C.json";

export default function Component({ text, onNemChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Seleccionar");
  const [nem, setNem] = useState("");

  const handleSubmit = () => {
    let formattedNem = nem.toString().replace(",", ".");

    if (formattedNem.endsWith(".00") || formattedNem.endsWith(".0")) {
      formattedNem = formattedNem.replace(".00", "");
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
    } else {
      console.log(formattedNem);

      console.error("NEM no encontrado para el valor ingresado.");
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

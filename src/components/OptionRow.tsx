import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function OptionRow({
  filter_type,
  options,
  optionSelected,
  setOptionSelected,
}) {
  return (
    <div className="w-3/4 border-t-[1px] border-gray-300 py-7 last:border-b-[1px] md:py-0">
      <div className="flex h-[70px] flex-col items-center justify-between px-7 md:flex-row">
        <h2 className="font-semibold">{filter_type}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-medium">
              {optionSelected}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Selecciona de qué manera quieres hacer la búsqueda
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={optionSelected}
              onValueChange={setOptionSelected}
            >
              {options.map((option) => (
                <DropdownMenuRadioItem key={option} value={option}>
                  {option}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

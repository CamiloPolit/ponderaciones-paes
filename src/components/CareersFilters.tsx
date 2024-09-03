import React from "react";
import { Button } from "@/components/ui/button";

export default function CareersFilters({ selectedFilter, handleFilterClick }) {
  return (
    <>
      <Button
        variant={selectedFilter === "Todo" ? "default" : "outline"}
        onClick={() => handleFilterClick("Todo")}
      >
        Todo
      </Button>
      <Button
        variant={selectedFilter === "Tecnología" ? "default" : "outline"}
        onClick={() => handleFilterClick("Tecnología")}
      >
        Tecnología
      </Button>
      <Button
        variant={selectedFilter === "Salud" ? "default" : "outline"}
        onClick={() => handleFilterClick("Salud")}
      >
        Salud
      </Button>
      <Button
        variant={selectedFilter === "Ciencias Sociales" ? "default" : "outline"}
        onClick={() => handleFilterClick("Ciencias Sociales")}
      >
        Cs. Sociales
      </Button>
      <Button
        variant={selectedFilter === "Ciencias Básicas" ? "default" : "outline"}
        onClick={() => handleFilterClick("Ciencias Básicas")}
      >
        Cs. Básicas
      </Button>
      <Button
        variant={selectedFilter === "Educación" ? "default" : "outline"}
        onClick={() => handleFilterClick("Educación")}
      >
        Educación
      </Button>
      <Button
        variant={selectedFilter === "Humanidades" ? "default" : "outline"}
        onClick={() => handleFilterClick("Humanidades")}
      >
        Humanidades
      </Button>
      <Button
        variant={selectedFilter === "Agropecuaria" ? "default" : "outline"}
        onClick={() => handleFilterClick("Agropecuaria")}
      >
        Agropecuaria
      </Button>
    </>
  );
}

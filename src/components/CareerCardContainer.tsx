import React from "react";
import CareerCard from "@/components/CareerCard";

export default function CareerCardContainer({
  career,
  university,
  last_enrolled,
  slots_available,
  lectura,
  m1,
  m2,
  ciencias,
  women_enrolled = undefined,
  grades,
  rankings,
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
        {career}
      </h2>

      <div>
        <CareerCard
          university={university[0]}
          career={career}
          last_enrolled={last_enrolled[0]}
          slots_available={slots_available[0]}
          lectura={lectura[0]}
          m1={m1[0]}
          m2={m2[0]}
          ciencias={ciencias[0]}
          women_enrolled={women_enrolled && women_enrolled[0]}
          grade={grades[0]}
          ranking={rankings[0]}
        />
        <CareerCard
          university={university[1]}
          career={career}
          last_enrolled={last_enrolled[1]}
          slots_available={slots_available[1]}
          lectura={lectura[1]}
          m1={m1[1]}
          m2={m2[1]}
          ciencias={ciencias[1]}
          women_enrolled={women_enrolled && women_enrolled[1]}
          grade={grades[1]}
          ranking={rankings[1]}
        />
      </div>
    </div>
  );
}

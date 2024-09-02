// pages/api/carreras/[codigo_carrera].js

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const codigoCarrera = parseInt(params.codigo_carrera, 10);
    const valorDecimal = parseFloat(
      request.nextUrl.searchParams.get("valor_decimal"),
    );

    if (isNaN(codigoCarrera) || isNaN(valorDecimal)) {
      return NextResponse.json(
        { error: "Parámetros inválidos" },
        { status: 400 },
      );
    }

    const result = await sql`
      SELECT CODIGO_CARRERA, COUNT(*) AS cantidad_mayores
      FROM alumnos_matriculados
      WHERE PUNTAJE_PONDERADO > ${valorDecimal} AND CODIGO_CARRERA = ${codigoCarrera}
      GROUP BY CODIGO_CARRERA;
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

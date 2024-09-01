import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const carrera = params.nombre_carrera;

    const result = await sql`
      SELECT *
      FROM info_carreras t1
      JOIN acreditaciones_universidades t2
      ON t1.nomb_inst = t2.nomb_inst
      WHERE t1.nombre_carrera = ${carrera}
      ORDER BY puntaje_corte DESC;
  `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

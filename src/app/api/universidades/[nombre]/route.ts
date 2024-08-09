// pages/api/universidades/[nombre].js

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Obtener el nombre de la universidad desde la URL
    const university = params.nombre.replace(/_/g, " ");
    // Obtener la carrera desde los parámetros de consulta
    const career = request.nextUrl.searchParams
      .get("carrera")
      ?.replace(/_/g, " ");
    let result;

    if (career) {
      // Consulta para una carrera específica en una universidad
      result = await sql`
        SELECT * FROM FETCH_CARRERAS WHERE nomb_inst = ${university} AND nombre_carrera = ${career}
      `;
    } else {
      // Consulta solo para una universidad
      result = await sql`
        SELECT * FROM FETCH_CARRERAS WHERE nomb_inst = ${university}
      `;
    }

    return NextResponse.json(result.rows); // Asegúrate de devolver las filas de resultados
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// pages/api/universidades/[nombre].js

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const university = params.nombre.replace(/_/g, " ");
    const career = request.nextUrl.searchParams
      .get("carrera")
      ?.replace(/_/g, " ");
    let result;

    if (career) {
      result = await sql`
        SELECT *
        FROM info_carreras
        WHERE nomb_inst = ${university} AND nombre_carrera = ${career};
      `;
    } else {
      result = await sql`
        SELECT DISTINCT NOMBRE_CARRERA,AREA_CONOCIMIENTO,NOMB_INST FROM FETCH_CARRERAS WHERE nomb_inst = ${university} ORDER BY NOMBRE_CARRERA ASC;
      `;
    }
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

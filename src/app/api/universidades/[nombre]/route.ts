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
        SELECT 
          fc.*,
          ia.NEM, 
          ia.RANKING, 
          ia.CLEC, 
          ia.M1, 
          ia.HSCO, 
          ia.CIEN, 
          ia.M2, 
          ia.VAC_1ER, 
          ia.BEA, 
          ia.PACE, 
          ia.MC, 
          ia.PROM_MIN_POST, 
          ia.POND_MIN_POST
        FROM FETCH_CARRERAS AS fc
        JOIN INFO_ADMISION AS ia ON fc.CODIGO_CARRERA = ia.COD_CARRERA
        WHERE fc.nomb_inst = ${university} AND fc.nombre_carrera = ${career};
      `;
    } else {
      result = await sql`
        SELECT * FROM FETCH_CARRERAS WHERE nomb_inst = ${university}
      `;
    }
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

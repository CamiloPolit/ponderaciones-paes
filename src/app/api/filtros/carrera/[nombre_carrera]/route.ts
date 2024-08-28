// pages/api/universidades/[nombre].js

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const university = params.nombre_carrera.replace(/_/g, " ");
    let result;

    result = await sql`
        SELECT * FROM info_carreras WHERE nomb_inst = ${university} ORDER BY NOMBRE_CARRERA ASC;
      `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const careerCode = params.codigo;
    const result =
      await sql`SELECT * FROM info_carreras WHERE cod_carrera = ${careerCode};`;
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

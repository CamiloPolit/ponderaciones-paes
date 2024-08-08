import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const universityNameFormatted = params.nombre.replace(/_/g, " ");
    const result =
      await sql`SELECT * FROM FETCH_CARRERAS WHERE nomb_inst = ${universityNameFormatted};`;
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Función para eliminar acentos y normalizar texto
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function GET(request, { params }) {
  try {
    const carrera = removeAccents(params.nombre_carrera.toLowerCase());

    const result = await sql`
      SELECT * FROM (
        SELECT DISTINCT NOMBRE_CARRERA, AREA_CONOCIMIENTO, LENGTH(NOMBRE_CARRERA) AS nombre_length
        FROM fetch_carreras
        WHERE TRANSLATE(LOWER(NOMBRE_CARRERA), 'áéíóúÁÉÍÓÚ', 'aeiouaeiou') LIKE ${carrera + "%"}
      ) AS subquery
      ORDER BY nombre_length ASC;
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let datos: unknown;

  try {
    datos = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición debe ser un JSON válido." },
      { status: 400 }
    );
  }

  if (
    typeof datos !== "object" ||
    datos === null ||
    !("nombre" in datos) ||
    !("personas" in datos)
  ) {
    return NextResponse.json(
      { error: "Debes enviar los campos nombre y personas." },
      { status: 400 }
    );
  }

  const { nombre, personas } = datos;

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return NextResponse.json(
      { error: "El nombre debe ser un texto y no puede estar vacío." },
      { status: 400 }
    );
  }

  if (
    typeof personas !== "number" ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 6
  ) {
    return NextResponse.json(
      { error: "Personas debe ser un número entero entre 1 y 6." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { nombre: nombre.trim(), personas },
    { status: 201 }
  );
}
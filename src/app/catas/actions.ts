"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { valoraciones } from "@/db/schema";

export async function guardarValoracion(
  _mensajeAnterior: string,
  formData: FormData,
): Promise<string> {
  const nombre = formData.get("nombre");
  const comentario = formData.get("comentario");
  const puntuacion = Number(formData.get("puntuacion"));

  if (
    typeof nombre !== "string" ||
    typeof comentario !== "string" ||
    nombre.trim() === "" ||
    comentario.trim() === ""
  ) {
    return "Escribe el nombre y el comentario.";
  }

  if (!Number.isInteger(puntuacion) || puntuacion < 1 || puntuacion > 5) {
    return "La puntuación debe ser un número entero del 1 al 5.";
  }

  db.insert(valoraciones)
    .values({
      nombre: nombre.trim(),
      comentario: comentario.trim(),
      puntuacion,
    })
    .run();

  revalidatePath("/catas");
  return "";
}
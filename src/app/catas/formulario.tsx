"use client";

import { useActionState } from "react";
import { guardarValoracion } from "./actions";

export default function FormularioValoracion() {
  const [mensaje, enviarValoracion] = useActionState(guardarValoracion, "");

  return (
    <form action={enviarValoracion} className="grid gap-4">
      <label className="grid gap-1">
        Nombre
        <input type="text" name="nombre" required className="rounded border p-2" />
      </label>

      <label className="grid gap-1">
        Comentario
        <textarea name="comentario" required rows={3} className="rounded border p-2" />
      </label>

      <label className="grid gap-1">
        Puntuación del 1 al 5
        <input
          type="number"
          name="puntuacion"
          min={1}
          max={5}
          step={1}
          required
          className="rounded border p-2"
        />
      </label>

      {mensaje && <p role="alert">{mensaje}</p>}

      <button type="submit" className="w-fit rounded bg-amber-900 px-4 py-2 text-white">
        Guardar valoración
      </button>
    </form>
  );
}
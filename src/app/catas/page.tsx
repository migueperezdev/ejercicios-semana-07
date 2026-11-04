import { desc } from "drizzle-orm";
import { db } from "@/db";
import { valoraciones } from "@/db/schema";
import FormularioValoracion from "./formulario";

export const dynamic = "force-dynamic";

export default function CatasPage() {
  const lista = db
    .select()
    .from(valoraciones)
    .orderBy(desc(valoraciones.id))
    .all();

  return (
    <main className="mx-auto max-w-xl space-y-8 p-6">
      <h1 className="text-3xl font-bold">Libro de catas</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Valoraciones</h2>

        {lista.length === 0 ? (
          <p>Aún no hay valoraciones.</p>
        ) : (
          <ul className="space-y-3">
            {lista.map((valoracion) => (
              <li key={valoracion.id} className="rounded border p-3">
                <p>
                  <strong>{valoracion.nombre}</strong> · {valoracion.puntuacion}/5
                </p>
                <p className="whitespace-pre-wrap">{valoracion.comentario}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Deja tu valoración</h2>
        <FormularioValoracion />
      </section>
    </main>
  );
}
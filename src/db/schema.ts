import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, real, check } from "drizzle-orm/sqlite-core";

export const cafes = sqliteTable("cafes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nombre: text("nombre").notNull(),
  origen: text("origen").notNull(),
  precio: real("precio").notNull(),
  tueste: text("tueste", {
    enum: ["claro", "medio", "oscuro"],
  }).notNull(),
});

export const valoraciones = sqliteTable(
  "valoraciones",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nombre: text("nombre").notNull(),
    comentario: text("comentario").notNull(),
    puntuacion: integer("puntuacion").notNull(),
  },
  (tabla) => [
    check(
      "puntuacion_valida",
      sql`${tabla.puntuacion} IN (1, 2, 3, 4, 5)`,
    ),
  ],
);
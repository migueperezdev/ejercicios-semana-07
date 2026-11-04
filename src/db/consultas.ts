import { asc, eq } from "drizzle-orm";
import { db } from "./index";
import { cafes } from "./schema";

const cafesPorPrecio = db
  .select()
  .from(cafes)
  .orderBy(asc(cafes.precio))
  .all();

console.log("Todos los cafés, ordenados por precio");
console.table(cafesPorPrecio);

const cafesTuesteMedio = db
  .select()
  .from(cafes)
  .where(eq(cafes.tueste, "medio"))
  .all();

console.log("Cafés de tueste medio");
console.table(cafesTuesteMedio);
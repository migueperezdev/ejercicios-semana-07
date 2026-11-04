import { db } from "./index";
import { cafes } from "./schema";

const resultado = db
  .insert(cafes)
  .values([
    {
      id: 1,
      nombre: "Colombia Huila",
      origen: "Colombia",
      precio: 11.5,
      tueste: "medio",
    },
    {
      id: 2,
      nombre: "Etiopía Sidamo",
      origen: "Etiopía",
      precio: 13.9,
      tueste: "claro",
    },
    {
      id: 3,
      nombre: "Brasil Cerrado",
      origen: "Brasil",
      precio: 9.8,
      tueste: "oscuro",
    },
    {
      id: 4,
      nombre: "Guatemala Antigua",
      origen: "Guatemala",
      precio: 12.4,
      tueste: "medio",
    },
  ])
  .onConflictDoNothing({ target: cafes.id })
  .run();

console.log("Cafés insertados:", resultado.changes);
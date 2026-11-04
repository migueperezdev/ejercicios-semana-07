import { mkdirSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

mkdirSync("./data", { recursive: true });

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "./data/ejercicios.db",
  },
});
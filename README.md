# Ejercicios — Semana 7

Proyecto de ejercicios de CODE NODE para practicar Next.js con App Router y TypeScript.

## Instalación y arranque

Desde la carpeta del proyecto:

```cmd
npm install
npm run dev
```

La aplicación se abre en http://localhost:3000.

## Ejercicio 1 — API del tostadero

### GET /api/estado

Devuelve un JSON con el estado del tostadero:

- `abierto`: indica si está abierto.
- `cafesDisponibles`: cantidad de cafés disponibles.
- `proximaCata`: fecha de ejemplo de la próxima cata.

Archivo: `src/app/api/estado/route.ts`.

### POST /api/reservas

Recibe un JSON con:

- `nombre`: texto obligatorio que no puede estar vacío ni contener solo espacios.
- `personas`: número entero entre 1 y 6.

Si los datos son correctos, devuelve la reserva con estado 201.
Si el JSON es incorrecto o los campos no son válidos, devuelve un error con estado 400.

Las reservas todavía no se guardan en una base de datos.

Archivo: `src/app/api/reservas/route.ts`.

### Pruebas realizadas con curl

Comandos ejecutados en Windows CMD, con el servidor de desarrollo funcionando.

Se muestran el estado HTTP, el tipo de contenido y el cuerpo de las respuestas.

#### 1. Consultar el estado del tostadero

Comando:

```cmd
curl.exe -i http://localhost:3000/api/estado
```

Respuesta:

```http
HTTP/1.1 200 OK
content-type: application/json

{"abierto":true,"cafesDisponibles":4,"proximaCata":"2026-11-20"}
```

#### 2. Enviar una reserva correcta

Comando:

```cmd
curl.exe -i -X POST http://localhost:3000/api/reservas -H "Content-Type: application/json" -d "{\"nombre\":\"Ana\",\"personas\":2}"
```

Respuesta:

```http
HTTP/1.1 201 Created
content-type: application/json

{"nombre":"Ana","personas":2}
```

#### 3. Enviar una reserva con demasiadas personas

Comando:

```cmd
curl.exe -i -X POST http://localhost:3000/api/reservas -H "Content-Type: application/json" -d "{\"nombre\":\"Ana\",\"personas\":7}"
```

Respuesta:

```http
HTTP/1.1 400 Bad Request
content-type: application/json

{"error":"Personas debe ser un número entero entre 1 y 6."}
```

#### 4. Enviar una reserva sin nombre

Comando:

```cmd
curl.exe -i -X POST http://localhost:3000/api/reservas -H "Content-Type: application/json" -d "{\"personas\":2}"
```

Respuesta:

```http
HTTP/1.1 400 Bad Request
content-type: application/json

{"error":"Debes enviar los campos nombre y personas."}
```
## Ejercicio 2. Tabla de cafés con Drizzle y SQLite

La tabla `cafes` tiene un ID autoincremental, nombre, origen, precio y tueste.
El seed carga cuatro cafés de orígenes distintos.

Desde la raíz del proyecto, instala las dependencias, crea la tabla, carga los
datos y ejecuta las consultas.

```cmd
npm install
npx drizzle-kit push
npx tsx src/db/seed.ts
npx tsx src/db/consultas.ts
```

La primera consulta muestra todos los cafés de menor a mayor precio.

| Café | Precio | Tueste |
|---|---:|---|
| Brasil Cerrado | 9,80 | oscuro |
| Colombia Huila | 11,50 | medio |
| Guatemala Antigua | 12,40 | medio |
| Etiopía Sidamo | 13,90 | claro |

La segunda consulta filtra por tueste `medio` y muestra Colombia Huila y
Guatemala Antigua.

Para comprobar las filas guardadas, abre Drizzle Studio y selecciona `cafes`.

```cmd
npx drizzle-kit studio
```

La base de datos se guarda en `data/ejercicios.db`. La regla `data/` de
`.gitignore` excluye ese archivo del repositorio.
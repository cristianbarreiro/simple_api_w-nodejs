
# 🧩 Simple API en Node.js sin Frameworks

Este proyecto es una API REST construida desde cero utilizando **solo Node.js** nativo, sin frameworks como Express. Ideal para comprender los fundamentos del manejo de rutas, peticiones y respuestas HTTP puras.

## 📁 Estructura del Proyecto

```
simple-api/
├── server.js      # Código principal del servidor
└── data.json      # Archivo que simula una base de datos local
```

## 🚀 Funcionalidades

Esta API permite:

| Método | Ruta              | Descripción                    |
|--------|-------------------|--------------------------------|
| GET    | `/api/users`      | Obtener todos los usuarios     |
| GET    | `/api/users/:id`  | Obtener un usuario por ID      |
| POST   | `/api/users`      | Crear un nuevo usuario         |
| PUT    | `/api/users/:id`  | Actualizar un usuario existente|
| DELETE | `/api/users/:id`  | Eliminar un usuario por ID     |

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/simple-api-node-sin-frameworks.git
   cd simple-api-node-sin-frameworks
   ```

2. Crea un archivo `data.json` con contenido inicial:
   ```json
   [
     { "id": 1, "name": "Alice" },
     { "id": 2, "name": "Bob" }
   ]
   ```

3. Ejecuta el servidor:
   ```bash
   node server.js
   ```

4. La API estará disponible en:  
   `http://localhost:3000`

## 🧪 Ejemplos de uso

### Obtener todos los usuarios

```bash
curl http://localhost:3000/api/users
```

### Crear un nuevo usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Carlos"}'
```

### Actualizar un usuario

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alicia"}'
```

### Eliminar un usuario

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## ⚠️ Notas

- La "base de datos" es un archivo plano `data.json`, y los datos se guardan directamente allí.
- Este proyecto no está diseñado para producción. No implementa validaciones, seguridad, ni asincronía optimizada.
- Es ideal para fines educativos o como punto de partida para construir algo más robusto.

## 🧠 Aprendizajes Clave

- Cómo funciona `http.createServer()` en Node.js
- Cómo analizar rutas y métodos HTTP manualmente
- Cómo manejar archivos con el módulo `fs`
- Cómo procesar JSON desde el cuerpo de la petición

## 📜 Licencia

MIT

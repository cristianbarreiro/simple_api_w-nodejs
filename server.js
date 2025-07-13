const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;
const DATA_FILE = './data.json';

// Leer los datos del archivo
function getUsers() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Guardar los datos en el archivo
function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const parts = parsedUrl.pathname.split('/').filter(Boolean);
  const method = req.method;

  // Cabeceras comunes
  res.setHeader('Content-Type', 'application/json');

  // Rutas
  if (parts[0] === 'api' && parts[1] === 'users') {
    const users = getUsers();
    const id = parts[2] ? parseInt(parts[2]) : null;

    if (method === 'GET') {
      if (id) {
        const user = users.find(u => u.id === id);
        if (user) {
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: 'Usuario no encontrado' }));
        }
      } else {
        res.end(JSON.stringify(users));
      }

    } else if (method === 'POST') {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', () => {
        const newUser = JSON.parse(body);
        newUser.id = users.length ? users.at(-1).id + 1 : 1;
        users.push(newUser);
        saveUsers(users);
        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
      });

    } else if (method === 'PUT' && id) {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', () => {
        const updated = JSON.parse(body);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ message: 'No encontrado' }));
        }
        users[index] = { ...users[index], ...updated };
        saveUsers(users);
        res.end(JSON.stringify(users[index]));
      });

    } else if (method === 'DELETE' && id) {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'No encontrado' }));
      }
      const deleted = users.splice(index, 1)[0];
      saveUsers(users);
      res.end(JSON.stringify(deleted));
    } else {
      res.statusCode = 405;
      res.end(JSON.stringify({ message: 'Método no permitido' }));
    }

  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

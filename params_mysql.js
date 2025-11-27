const http = require('http');
const url = require('url');
const mysql = require('mysql2');
const { type } = require('os');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'compra_venta'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // insertar un producto
  if (parsedUrl.pathname === '/create_product' && query.name && query.type && req.method == "POST") {
    const name = query.name;
    const typeproduct = query.type;

    const sql = 'INSERT INTO productos (nombre, tipo) VALUES (?, ?)';
    db.query(sql, [name, typeproduct], (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database error', details: err }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Data inserted successfully',
        insertedId: result.insertId
      }));
    });
    // consultar un producto por el id
  } else if (parsedUrl.pathname === '/products_id' && query.id && req.method == "GET") {
    const sql = 'SELECT * FROM productos WHERE id=?';
    let user_id = query.id;
    db.query(sql, user_id, (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database error', details: err }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'User:',
        user: result
      }));
    });
    // eliminar un producto por el id
  } else if (parsedUrl.pathname === '/delete_products' && query.id && req.method == "POST") {
    let id_delete = query.id
    const sql = 'DELETE FROM productos where id=? ';
    db.query(sql, id_delete, (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database error', details: err }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'producto eliminado correctamente:',
        user: result
      }));
    });

    // actualizar un producto

  } else if (parsedUrl.pathname === '/update' && query.id && query.nuevoName && query.nuevoType && req.method == "POST") {
    let id_delete = query.id
    let nuevoNombre = query.nuevoName
    let Typenuevo = query.nuevoType
    const sql = 'UPDATE productos set nombre = ? , tipo = ? where id=? ';
    db.query(sql, [nuevoNombre, Typenuevo ,id_delete], (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database error', details: err }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'producto actualizado correctamente:',
        user: result
      }));
    });
    // consultar todos los productos
  } else if (parsedUrl.pathname === '/products' && req.method == "GET") {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database error', details: err }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Users:',
        user: result
      }));
    });
  }
  else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing name or age parameters, or incorrect path' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
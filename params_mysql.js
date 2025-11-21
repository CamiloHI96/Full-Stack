const http = require('http');
const url = require('url');
const mysql = require('mysql2');

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'clase'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
}); 

// Servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // Insertar usuario
    if (parsedUrl.pathname === '/user' && query.nombre && query.email && req.method === 'POST') {
        const nombre = query.nombre;
        const email = query.email;

        const sql = 'INSERT INTO usuario (nombre, email) VALUES (?, ?)';
        db.query(sql, [nombre, email], (err, result) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Database error', details: err }));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ 
                message: 'Data inserted successfully',
                insertId: result.insertId
            }));
        });

    // Obtener usuario por id
    } else if (parsedUrl.pathname === '/user' && query.id && req.method === 'GET') {
        const sql = 'SELECT * FROM usuario WHERE id = ?';
        const id = query.id;

        db.query(sql, [id], (err, results) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Database error', details: err }));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'user:', data: results }));
        });

    // Obtener todos los usuarios
    } else if (parsedUrl.pathname === '/users' && req.method === 'GET') {
        const sql = 'SELECT * FROM usuario';
        db.query(sql, (err, results) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Database error', details: err }));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'users:', data: results }));
        });

    // Ruta no encontrada
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Invalid request or missing parameters' }));
    }
});

// Puerto del servidor
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
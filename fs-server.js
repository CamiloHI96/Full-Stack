const http = require("http");
const fs = require("fs");
const path = require("path");
const eventos = require("events");

// Crear EventEmitter
const EventEmitter = new eventos();

// Ruta del archivo principal
const filePath = path.join(__dirname, "messages.txt");

// Función para registrar las peticiones HTTP
async function logRequest(req) {
    const logMessage = `[${new Date().toLocaleString()}] PETICIÓN: ${req.method} ${req.url}\n`;
    const logFilePath = path.join(__dirname, "log.txt");

    try {
        await fs.promises.appendFile(logFilePath, logMessage);
        console.log("Petición registrada en log.txt");
    } catch (err) {
        console.error("Error registrando la petición:", err);
    }
}

// Función para registrar eventos personalizados (lectura, escritura, etc.)
async function logEvent(eventType, filename) {
    const logMessage = `[${new Date().toLocaleString()}] EVENTO: ${eventType} - Archivo: ${filename}\n`;
    const logFilePath = path.join(__dirname, "log.txt");

    try {
        await fs.promises.appendFile(logFilePath, logMessage);
        console.log(`Evento "${eventType}" registrado`);
    } catch (err) {
        console.error("Error escribiendo en el log de eventos:", err);
    }
}

// Registro de eventos con logging
EventEmitter.on("fileRead", async (filename) => {
    console.log(`Archivo "${filename}" fue leído correctamente`);
    await logEvent("LECTURA", filename);
});

EventEmitter.on("fileWrite", async (filename) => {
    console.log(`Archivo "${filename}" fue escrito correctamente`);
    await logEvent("ESCRITURA", filename);
});

EventEmitter.on("fileUpdate", async (filename) => {
    console.log(`Archivo "${filename}" fue actualizado`);
    await logEvent("ACTUALIZACIÓN", filename);
});

EventEmitter.on("fileDelete", async (filename) => {
    console.log(`Archivo "${filename}" fue eliminado`);
    await logEvent("ELIMINACIÓN", filename);
});

// Servidor HTTP
const server = http.createServer(async (req, res) => {
    await logRequest(req); // Log de cada petición

    // Ruta principal
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Bienvenido al Servidor de Archivos");
    }

    // Leer archivo
    else if (req.url === "/leer") {
        fs.readFile(filePath, "utf-8", async (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al leer el archivo");
            }
            await EventEmitter.emit("fileRead", "messages.txt");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Archivo leído con éxito\n\nContenido:\n${data}`);
        });
    }

    // Escribir archivo
    else if (req.url === "/escribir") {
        fs.writeFile(filePath, "Hola, este es un nuevo archivo!", async (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al escribir el archivo");
            }
            await EventEmitter.emit("fileWrite", "messages.txt");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Archivo escrito con éxito");
        });
    }

    // Actualizar archivo
    else if (req.url === "/actualizar") {
        fs.appendFile(filePath, "\nNueva línea agregada!", async (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al actualizar el archivo");
            }
            await EventEmitter.emit("fileUpdate", "messages.txt");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Archivo actualizado con éxito");
        });
    }

    // Eliminar archivo
    else if (req.url === "/eliminar") {
        fs.unlink(filePath, async (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al eliminar el archivo (quizá no existe)");
            }
            await EventEmitter.emit("fileDelete", "messages.txt");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Archivo eliminado con éxito");
        });
    }

    // Ruta no encontrada
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada");
    }
});

// Iniciar servidor
server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
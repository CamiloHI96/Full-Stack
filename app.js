const http = require("http");
const math = require("./math");

const server = http.createServer((req, res)=>{
    res.writeHead(200,{"content-type": "text/plain"});
    res.end("Hola Mundo! |desde Server con Node.js |");
});

server.listen(3000, ()=>{
    console.log("Server Running at http://localhost:3000");
    console.log("Resultado de la Multiplicacion", math.multiply(3,2))
});
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    //URL parseada como Objeto
    const parsedUrl = url.parse(req.url, true);

    //Array de parametros
    const query = parsedUrl.query;

    //http response -head
    res.writeHead(200, { 'Content-Type': 'application/json' });

    //http response -body
    res.end(JSON.stringify(
        {
            Message: "Params Recibidos",
            params: query
        }
    ));
});

//http://localhost:3000/?edad=25&name=pepe
//? = para enviar parametros
//& = para separar parametros

// Iniciar servidor
server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

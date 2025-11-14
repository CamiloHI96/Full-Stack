//npm install mysql2
const mysql = require('mysql2');

//Crear conexion
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'clase'
});

//Conectar  a la BDD
con.connect((err)=> {
    if (err) throw err;
    console.log('Conexion a BDD exitosa!');

    //Query: Crear Usuario
    var query = "INSERT INTO usuario (nombre, email) VALUES ('Camilo', 'camilo@example.com')";
    con.query(query, (err, result) =>{
        if (err) throw err;
        console.log("Usuario Creado");
    });
});
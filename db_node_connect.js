//npm install mysql2
const mysql = require('mysql2');

//Crear conexion
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
});

//Conectar  a la BDD
con.connect((err)=> {
    if (err) throw err;
    console.log('Conexion a BDD exitosa!');

    //Crear Base de Datos
    con.query("CREATE DATABASE clase", (err, result) =>{
        if (err) throw err;
        console.log("BD Creada");
    });
});
const { isUtf8 } = require("buffer");
const { error } = require("console");
const fs = require("fs");

//CRUD

//Create, 
// err = por si ahi un error a crear el archivo.
// throw = detiene la ejecucion y muestra el error

// fs.writeFile("messages.txt", "Inicio Del Archivo",(err)=>{
//     //If = Si hay error
//     if(err)  throw err;
//     //Si se creo el error
//     console.log("Archivo Creado con exito");
// });

//Read
// fs.readFile("./messages.txt","utf-8",(err, data)=>{
//     if(err) throw err;
//     console.log("El mensaje en el archivo es : \n ",data)
// });

//Update
// fs.appendFile("./messages.txt", "\n Nuevo mensaje", { encoding: "utf-8" }, (err) => {
//     if (err) throw err;
//     console.log("Mensaje agregado a ./messages.txt");
// });

//Delete
// fs.unlink("./messages.txt",(err)=>{
//     if(err) throw err;
//     console.log("Archivo eliminado con exito")
// })
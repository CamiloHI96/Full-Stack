# 📦 Proyecto Compra-Venta (API con Node.js y MySQL)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)

Este proyecto implementa un servidor HTTP en **Node.js** que se conecta a una base de datos **MySQL** para gestionar productos.  
Permite realizar operaciones básicas de CRUD (**Create, Read, Update, Delete**) sobre la tabla `productos`.

Archivo: Params_mysql.js

---

## 📑 Tabla de contenidos
- [Descripción](#-proyecto-compra-venta-api-con-nodejs-y-mysql)
- [Autores](#-autores)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Instalación y configuración](#-instalación-y-configuración)
- [Endpoints disponibles](#-endpoints-disponibles)
- [Ejemplos de uso](#-ejemplos-de-uso)
- [Notas](#-notas)
- [Licencia](#-licencia)

---

## 👨‍💻 Autores
- JUAN CAMILO CORREA  
- [MANUEL FELIPE HENAO](https://github.com/mfhenao)  
- [JUAN CAMILO HERNANDEZ](https://github.com/CamiloHI96)

---

## 🚀 Tecnologías utilizadas
- **Node.js** (módulo `http` y `url`)
- **MySQL2** (para la conexión con la base de datos)
- **JavaScript (ES6)**

---

## ⚙️ Instalación y configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/CamiloHI96/Full-Stack.git
   cd Full-Stack

2. Instala las dependencias:
    npm install mysql2

3. Configura tu base de datos MySQL:
    CREATE DATABASE compra_venta;
    USE compra_venta;

    CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(100)
    );

4. Ajusta la conexión en el archivo principal si tu usuario/contraseña son diferentes:
    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'compra_venta'
    });

5. Ejecuta el servidor:
    node index.js

📌 Endpoints disponibles
    Método	Ruta	Parámetros (query)	Descripción
    POST	/create_product	name, type	Inserta un nuevo producto
    GET	/products_id	id	Consulta un producto por su ID
    POST	/delete_products	id	Elimina un producto por su ID
    POST	/update	id, nuevoName, nuevoType	Actualiza nombre y tipo de un producto
    GET	/products	(sin parámetros)	Lista todos los productos

📖 Ejemplos de uso
    Crear producto
        curl -X POST "http://localhost:3000/create_product?name=Celular&type=Electrónico"

    Listar todos los productos
        curl "http://localhost:3000/products"

    Consultar producto por ID
        curl "http://localhost:3000/products_id?id=1"

    Actualizar producto
        curl -X POST "http://localhost:3000/update?id=2&nuevoName=Laptop&nuevoType=Computador"

    Eliminar producto
        curl -X POST "http://localhost:3000/delete_products?id=1"

MIT License

Copyright (c) 2025 JUAN CAMILO CORREA, MANUEL FELIPE HENAO, JUAN CAMILO HERNANDEZ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
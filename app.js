//Importo la libreria express
const express = require('express');
//Importo la libreria Mysql
const mysql = require('mysql');
//Importo la libreria bodyParser(es un lector de body, un dato que se envia en el put y post)
const bodyParser = require('body-parser');

//Creo una variable puerto, si toma el valor de una variable de entorno llamada PORT o toma el valor 3050
const PORT = process.env.PORT || 3050;
//Creo una instancia de express
const app = express();
//Configo en express que los body proveniente de los put y post son de tipo .json utilizando bodyparser
app.use(bodyParser.json());

//Creo una conexion con una base de datos Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Florcita',
    database: 'node20_mysql',
    port: 3306,
});

//Route
//declaro un servicio que provee el servidor
//le digo a express que es un servicio de tipo GET a la ruta "/" 
//cuando este servicio recibe un request retorna una cadena "Welcome to my API"
app.get ('/', (req, res) =>{
    res.send('Welcome to my API')
});

//All customers
//declaro un servicio que provee el servidor
//le digo a express que es un servicio de tipo GET a la ruta "/customers" 
//cuando este servicio recibe un request retorna una cadena "List of customers"
app.get('/customers', (req,res) =>{
    res.send('List of customers');
})







//Crea una conexion con la base de datos 
connection.connect(error =>{
    if (error) throw error;
    console.log('database server running!');
})
//Inicio el servidor en el puerto configurado
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
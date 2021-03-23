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
//cuando este servicio recibe un request se posiciona sobre el listado de customers si los hay
//con la variable de la dependencia mysql (connection) podemos acceder a un metodo .query al que se le pasara primero el query(sql) y la funcion de callback
//la funcion nos va a devolver error o el resultado de la query, si existe un error lanzara error, si el resultado es mayor a cero significa que se han podido recuperar resultados 
//en caso de que no haya resultados lanzara un msj con que no se encontraron resultados
app.get('/customers', (req,res) =>{
     const sql ='SELECT * FROM customers';

     connection.query(sql,( error, results) =>{
         if (error) throw error;
         if (results.length > 0){
             res.json(results)
         }else{
             res.send('Not result');
         }
     });

});
//cuando este servicio recibe un request por id , recibe parametros 
app.get('/customers/:id', (req,res) =>{
    const {id} = req.params
    const sql = `SELECT * FROM customers WHERE id = ${id}`;
    connection.query(sql,( error, result) =>{
        if (error) throw error;

        if (results.length > 0){
            res.json(result)
        }else{
            res.send('Not result');
        }
    });

});

//le digo a express que es un servicio de tipo POST a la ruta "/add" 
//variable qsl que es igual a insertar un nuevo customers colocando la informacion del objeto
app.post('/add', (req,res) =>{
    const sql = 'INSERT INTO customers SET ?';
//creamos un objeto con la informacion que nos viene desde el frontend
    const customerObj = {
        name: req.body.name,
        city: req.body.city
    };

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Customer created');
    })
});

//le digo a express que es un servicio de tipo PUT a la ruta "/update/:id" 
//cuando este servicio recibe un request retorna una cadena "Update customer"
app.put('/update/:id', (req,res) =>{
    const {id} = req.params;
    const {name,city} = req.body;
    const sql = `UPDATE customers SET name = '${name}', city = '${city}' WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Customer updated');

})});

//le digo a express que es un servicio de tipo DELETE a la ruta "/delete/:id" 
//cuando este servicio recibe un request retorna una cadena "Delete customer"
app.delete('/delete/:id', (req,res) =>{
    const {id} = req.params;
    const sql = `DELETE FROM customers WHERE id = ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete customer')
})});

//Crea una conexion con la base de datos 
connection.connect(error =>{
    if (error) throw error;
    console.log('database server running!')
});

//Inicio el servidor en el puerto configurado
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
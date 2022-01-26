require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const { URL_CONNECTION } = process.env;
const port = process.env.PORT || 5001
mongoose.Promise = global.Promise;
mongoose.connect(`${URL_CONNECTION}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}, () => {
    console.log('DataBase connected')
})

//
//CREAMOS EL SERVIDOR
//
const server = express();
//habilitar el parseo de los datos
server.use(express.urlencoded({extended:true}));
server.use(express.json());
//habilitar el cors
server.use(cors());
//rutas de la server
server.use('/',routes)

server.listen(port ,()=>{
    console.log(`servidor corriendo en el puerto: ${port}`)
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

})
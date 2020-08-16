const express = require("express");
const axios = require("axios")
const app = express();
//let requetItunes = require('ApiItunes');

app.get('/search/:nombre', function (req, res) {
    let resultado = { nombre:'', album:'', tipo: '', resultadoBusqueda:'' } 
    let busqueda = { resultado : [] }
    axios.get('https://itunes.apple.com/search?term='+req.params.nombre+'&limit=25').then(response => {
            for (x of response.data.results) {
                resultado = { nombre: x.artistName, album: x.collectionName, tipo: x.kind };
                busqueda.resultado.push(resultado);
              }
              res.json({ busqueda });
        }).catch(e => {
            console.log(e);
        })
        
       /* axios.get('http://api.tvmaze.com/singlesearch/shows?q='+req.params.nombre).then(response => {
            resultado = { nombre: response.data.name, album: response.data.language, tipo: response.data.type};
            busqueda.resultado.push(resultado);
             res.json({ busqueda }); 
        }).catch(e => {
            console.log(e);
        })*/
        //
});
app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 5000");
});
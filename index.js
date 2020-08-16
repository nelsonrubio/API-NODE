const express = require("express");
const axios = require("axios");
const { response } = require("express");
const app = express();
//let requetItunes = require('ApiItunes');

app.get('/search/:nombre', function (req, res) {
    let one = "https://itunes.apple.com/search?term="+req.params.nombre+"&limit=25";
    let two = "https://api.tvmaze.com/singlesearch/shows?q="+req.params.nombre;
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    let resultado = { nombre:'', album:'', tipo: '', resultadoBusqueda:'' } 
    let busqueda = { resultado : [] }

    axios.all([requestOne, requestTwo]).then(
        axios.spread((...responses) => {
        const getItunes = responses[0].data.results;
        const getTV = responses[1].data;
        for (x of getItunes) {
            resultado = { nombre: x.artistName, album: x.collectionName, tipo: x.kind };
            busqueda.resultado.push(resultado);
        }
        resultado = { nombre: getTV.name, album: getTV.language, tipo: getTV.type};
        busqueda.resultado.push(resultado);
        res.json({ busqueda });
})).catch(errors => {
  // react on errors.
})
        
});
app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 5000");
});
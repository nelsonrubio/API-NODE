const express = require("express");
const axios = require("axios");
//const { response } = require("express");
const app = express();
//let requetItunes = require('ApiItunes');

app.get('/search/:nombre', function(req, res) {
    let one = "https://itunes.apple.com/search?term=" + req.params.nombre + "&limit=25";
    let two = "https://api.tvmaze.com/singlesearch/shows?q=" + req.params.nombre;
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    let resultado = { nombre: '', album: '', tipo: '', imagen: '' }
    let busqueda = { resultado: [] }

    axios.all([requestOne, requestTwo]).then(
        axios.spread((...responses) => {
            responses[0].data.results.map(function(info, index) {
                resultado = { nombre: info.artistName, album: info.collectionName, tipo: info.kind, imagen: info.artworkUrl100 };
                busqueda.resultado.push(resultado);
            });
            resultado = { nombre: responses[1].data.name, album: responses[1].data.language, tipo: responses[1].data.type, imagen: responses[1].data.image.medium };
            busqueda.resultado.push(resultado);
            busqueda.resultado = busqueda.resultado.sort((a, b) => {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }

                return 0;
            })

            res.json({ busqueda });
        })).catch(errors => {})

});
app.listen(5000, () => {
    console.log("El servidor está inicializado en el puerto 5000");
});
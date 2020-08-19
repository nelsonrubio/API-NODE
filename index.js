const express = require("express");
const axios = require("axios");
const app = express();


app.get('/search/:nombre', function(req, res) {
    let resultado = { nombre: '', contenido: '', tipo: '', imagen: '', icon: '' }
    let busqueda = { resultado: [] }
    axios.get('https://itunes.apple.com/search?term=' + req.params.nombre + '&limit=10').then(response => {
            response.data.results.map(function(info, index) {
                resultado = { nombre: info.artistName, contenido: info.collectionName, tipo: info.kind, imagen: info.artworkUrl100, icon: 'https://w7.pngwing.com/pngs/1008/698/png-transparent-musical-note-illustration-apple-music-app-store-itunes-ios-11-share-fruit-nut-subscription-business-model-macrumors-thumbnail.png' };
                busqueda.resultado.push(resultado);
            });
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
        })
        .catch(e => {

        })
    axios.get('https://api.tvmaze.com/singlesearch/shows?q=' + req.params.nombre).then(response2 => {
            resultado = { nombre: response2.data.name, contenido: response2.data.language, tipo: response2.data.type, imagen: response2.data.image.medium, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvxRUx-NTtxbdqgfUxplgQSXUo0j4DD5c0dA&usqp=CAU' };
            busqueda.resultado.push(resultado);
        })
        .catch(e => {

        })

});
app.listen(4000, () => {
    console.log("El servidor está inicializado en el puerto 4000");
});
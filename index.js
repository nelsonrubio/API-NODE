const express = require("express");
const axios = require("axios");
const app = express();


app.get('/search/:nombre', function(req, res) {
    // se declara un objeto para almacenar la informacion que devuelve el api.
    let resultado = { nombre: '', contenido: '', tipo: '', imagen: '', icon: '' }
        // se crea un arreglo para ir guardando los resultados en cada interaccion.
    let busqueda = { resultado: [] }
    axios.get('https://itunes.apple.com/search?term=' + req.params.nombre + '&limit=10').then(response => {
            //se procede a realizar la verificacion de si hay resultados
            if (response.data.results.length > 0) {
                // De tener informacion se recorre el arreglo para extraer cierta informacion y alamecenarla en el arreglo
                response.data.results.map(function(info, index) {
                    resultado = { nombre: info.artistName, contenido: info.collectionName, tipo: info.kind, imagen: info.artworkUrl100, icon: 'https://w7.pngwing.com/pngs/1008/698/png-transparent-musical-note-illustration-apple-music-app-store-itunes-ios-11-share-fruit-nut-subscription-business-model-macrumors-thumbnail.png' };
                    busqueda.resultado.push(resultado);
                });
                // se ordena el arreglo por orden alfabetico
                busqueda.resultado = busqueda.resultado.sort((a, b) => {
                        if (a.nombre > b.nombre) {
                            return 1;
                        }
                        if (a.nombre < b.nombre) {
                            return -1;
                        }

                        return 0;
                    })
                    // se retorna la informacion.
                res.json({ busqueda });
            } else {
                res.json({ busqueda });
            }
        })
        .catch(e => {
            console.log(e)
        })

    // Por la forma en que esta estrucutrada esta api no se itera los resultados ya que siempre devuelve un solo objeto.
    // incialmente se implemento la funcion Axios.all pero tuve que quitarla debido a que el el api.tvmaze si no existe coincidencia no devuelve nada.
    // y como el metodo axios.all no puedo capturar el erro en un try y catch ya que si falla al resolver una promesa falla todo es por eso que lo realice de esta manera.
    axios.get('https://api.tvmaze.com/singlesearch/shows?q=' + req.params.nombre).then(response2 => {
            resultado = { nombre: response2.data.name, contenido: response2.data.language, tipo: response2.data.type, imagen: response2.data.image.medium, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvxRUx-NTtxbdqgfUxplgQSXUo0j4DD5c0dA&usqp=CAU' };
            busqueda.resultado.push(resultado);
        })
        .catch(e => {
            console.log(e)
        })

});
app.listen(4000, () => {
    console.log("El servidor está inicializado en el puerto 4000");
});
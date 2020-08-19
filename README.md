# API TEST

El API inicialmente lo que hace es recibir un parametro de busqueda, el mismo centraliza la busqueda de varias fuentes los ordena y devuelve los resultados en un formato json.

# Instrucciones de instalacion:
1. Tener instalado nodejs version 10.20.1
2. Tener una version de npm 6.14.1
3. Una vez en la carpeta del proyecto ejecutar el comando **npm install** con la consola de comandos

# Instrucciones para ejecutar el API:
1. Ejecutar el siguiente comando: **node index.js** en la carpeta del proyecto con la ayuda de la consola de comando
2. Una vez teniendo el api en ejecucion se puede realizar cualquier busqueda con el siguiente url : **http://localhost:4000/search/ParametroDeBusqueda** se utiliza el puerto 4000 porque ese fue el que se utilizo para inicializar el servidor.
3. La variable **ParametroDeBusqueda** es la informacion que recibe la ruta para realizar la busqueda. Ejemplo: **http://localhost:4000/search/camila**

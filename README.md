Proyecto PokeAPI con Node.js y Express
Este es un proyecto que utiliza la PokeAPI para recuperar información de los Pokémon y permite la generación de archivos PDF con los datos de un Pokémon específico.

Requisitos
Para ejecutar este proyecto, necesitarás:

Node.js versión 12.22.12 o superior
NPM (Normalmente se instala con Node.js)
Instalación
Para instalar las dependencias necesarias para este proyecto, ejecuta el siguiente comando en la carpeta principal del proyecto:

Copy code
npm install
Ejecución
Para ejecutar este proyecto, utiliza el siguiente comando en la carpeta principal del proyecto:

Copy code
node app.js
Esto iniciará el servidor en el puerto 3000.

Endpoints
Este proyecto ofrece dos endpoints:

GET /pokemons: Este endpoint acepta tres parámetros de consulta (limit, page y search) y devuelve una lista de Pokémon de la PokeAPI ordenados alfabéticamente.

POST /pokemon: Este endpoint acepta un cuerpo de solicitud con un parámetro name, que debe ser el nombre de un Pokémon existente. Genera y descarga un archivo PDF con información básica sobre el Pokémon especificado.

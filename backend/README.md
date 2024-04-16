# Tech challenge

Este proyecto cubre los requerimientos expresados en el challenge. Puntos a tener en cuenta:

1. Se implementó un patrón de inyección de dependencias: Con un mecanismo frágil pero suficiente
  para mockear el servicio que se encarga de comunicarse con la API externa.
2. Para parsear los cvs se está usando la API síncrona de la librería `csv-parse`, esto es
  suficiente para los casos de prueba, en entornos con data real es imperativo utilizar la API
  asíncrona.

## Setup

Este proyecto está construido sobre Node 14.21.3.

- Instalar Node 14.21.3, para eso recomiendo instalar `nvm`, luego correr `nvm install 14.21.3` y
  para finalizar correr `nvm use`
- Instalar dependencias
  `npm i`

## Scripts

- Correr los test: `npm test`
- Iniciar la apliación: `npm start`
- Iniciar en _watchmode_ `npm run dev`

## Env

- EXTERNAL_API_SECRET: el secret para la API externa

## Docker

- Crear el container: `docker build -f dockerfile -t [nameTag] .`
- Correr el container: `docker run -d -it -p 3000:3000 --name [name] [nameTag]`

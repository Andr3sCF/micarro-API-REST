# micarro-API-REST

## Instalar node-npm
### Primero descarga el ejecutable y se instala, luego en consola el comando
```
npm install 
```
## Inicializar proyecto Nodejs
```
npm init -y
```
## Instalar dependencias
#### dotenv para manejar credenciales, variables de entorno
#### express para el servidor
#### modulo para conexion a BD
```
npm i dotenv express promise-mysql uuid
```
## Instalar dependencias de desarrollo
#### babel
#### morgan para ver en consola lo que se esta haciendo(get post put delete)
#### nodemon para no tener que estar inicializando el servidor siempre
```
npm i @babel/cli @babel/core @babel/node @babel/preset-env morgan nodemon -D
```
## Ejecutar el proyecto mientras esta en desarrollo
```
npm run dev
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Correr el proyecto

1. Clonar proyecto
2. Copiar el ```.env.template``` y renombrar a ```.env```
3. Ejecutar: 
```
$ npm install 
```
4. Levantar la imagen (Docker desktop needed)
5. Levantar el backend de Nest con alguno de los comandos de abajo:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

6. Para ver los Query/Mutation, visitar el sitio:
```
localhost:3000/graphql
```

## Ejecutar tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

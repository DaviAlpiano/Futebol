# My Project

# Contexto
Projeto de um campeonato de futebol, onde se pode registrar as partidas feitas durante o evento e ter a classificação.

## Técnologias usadas

Back-end:
> Desenvolvido usando: Sequelize, Typescript, Joi, Chai, Sinon, SQL, ESLint

Front-end:
> Desenvolvido usando: React, Javascript, ESLint

## Instalando Dependências

Para todas dependências:
```bash
npm run install:apps 
```
Para dependências back:
```bash
npm run install:back 
```

Para dependências front:
```bash
npm run install:front 
```
## Executando aplicação

* Para rodar o docker, criando os conteiners front-end, back-end e da database:
> Atenção!!! Rode esse comando dentro da pasta "app".

  ```
    docker-compose up -d
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```
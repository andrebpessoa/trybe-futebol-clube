# Trybe Futebol Clube

## No que consiste o projeto?

O projeto foi feito para desenvolver apenas a parte do Backend, com NodeJS e Express. O Frontend já havia sido feito pela equipe da Trybe. A API consiste em dados de um campeonato de futebol com diversos times, onde tivemos que manipular dados no banco de dados do MySQL, criando usuários, visualizando, criando, editando e finalizando partidas, validação de login com JWT, visualização de todos os clubes e por ID e criação de uma tabela com os melhores times.

Algumas tecnologias utilizadas:

* Typescript
* NodeJS
* Programação Orientada a Objetos
* Express
* MySQL
* Sequelize
* Docker
* Mocha
* React

## Como testar o projeto localmente

É necessário ter o [**Docker**](https://www.docker.com/) e o [**Docker Compose**](https://docs.docker.com/compose/) instalado em sua máquina

Clone o projeto:
`git clone git@github.com:andrebpessoa/trybe-futebol-clube.git`

Entre na pasta do projeto:
`cd trybe-futebol-clube`

Execute o script para iniciar o Docker Compose:
`npm run compose:up`

Após um tempo, os contêineres estarão prontos e você poderá acessar o projeto em: <http://localhost:3000>

Para desligar os servidores, utilize o script:
`npm run compose:down`

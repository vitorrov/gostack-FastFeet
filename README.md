<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h2 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
</h2>

<h3 align="center">
  FastFeet
</h3>

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.

Nesse primeiro desafio vamos criar algumas funcionalidades básicas que aprendemos ao longo das aulas até aqui. Esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**, então, bora pro código!

### **Um pouco sobre as ferramentas**

Você deverá criar a aplicação do zero utilizando o [Express](https://expressjs.com/), além de precisar configurar as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### **Funcionalidades**

Abaixo estão descritas as funcionalidades que foram feitas na aplicação.

### **1. Autenticação**

Usuário se autentica utilizando e-mail e senha.

Usuário administrador criado através da funcionalidade de seeds do sequelize.

- Autenticação feita utilizando JWT.
- Validação dos dados de entrada;

### 2. Gestão de destinatários

Funcionalidade para administradores manterem (cadastrar/atualizar) destinatários na aplicação, os destinatários tem os seguintes campos: **nome**, **rua**, **número**, **complemento**, **estado**, **cidade** e **CEP**. Esses dados são guardados no banco de dados, na tabela `recipients`.

Os destinatários não podem se autenticar no sistema, não possuem senha.

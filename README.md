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

### **3. Gestão de entregadores**

Permite que o administrador possa cadastrar entregadores para a plataforma, o entregador possui os seguintes campos:

- id (id do entregador)
- name (nome do entregador);
- avatar_id (foto do entregador);
- email (email do entregador)
- created_at;
- updated_at;

Rotas criadas: listagem/cadastro/atualização/remoção de entregadores;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **4. Gestão de encomendas**

Apesar do entregador estar cadastrado, ele não é independente dentro da plataforma, e o administrador deve cadastrar encomendas para os entregadores.

As encomendas são salvas na tabela orders, que possui os seguintes campos:

- id (id da entrega)
- recipient_id (referência ao destinatário);
- deliveryman_id (referência ao entregador);
- signature_id (referência à uma assinatura do destinatário, que será uma imagem);
- product (nome do produto a ser entregue);
- canceled_at (data de cancelamento, se cancelada);
- start_date (data de retirada do produto);
- end_date (data final da entrega);
- created_at;
- updated_at;

A **data de início** é cadastrada assim que for feita a retirada do produto pelo entregador, e as retiradas só podem ser feitas entre as 08:00 e 18:00h.

A **data de término** da entrega é cadastrada quando o entregador finalizar a entrega:

Os campos **recipient_id** e **deliveryman_id** são cadastrados no momento que for cadastrada a encomenda.

Quando a encomenda é **cadastrada** para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

Rotas criadas: listagem/cadastro/atualização/remoção de encomendas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **Funcionalidades do entregador**

Abaixo estão descritas as funcionalidades feitas para os entregadores.

### **1. Visualizar encomendas**

Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade retorna as encomendas atribuidas a ele, que **não estejam entregues ou canceladas**;

Ele pode também listar apenas as encomendas que já foram **entregues** por ele, com base em seu ID de cadastro;

### 2. Alterar status de encomendas

O entregador tem rotas para incluir uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer **5 retiradas por dia**.

Obs.: Na funcionalidade de finalizar a entrega, o entregador deve enviar uma imagem que irá preencher o campo signature_id da tabela de encomendas.

### 3. Cadastrar problemas nas entregas

O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar, para isso foi criada a tabela `delivery_problems` que contém os seguintes campos:

- delivery_id (referência da encomenda);
- description (descrição do problema que o entregador teve);
- created_at;
- updated_at;

Existe uma rota para a distribuidora listar todas as entregas com algum problema;

Existe uma rota para listar todos os problemas de uma encomenda baseado no ID da encomenda.

Existe uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados);

Existe uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda.

Quando uma encomenda for cancelada, o entregador recebe um e-mail informando-o sobre o cancelamento.

<!-- @format -->

# Ecommerce de Móveis Fullstack para o Desafio da Compass

Este projeto é um e-commerce de móveis fullstack desenvolvido como parte do desafio da Compass. Ele consiste em um back-end construído em NestJS e um front-end em React, proporcionando uma plataforma completa para a compra e gestão de móveis.

<h2 align="center">Tecnologias 💻</h2>
<br>
<p align='center'>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/Cloudinary-232F3E?style=for-the-badge&logo=cloudinary&logoColor=white" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />&nbsp;&nbsp;
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Funcionalidades do Backend

- **Autenticação JWT**: As rotas protegidas utilizam autenticação JWT para garantir segurança.
- **CRUD de Produtos**: Gerenciamento completo dos produtos do e-commerce, incluindo a possibilidade de importação em massa.
- **Gestão de Categorias**: Relacionamento entre produtos e categorias, permitindo organizar os itens da loja.
- **Upload de Imagens**: Integração com Cloudinary para armazenar imagens dos produtos de forma eficiente.
- **Paginação**: As rotas de listagem de produtos oferecem paginação opcional para facilitar a navegação.
- **Gestão de Newsletter**: Envio de newsletters e registro de logs dos envios realizados.
- **Criptografia de Senha**: As senhas dos usuários são armazenadas de forma segura utilizando criptografia.

## Configuração do Projeto

```bash
$ yarn install
```

## Compilar e executar o projeto

```bash
# modo desenvolvimento
$ yarn run start

$ yarn run start:dev
```

## Recursos

Confira alguns recursos úteis ao trabalhar com NestJS:

- Visite a [Documentação do NestJS](https://docs.nestjs.com) para saber mais sobre o framework.
- Para perguntas e suporte, visite nosso [canal no Discord](https://discord.gg/G7Qnnhy).
- Veja [cursos oficiais](https://courses.nestjs.com/) para se aprofundar e obter mais experiência prática.
- Visualize o grafo de sua aplicação e interaja em tempo real usando o [NestJS Devtools](https://devtools.nestjs.com).
- Para suporte empresarial, veja nosso [Enterprise Support](https://enterprise.nestjs.com).

## Rotas do Backend

### **Produtos (`/products`)**

1. **GET `/products`** - Lista todos os produtos. Esta rota é pública e pode ser acessada por qualquer usuário.
2. **GET `/products/:id`** - Busca um produto específico pelo seu ID. Esta rota é pública.
3. **POST `/products`** - Cria um novo produto. Esta rota é protegida e exige autenticação.
4. **PATCH `/products/:id`** - Atualiza parcialmente um produto existente. Esta rota é protegida.
5. **DELETE `/products/:id`** - Remove um produto existente. Esta rota é protegida.
6. **POST `/products/import`** - Importa produtos a partir de uma lista em JSON. Esta rota é protegida.

### **Categorias (`/categories`)**

1. **GET `/categories`** - Lista todas as categorias. Esta rota é pública.
2. **POST `/categories`** - Cria uma nova categoria. Esta rota é protegida e exige autenticação.
3. **PATCH `/categories/:id`** - Atualiza uma categoria existente. Esta rota é protegida.
4. **DELETE `/categories/:id`** - Remove uma categoria existente. Esta rota é protegida.

### **Usuários (`/users`)**

1. **POST `/users`** - Cria um novo usuário. Esta rota é protegida por autenticação e é feita para permitir que apenas usuários autorizados possam adicionar novos usuários.
2. **GET `/users/:id`** - Busca um usuário específico pelo ID. Esta rota é protegida, necessitando autenticação.
3. **PATCH `/users/:id`** - Atualiza parcialmente um usuário existente. Esta rota é protegida.
4. **DELETE `/users/:id`** - Remove um usuário específico. Esta rota é protegida.

### **Newsletter (`/newsletter`)**

1. **POST `/newsletter/send`** - Envia um email de newsletter para um usuário. Utiliza a integração com o SendGrid e armazena logs dos emails enviados em uma tabela no banco de dados.

### Estrutura das Entidades

#### **Produto (`Product`)**

- **`id` (number)**: ID único do produto.
- **`name` (string)**: Nome do produto (até 50 caracteres).
- **`sku` (string)**: Código SKU do produto (até 10 caracteres).
- **`category_id` (number)**: ID da categoria do produto.
- **`description` (string)**: Descrição curta do produto (até 250 caracteres).
- **`large_description` (string)**: Descrição detalhada do produto (até 500 caracteres).
- **`price` (decimal)**: Preço do produto.
- **`discount_price` (decimal, nullable)**: Preço com desconto (opcional).
- **`is_new` (boolean)**: Indica se o produto é um lançamento.
- **`image_url` (string, nullable)**: URL da imagem do produto (opcional).
- **`created_date` (timestamp)**: Data de criação do produto.
- **`updated_date` (timestamp)**: Data de última atualização do produto.

### Considerações Gerais

- As rotas para **produtos**, **categorias**, e **usuários** são implementadas com autenticação e autorização, utilizando o `JwtAuthGuard` para proteger rotas que exigem acesso autenticado.
- O upload de imagens de produtos é feito por integração com o **Cloudinary**, permitindo armazenar e acessar as imagens de forma segura.

## Funcionalidades do Frontend

O frontend do projeto é desenvolvido em React e Styled Components, criando uma interface visual atraente e responsiva para os usuários. As principais funcionalidades do front-end incluem:

- **Página Inicial**: Exibe os destaques e as melhores ofertas de produtos.
- **Listagem de Produtos**: Página que lista todos os produtos disponíveis, com filtros e paginação para melhorar a navegação.
- **Detalhes do Produto**: Visualização detalhada de um produto selecionado, exibindo imagens, descrições e preços.

### Rotas Disponíveis no Frontend

1. **`/`** - Página inicial.
2. **`/shop`** - Lista todos os produtos com possibilidade de filtro e ordenação.
3. **`/shop/:id`** - Página de detalhes de um produto específico.

### Funcionalidades a Desenvolver

- **Carrinho de Compras**: Adicionar produtos ao carrinho e gerenciar o status dos itens.
- **Login Admin**: Interface para administração e gerenciamento de produtos e categorias.
- **Checkout**: Finalização de compras, com formulário de envio e resumo do pedido.

### Tecnologias Utilizadas no Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Styled Components**: Biblioteca para estilização de componentes de forma dinâmica.
- **Axios**: Utilizado para fazer requisições ao backend.
- **React Router**: Para navegação entre as páginas do front-end.

## Critérios de Aceite (Tela Home)

### Cenário: Acesso bem-sucedido a tela inicial da aplicação

- [x] Dado que o usuário entrou na aplicação
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário clicar em “Shop”
- [x] Então o sistema deverá redirecionar para uma página de listagens de produtos.

### Cenário: Rolar página

- [x] Dado que o usuário acessou a aplicação
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário rolar a página
- [x] Então o sistema deverá exibir em sua primeira seção, opções de categorias.

### Cenário: Acesso as categorias

- [x] Dado que o usuário visualizou as categorias
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário clicar em uma opção de categoria
- [x] Então o sistema deverá redirecionar para uma página de listagem de produtos da
      categoria referente.

### Cenário: Visualização de produtos

- [x] Dado que o usuário não clicou em categorias
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário continuar rolando a página
- [x] Então o sistema deverá exibir uma amostragem de produtos com desconto.

### Cenário: Indicação de desconto ou itens novos

- [x] Dado que o usuário está visualizando os produtos
- [x] E que o sistema está funcionando corretamente
- [x] Então o sistema deverá exibir uma espécie de tag nos produtos novos e nos produtos
      com desconto.

### Cenário: Hover nos produtos

- [x] Dado que o usuário está visualizando os produtos
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário passar o mouse por cima de um produto
- [x] Então o sistema deverá exibir uma espécie de hover sobre o produto em questão.

### Cenário: Detalhes do Produto

- [x] Dado que o usuário está visualizando os produtos
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário clicar em “See Details”
- [x] Então o sistema deverá redirecionar para uma tela de detalhes do produto.

### Cenário: Exibição de mais produtos

- [ ] Dado que o usuário visualizou os produtos da tela inicial
- [ ] E que o sistema está funcionando corretamente
- [ ] Quando o usuário clicar em “Show More”
- [ ] Então o sistema deverá redirecionar para uma página de listagens de produtos.

## Critérios de Aceite (Tela Shop)

### Cenário: Funcionamento dos menus

- [x] Dado que o usuário entrou na tela Shop
- [x] E que o usuário quer voltar a tela inicial
- [x] Quando o usuário clicar em “Home”
- [x] Então o sistema deverá redirecionar para a tela inicial da aplicação.

### Cenário: Definição de filtros

- [ ] Dado que o usuário entrou na tela Shop
- [ ] E que o usuário quer visualizar produtos específicos
- [ ] Quando o usuário clicar em “Filter”
- [ ] Então o sistema deverá exibir uma listagem de filtros que deverão poder ser
      selecionados como um checkbox.

### Cenário: Limite de resultado

- [x] Dado que o usuário entrou na tela Shop
- [x] E que o usuário não realizou nenhuma ação ainda
- [x] Então o sistema deverá exibir uma listagem de 16 produtos por default

### Cenário: Definição de ordem

- [x] Dado que o usuário entrou na tela Shop
- [x] E que o usuário quer ordernar os produtos
- [x] Quando o usuário clicar no campo definido para “Short by”
- [x] Então o sistema deverá exibir duas opções de listagem, “Crescente” ou “Descrescente”.

### Cenário: Indicação de desconto ou itens novos

- [x] Dado que o usuário está visualizando os produtos
- [x] E que o sistema está funcionando corretamente
- [x] Então o sistema deverá exibir uma espécie de tag nos produtos novos e nos produtos
      com desconto.

### Cenário: Hover nos produtos

- [x] Dado que o usuário está visualizando os produtos
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário passar o mouse por cima de um produto
- [x] Então o sistema deverá exibir uma espécie de hover sobre o produto em questão.

### Cenário: Detalhes do Produto

- [x] Dado que o usuário está visualizando os produtos
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário clicar em “See Details”
- [x] Então o sistema deverá redirecionar para uma tela de detalhes do produto.

### Cenário: Exibição de mais produtos

- [x] Dado que o usuário visualizou os primeiros produtos exibidos
- [x] E que o usuário quer continuar navegando pelos produtos
- [x] Quando o usuário clicar em uma nova página ou em “Next”
- [x] Então o sistema deverá trazer resultados do banco baseados naquela página respeitando
      os filtros existentes.

## Critérios de Aceite (Tela Detalhes do Produto)

### Cenário: Redirecionamento para Home

- [x] Dado que o usuário entrou na tela de detalhes do Produto
- [x] E que o usuário quer voltar a tela inicial
- [x] Quando o usuário clicar em “Home”
- [x] Então o sistema deverá redirecionar para a tela inicial da aplicação.

### Cenário: Redirecionamento para o Shop

- [x] Dado que o usuário entrou na tela de detalhes do Produto
- [x] E que o usuário quer voltar a tela de produtos
- [x] Quando o usuário clicar em “Shop”
- [x] Então o sistema deverá redirecionar para a tela de produtos.

### Cenário: Exibição de detalhes

- [x] Dado que o usuário entrou na tela de detalhes do Produto
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário clicar em imagens secundárias
- [x] Então o sistema deverá substituir a imagem sendo exibida pela que foi selecionada.

### Cenário: Exibição de descrição

- [x] Dado que o usuário entrou na tela de detalhes do Produto
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário rolar a página
- [x] Então o sistema deverá exibir detalhes descritivos daquele produto

### Cenário: Produtos relacionados

- [ ] Dado que o usuário entrou na tela de detalhes do Produto
- [ ] E que rolou a página até os produtos selecionado
- [ ] Quando o usuário os visualizar
- [ ] Então o sistema deverá estar exibindo produtos da mesma categoria que o produto dos
      detalhes.

### Cenário: Indicação de desconto ou itens novos

- [x] Dado que o usuário está visualizando os produtos relacionados
- [x] E que o sistema está funcionando corretamente
- [x] Então o sistema deverá exibir uma espécie de tag nos produtos novos e nos produtos
      com desconto.

### Cenário: Hover nos produtos

- [ ] Dado que o usuário está visualizando os produtos relacionados
- [ ] E que o sistema está funcionando corretamente
- [ ] Quando o usuário passar o mouse por cima de um produto
- [ ] Então o sistema deverá exibir uma espécie de hover sobre o produto em questão.

### Cenário: Detalhes do Produto

- [x] Dado que o usuário está visualizando os produtos relacionados
- [x] E que o sistema está funcionando corretamente
- [x] Quando o usuário clicar em “See Details”
- [x] Então o sistema deverá redirecionar para uma tela de detalhes do novo produto clicado.

### Cenário: Exibição de mais produtos

- [ ] Dado que o usuário visualizou os primeiros produtos relacionados exibidos
- [ ] E que o usuário quer continuar visualizando mais produtos
- [ ] Quando o usuário clicar em “Show More”
- [ ] Então o sistema deverá exibir nesta mesma página uma segunda fileira de produtos

### Cenário: Exibição de mais produtos 2x

- [ ] Dado que o usuário já clicou em "Show More” 1x
- [ ] E que o usuário quer continuar visualizando mais produtos
- [ ] Quando o usuário clicar em “Show More” novamente
- [ ] Então o sistema deverá redirecionar para a tela “Shop” exibindo produtos somente
      produtos relacionados, ou seja, da mesma categoria.

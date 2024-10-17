<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# TODO - LIST

-[] Criptografia de senha
-[] Role de

### Rotas do Backend

#### **Produtos (`/products`)**

1. **GET `/products`** - Lista todos os produtos. Esta rota é pública e pode ser acessada por qualquer usuário.
2. **GET `/products/:id`** - Busca um produto específico pelo seu ID. Esta rota é pública.

3. **GET `/products/filter`** - Busca produtos de acordo com critérios de filtro específicos. Esta rota é pública.

4. **POST `/products`** - Cria um novo produto. Esta rota é protegida, exigindo autenticação (usuários autenticados).

5. **PATCH `/products/:id`** - Atualiza parcialmente um produto existente. Esta rota é protegida.

6. **DELETE `/products/:id`** - Remove um produto existente. Esta rota é protegida.

#### **Categorias (`/categories`)**

- Não foi mencionado diretamente o CRUD para categorias, mas existe uma relação direta com os produtos, sendo possível listar produtos por categoria através das relações implementadas.

#### **Usuários (`/users`)**

1. **POST `/users`** - Cria um novo usuário. Esta rota é protegida por autenticação e é feita para permitir que apenas usuários autorizados possam adicionar novos usuários.
2. **GET `/users/:id`** - Busca um usuário específico pelo ID. Esta rota é protegida, necessitando autenticação.

3. **PATCH `/users/:id`** - Atualiza parcialmente um usuário existente. Esta rota é protegida.

4. **DELETE `/users/:id`** - Remove um usuário específico. Esta rota é protegida.

#### **Newsletter (`/newsletter`)**

1. **POST `/newsletter/send`** - Envia um email de newsletter para um usuário. Utiliza a integração com o SendGrid e armazena logs dos emails enviados em uma tabela no banco de dados.

### Estrutura das Entidades

#### **Produto (`Product`)**

- **`id` (number)**: ID único do produto.
- **`name` (string)**: Nome do produto (até 50 caracteres).
- **`sku` (string)**: Código SKU do produto (até 10 caracteres).
- **`category_id` (number)**: ID da categoria do produto.
- **`category` (Category)**: Relação `ManyToOne` com a entidade `Category`.
- **`description` (string)**: Descrição curta do produto (até 250 caracteres).
- **`large_description` (string)**: Descrição detalhada do produto (até 500 caracteres).
- **`price` (decimal)**: Preço do produto.
- **`discount_price` (decimal, nullable)**: Preço com desconto (opcional).
- **`discount_percent` (int, nullable)**: Percentual de desconto (opcional).
- **`is_new` (boolean)**: Indica se o produto é um lançamento.
- **`image_data` (bytea, nullable)**: Imagem do produto em formato binário (opcional).
- **`created_date` (timestamp)**: Data de criação do produto.
- **`updated_date` (timestamp)**: Data de última atualização do produto.

#### **Categoria (`Category`)**

- **`id` (number)**: ID único da categoria.
- **`name` (string)**: Nome da categoria (até 50 caracteres).
- **`products` (Product[])**: Relação `OneToMany` com a entidade `Product`.

#### **Usuário (`User`)**

- **`id` (number)**: ID único do usuário.
- **`username` (string)**: Nome de usuário (único).
- **`password` (string)**: Senha do usuário (armazenada de forma criptografada).
- **`refreshToken` (string, nullable)**: Refresh token associado ao usuário para controle de sessões (opcional).

#### **Newsletter Log (`NewsletterLog`)**

- **`id` (number)**: ID único do log.
- **`to` (string)**: Email do destinatário.
- **`subject` (string, nullable)**: Assunto do email (opcional).
- **`content` (string, nullable)**: Conteúdo do email enviado (opcional).
- **`sentAt` (Date)**: Data em que o email foi enviado.
- **`status` (string)**: Status do envio do email (`SENT` ou `FAILED`).
- **`error` (string, nullable)**: Mensagem de erro em caso de falha no envio do email (opcional).

### Considerações Gerais

- As rotas para **produtos** e **usuários** são implementadas com autenticação e autorização adequadas, utilizando o `JwtAuthGuard` para proteger rotas que exigem acesso autenticado.
- A entidade **usuário** possui senhas armazenadas de forma hashada usando **bcrypt**, para garantir a segurança das informações.
- As integrações com o **SendGrid** permitem o envio de emails para os usuários, e o registro dos envios está sendo mantido para controle e monitoramento.
- Algumas rotas possuem permissões públicas para facilitar o acesso dos clientes (como listar produtos), enquanto operações sensíveis (criação, atualização, exclusão) exigem autenticação.

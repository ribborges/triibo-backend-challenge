# Teste Prático - Desenvolvedor Back-End Node.js Triibo

Desafio da Triibo para vaga de Dev Back-End Node.js

## Pré-requisitos

- Node.js
- npm
- Docker

## Instruções

1. Baixe e instale [node.js](https://nodejs.org/en).

2. Instale e configure o [docker](https://docs.docker.com/engine/install/).

3. Crie um arquivo .env na raiz do projeto

4. Adicione as seguintes variaveis:

```
PORT=<Porta do server>
OMDB_API_KEY=<Chave da API OMDB>
SECRET=<Segredo para hash de senhas>
NODE_ENV=<Ambiente da aplicação. Use 'development' para uso local>
```

5. Adicione o arquivo 'serviceAccountKey.json' com a chave da sua base Firestore

6. Abra seu terminal/cmd no diretório do projeto

7. Instale as dependencias

```bash
> npm install
```

8. Inicie a API em ambiente de desenvolvimento

```bash
> npm run dev
```

## Scripts

- *dev*: Iniciar API em ambiente de desenvolvimento

```bash
> npm run dev
```

- *start*: Iniciar API

```bash
> npm run start
```

- *docs*: Gera documentação da api

```bash
> npm run docs
```

- *test*: Executar testes do jest

```bash
> npm run start
```

## Rotas

### API

> */api/movies*
> **GET**       Consulta filme por ID
> **POST**      Cadastar filme
> **UPDATE**    Atualizar filme
> **DELETE**    Excluir filme

> */api/movies/all*
> **GET**       Lista todos os filmes cadastrados

> */api/auth/login*
**POST**        Fazer login

> */api/auth/register*
**POST**        Registrar novo usuário

> */api/auth/logout*
**POST**        Fazer logout

### Documentação

> */apidoc*
**GET**         Acessa página de documentação (Rodar script *docs* para gerar a documentação)

## Executar projeto com o Docker

1. Construa a imagem Docker

```bash
> docker build -t triibo-backend-challenge .
```

2. Rode o container

```bash
> docker run -p 8000:8000 triibo-backend-challenge
```

- A API estará acessível em *http://localhost:8000*
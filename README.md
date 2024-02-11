# API de Enquetes em Node.js

Este repositório contém o código-fonte de uma API desenvolvida durante o Next Level Week (NLW), um evento promovido pela Rocketseat. Esta API foi construída utilizando Node.js e oferece funcionalidades para criar, buscar e votar em enquetes, além de fornecer resultados em tempo real.

## Funcionalidades

- **Cadastro de Enquetes:** Permite o cadastro de novas enquetes com opções de resposta.
- **Busca de Enquetes:** Permite buscar enquetes cadastradas.
- **Votação em Enquetes:** Permite que os usuários votem em uma opção específica de uma enquete.
- **Resultados em Tempo Real:** Fornece os resultados das enquetes em tempo real, permitindo que os usuários visualizem as atualizações enquanto estão na página da enquete.

## Tecnologias Utilizadas

- Node.js
- Fastify
- WebSocket (para atualizações em tempo real)
- Prisma (ORM)
- PostgreSQL
- Redis (BD Em Memória) 
- TypeScript
- Docker
- Zod 

## Como Utilizar

1. Clone este repositório: `git clone https://github.com/VzinCoder/NLW-node.git`
2. Instale as dependências: `npm install`
3. Suba o Container: `docker compose up -d`
4. Suba o Servidos: `npm run dev`
4. Acesse a API através de `http://localhost:3333`

## Documentação da API

### Cadastro de Enquetes

**Endpoint:** `/polls`  
**Método:** `POST`

Este endpoint permite o cadastro de novas enquetes com opções de resposta.

#### Parâmetros da Requisição

| Parâmetro     | Tipo     | Descrição                                  |
|---------------|----------|--------------------------------------------|
| `title`       | String   | Pergunta da enquete                        |
| `options`     | Array    | Array de opções de resposta da enquete     |

#### Exemplo de Requisição

```json
POST /polls
{
  "title": "Qual sua linguagem de programação favorita?",
  "options": ["JavaScript", "Python", "Java", "C++"]
}
```
---
### Busca de Enquetes

**Endpoint:** `/polls/:pollId`  
**Método:** `get`

Este endpoint permite buscar enquetes cadastradas.

#### Parâmetros de URL

| Parâmetro     | Tipo     | Descrição                                  |
|---------------|----------|--------------------------------------------|
| `pollId`       | String   | UUID  da enquete 

#### Resposta de Sucesso

Se a enquete for encontrada, a resposta será um objeto JSON com os seguintes campos:

- **poll** (object): Objeto representando a enquete.
  - **id** (string, UUID): O ID único da enquete.
  - **title** (string): O título da enquete.
  - **options** (array): Lista de opções da enquete.
    - **id** (string, UUID): O ID único da opção.
    - **title** (string): O título da opção.
    - **score** (number): A contagem de votos para essa opção.

#### Exemplo de resposta:

```json
{
  "poll": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Título da Enquete",
    "options": [
      {
        "id": "1a2b3c4d-5e6f-7890-a1b2-c3d4e5f6a1b2",
        "title": "Opção A",
        "score": 10
      },
      {
        "id": "5e6f7g8h-9i0j-1234-b5c6-d7e8f9g0h1i",
        "title": "Opção B",
        "score": 5
      }
    ]
  }
}

```


#### Resposta de Erro

```json
{
  "message": "Poll not found"
}
```
---
### Votação em Enquetes

**Endpoint:** `/polls/:pollId/votes`  
**Método:** `POST`

Este endpoint permite o usuário vote em uma opção de uma enquete.

#### Parâmetros de URL

| Parâmetro     | Tipo     | Descrição                                  |
|---------------|----------|--------------------------------------------|
| `pollId`       | String   | UUID  da enquete  

#### Parâmetros de Corpo

| Parâmetro     | Tipo     | Descrição                                  |
|---------------|----------|--------------------------------------------|
| `pollOptionId`       | String   | UUID da opção da enquete                        |


#### Exemplo de Requisição

```json
POST /polls
{
  "pollOptionId": "41f71417-ee6c-4a86-b950-96d6efb1c026"
}
```

#### Resposta de Erro Status 400

```json
{
  "message": "You already voted on this poll"
}
```

Esse erro acontece caso o usuário vote na mesma opção da enquete. Se ele tentar votar em outra opção da mesma enquete, a troca será realizada normalmente e nenhum erro será retornado.

---

### Resultados em Tempo Real

**Endpoint:** `/poll/:pollId/results`  
**Método:** `GET`

Fornece os resultados das enquetes em tempo real, permitindo que os usuários visualizem as atualizações enquanto estão na página da enquete.


#### Parâmetros de URL




| Parâmetro     | Tipo     | Descrição                                  |
|---------------|----------|--------------------------------------------|
| `pollId`       | String   | UUID  da enquete  





#### Exemplo de resposta:

```json
{
  "pollOptionId":"a7a4f559-29e5-48fa-b28c-96e9216b3d92",
  "votes":10
}

```


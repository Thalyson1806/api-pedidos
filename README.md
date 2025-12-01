# API de Pedidos - Desafio Técnico

API REST para gerenciamento de pedidos 

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/Thalyson1806/api-pedidos.git
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as variáveis:
```
MONGO_URI=sua_string_de_conexao_mongodb
PORT=3000
```
> **Observação:** Caso queira testar com o banco já configurado, entre em contato que posso fornecer a string de conexão.

4. Execute o projeto:
```bash
node index.js
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /order | Criar novo pedido |
| GET | /order/list | Listar todos os pedidos |
| GET | /order/:id | Buscar pedido por ID |
| PUT | /order/:id | Atualizar pedido |
| DELETE | /order/:id | Deletar pedido |

## Exemplo de Requisição (POST /order)
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

## Transformação dos Dados

A API realiza o mapeamento dos campos recebidos para o formato do banco:

| Campo Recebido | Campo Salvo   |
|----------------|-------------  |
| numeroPedido   |   orderId     |
| valorTotal     |   value       |
| dataCriacao    |  creationDate |
| idItem         |   productId   |
| quantidadeItem |   quantity    |
| valorItem      |    price      |

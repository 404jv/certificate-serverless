> 💡 Pergunta: O que é serverless?

Responda aqui

O `serverless` é uma forma de colocar a aplicação no ar sem precisar fazer as configurações do servidor, esse trabalho é feito em um serviço de nuvem que é o provedor. Uma das vantagens é alocar recursos da máquina sob demanda, isso é, quando o server está com alta demanda mais recursos será colocados nessa máquina, como consequência mais caro será nesse período de uso e o oposto também ocorre, se o server estiver com pouco demanda menos recurso será alocado e menor o custo do servidor.

> 💡 Pergunta: Quais os passos para criar um projeto utilizando o framework [Serverless](https://www.serverless.com/)?

Responda aqui

Primeiro, rodar o comando de instalação. Existem vários, essa é uma das formas:

```bash
$ curl -o- -L https://slss.io/install | bash
```

Após isso, feche e abra o bash. E rode o comando abaixo para criar o projeto com o template `aws-nodejs-typescript` ficando assim:

```bash
$ serverless create --template aws-nodejs-typescript --path ignitecertificate
```

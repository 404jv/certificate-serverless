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

> 💡 Pergunta: Qual o passo a passo para criar uma function?

Responda aqui

Podemos criar um arquivo com o nome da função, por exemplo, `hello.ts` e dentro do arquivo criamos a função hello, assim:

```bash
export const handle = async (event) => {

}
```

Essa função recebe sempre um parâmetro `event` que é justamente o evento que fez essa função ser chamada, após isso podemos retornar um objeto com um `body` que vai ser o `json` retornado na API, passamos os `headers` para a configuração do tipo de retorno e um `statusCode` também. Ficando Assim:

```bash
export const handle = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello, world! With serverless",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
}
```

Com a função configurada, abrimos o arquivo `serverless.yml` e criamos (se não existi) uma parte chamada functions, que vai ter uma chave chamada hello, assim:

```yaml
functions:
  hello:
```

agora passamos todas as configs para essa função, como o local dela que é `src/functions/hello.handle` é importante colocar `hello.handle` mesmo que não seja o nome do arquivo, pois o `serverless` precisa sabe qual função de dentro do arquivo ele vai chamar:

```yaml
functions:
  hello:
    handler: src/functions/hello.handle
```

Agora criamos uma chave dentro do `hello` chamada `events`, e outra chamada `http` ficando assim:

```yaml
functions:
  hello:
    handler: src/functions/hello.handle
    events:
      - http:
```

dentro de http passamos uma chave com o `path` que é a rota, no caso pode ser `/hello` e outra chave com o `method` que vai ser `GET` e por fim, passamos uma chamada `cors` que recebe `true`. Ficando assim:

```yaml
functions:
  hello:
    handler: src/functions/hello.handle
    events:
      - http:
          path: /hello
          method: GET
          cors: true
```

> 💡 Pergunta: Qual o comando para salvar as credenciais da AWS dentro do serverless? 

Responda aqui

o comando é:

```bash
$ serveless config credentials --provider aws --key=KEY --secret SECRET
```

> 💡 Pergunta: O que é o DynamoDB? Explique com o máximo de detalhes, irá te ajudar a entender e fixar o conhecimento ;)

Responda aqui

`DynamoDB` é um banco `NoSQL` isso é, um banco não relacional. O lado bom é que possui uma velocidade maior do que outros bancos relacionais, possui grandes vantagens em se trabalhar com esse banco na amazon, como: gerenciamento de segurança, backups, baixa latência e outras vantagens que são garantidas e feitas automaticamente pala Amazon. Alguns contras é que em casos de precisar de uma banco com dados mais complexos, o DynamoDB por ser um banco não relacional vai ser ruim.
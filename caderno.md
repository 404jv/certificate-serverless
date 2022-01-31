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

> 💡 Pergunta: Como podemos utilizar o DynamoDB localmente? Quais as configurações necessárias para isso?

<aside>
🆘 Para executar o DynamoDB localmente é preciso ter o Java Runtime Engine (JRE) na versão 6.x ou superior.

</aside>

Responda Aqui

Primeiro instale o `serverless-dynamodb-local` com yarn ou `npm`.  E instalar o dynamoDb:

```yaml
$ serverless dynamodb install
```

Após isso, no plugins do arquivo `severless.yml` adicionamos o `serverless-dynamodb-local` ficando assim:

```yaml
plugins:
  - serverless-offline
  - serverless-webpack
  - serverless-dynamodb-local
```

Feito isso podemos declarar as tabelas na seção de `Resources` que fica dentro de `resource` um exemplo de tabela é:

```yaml
resources:
  Resources:
    dbCertificateUsers:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: users_certificates
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
```

Uma configuração importante para criar a tabela automaticamente, declarar a porta e também dizer que o banco rodara em local e desenvolvimento:

```yaml
custom:
	...
  dynamodb:
    stages:
      - dev
      - local
    start:
      port: 8000
      inMemory: true
      migrate: true
```

Por fim, rodamos o comando que vai inciar o DynamoDB e rodar as tabelas:

```yaml
$ serverless dynamodb start
```

> 💡 Pergunta: O que a lib [puppeteer](https://github.com/puppeteer/puppeteer) faz?
> 💡Pergunta: Quais os passos para gerar um PDF utilizando o pupeeter? (Exemplifique com código se achar necessário)

Responda aqui

Essa lib é usada para gerar PDF. 

Primeiro fazemos um objeto Browser, passando algumas configurações:

```tsx
const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
});
```

com esse objeto pronto, criamos uma nova página:

```tsx
const page = await browser.newPage()
```

essa página é uma aba, então  podemos preenche-lá com o conteúdo. Mas antes, podemos usar o método `pdf` do objeto page, passando um objeto de configurações dentro do método, assim:

```tsx
const certificate = await page.pdf({
    format: 'a4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    path: process.env.IS_OFFLINE ? './certificate.pdf' : null
});
```

> 💡 Pergunta: Como fazemos o envio do certificado para um bucket no S3? (Exemplifique com código se achar necessário)


Responda aqui

Importamos a classe `S3` da `aws-sdk` assim:

```tsx
import { S3 } from "aws-sdk";
```

Agora, instanciamos essa classe:

```tsx
const s3 = new S3();
```

Podemos usar o método `putObject` desse objeto, passando o nome do Bucket, nome do arquivo, tipo de conexão (ACL) no caso vai ser `public-read`, além disso, passamos o body, e o tipo de arquivo. Ficando assim:

```tsx
await s3
    .putObject({
      Bucket: "serverlesscertificatesignite",
      Key: `${id}.pdf`,
      ACL: "public-read",
      Body: pdf,
      ContentType: "application/pdf",
    })
	  .promise();
```

> 💡 Sugestão: Explique, com código, como fazemos uma busca no DynamoDB.

Responda aqui

Importamos o document do DynamoDB client:

```tsx
import { document } from '../utils/dynamodbClient';
```

Usamos o método `query` desse objeto. Passando como parâmetro um objeto contendo `TableName`, `KeyConditionExpression` que no caso é condição `id = :id` , e por fim, `ExpressionAttributeValues` que recebe um objetos contendo o parâmetro e o valor do mesmo, no caso temos só um parâmetro que foi o `:id`, e o valor desse vai ser o id vindo da URL. Tudo isso fica assim:

```tsx
const response = await document
    .query({
      TableName: 'users_certificates',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      },
    })
    .promise();
```

O retorno vai ter um array chamado `Items` como essa busca só foi por um usuário, então apenas a posição 0 é importante. Podemos colocar esse resultado em uma constante:

```tsx
const userCertificate = response.Items[0];
```

> 💡 Sugestão: Documente, para futuras consultas, as configurações finais para realizar o deploy da aplicação.

Responda aqui

Adicionamos isso no `serverless.yml`:

```yaml
package:
  individually: false
  include:
    - "./src/templates/**"
```

E roda o comando:

```bash
$ yarn deploy
```
# 🚀Backend Node.js integrado ao Mongodb
>> Projeto criado na aula de Bancos de Dados Não Relacional do curso de Desenvolvimento de Software Multiplataforma da Fatec Votorantim

## 🗝️Informações Básicas
É necessário adicionar a chave abaixo no seu arquivo ```package.json```
```json
{ "type": "module" }
```
## 💡Dicas
- Clone o projeto
- Renomeie o arquivo .env-example para .env e informe a sua string de conexão ao MongoDB
- Instale as dependências com ```npm i```
- Abra o Terminal no VSCode e informe ```npm run dev```

## 📦Packages Utilizados
```
npm i express
npm i mongodb
npm i dotenv
npm i nodemon -D
npm i express-validator
npm i cors
npm i bcryptjs
npm i jsonwebtoken
```

## 📝Função de cada um dos pacotes
<table><thead><tr><th>Pacote</th><th>Descrição</th></tr></thead><tbody><tr><td><code>express</code></td><td>Framework web rápido, flexível e minimalista para Node.js.</td></tr><tr><td><code>mongodb</code></td><td>Driver oficial do MongoDB para Node.js.</td></tr><tr><td><code>dotenv</code></td><td>Carrega variáveis ​​de ambiente do arquivo .env para o processo.env.</td></tr><tr><td><code>cors</code></td><td>Middleware que permite a comunicação entre diferentes domínios na web.</td></tr><tr><td><code>express-validator</code></td><td>Middleware para validação de dados de entrada em solicitações HTTP.</td></tr><tr><td><code>nodemon</code> (dev)</td><td>Ferramenta que monitora as alterações no código-fonte e reinicia automaticamente o servidor.</td></tr>
<tr>
<td><code>jsonwebtoken</code></td>
<td>Implementação do JWT em NodeJS </td>
</tr>
<tr>
<td><code>bcryptjs</code></td>
<td>Bcrypt é um algoritmo de geração de hashs para senhas </td>
</tr>
<tr>
<td><code>cors</code></td>
<td>Habilita o CORS Cross-Origin resource sharing</td>
</tr>
</tbody></table>

## 🎯Efetuando o Deploy do Backend no Vercel
- Defina a chave _engines_ no fim do arquivo ```package.json```, conforme exemplo a seguir:
```json
 "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
```
- Dentro da chave scripts do arquivo ```package.json``` defina o start:
```json
"scripts": {
    "start": "node ./api/index.js",
```    
- Crie na pasta raiz um arquivo chamado ```vercel.json``` com o conteúdo a seguir:
```json
{
    "version": 2,
    "rewrites": [{ "source": "/api/(.*)", "destination": "/api" }]    
}
```
- Acesse o (Vercel)[https://vercel.com/login] e faça o login com a sua conta do Github
- Importe o projeto desejado que será exibido na lista do Github
- Na área de Environment Variables, recorte e cole o seu arquivo .env
- Clique em Deploy e apaixone-se ♥️😃 pelo Vercel 
- A cada novo push no seu repositório GIT ele automaticamente fará novamente o deploy.👏👏

## 🖥 Exemplo de Deploy

Acesse https://backend-rest-mongodb.vercel.app


## 🧪 Testes
Para a execução dos testes, instale os pacotes como dependência apenas de desenvolvimento:
```
npm install jest supertest -D
```

### Função de Cada um dos Pacotes de testes 🧪

| Pacote | Descrição |
|---|---|
| **Jest** | Um framework de testes JavaScript popular e leve para testes unitários, testes de integração e testes de ponta a ponta. |
| **SuperTest** | Uma biblioteca para testar APIs Node.js com o Jest ou Mocha. Ela fornece uma interface de alto nível para realizar requisições HTTP para sua API e verificar as respostas. |

### Outros ajustes nos testes 🧪
* Crie uma pasta chamada ```__tests__``` no raiz do projeto para armazenar todos os testes criados.
* Edite o _package.json_ e informe que o framework a ser utilizado é o jest. Com isso, será possível executar o comando ```npm run test```:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
## 📃Documentação da API
Para a geração automática da documentação, instale os pacotes a seguir:
```
npm i swagger-ui-express
npm i swagger-autogen -D
```
* Crie uma pasta chamada ```swagger``` dentro da pasta ```api``` do projeto para armazenar a configuração do swagger.
* Edite o _package.json_ e informe que utilizaremos o swagger. Com isso, será possível executar o comando ```npm run doc```:
```json
{
  "scripts": {
    "doc": "node swagger.js"
  }
}
```
### Editando o api/index.js

Adicione os novos imports necessários:
```javascript
import fs from 'fs'
import swaggerUI from 'swagger-ui-express'
```

Crie a nova rota para a documentação:
```javascript
/* Rota da documentação Swagger */
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync('./api/swagger/swagger_output.json')),{customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL }))

```

Para testar, aponte o navegador para a url:

https://seusite.com.br/api/doc


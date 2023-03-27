# My Contacts

#### Este é um projeto fullstack que consiste em criar um pequeno cadastro de cliente com vínculo de contatos e mostrar o cliente e seus contatos vinculados em tela.

- [Repositório Front-End](https://github.com/gaspartv/MyContacts-FrontEnd)

- [Repositório Back-End](https://github.com/gaspartv/MyContacts-BackEnd)


#### Para testar recomendo fazer o clone dos dois repositórios no seu computador em pastas separadas.

 
 
## Back-end

1º acesse o link acima e clone o repositório back-end.

2º tem um arquivo .env.exemplo copie e renomeie a copia para .env e passe suas configurações, banco de dados utilizado PostgreSQL.

3º abra o terminal na pasta que você clonou e execute os seguintes comandos:

    yarn install
    
    
4º Para executar as migrations digite o comando:

    yarn typeorm migration:run -d ./src/data-source.ts
    
    
Pronto seu servidor já pode ser executado com o comando:

    yarn dev


Caso queira da uma olhada nos testes e só digitar o comando:

    yarn test



Pronto o servidor back-end já está rodando na porta http://localhost:3001 você pode testa-lo utilizando o insomnia, na raiz do projeto tem um arquivo chamado insomnia.json, você pode utilizar ele no seu insomnia para testar as rotas.


## Front-end

1º acesse o link acima e clone o repositório.

2º abra o terminal na pasta que você clonou e execute os seguintes comandos:

    yarn install
    
    yarn dev



Pronto o servidor front-end já está rodando, você pode testa-lo acessando http://localhost:3000




## ROTAS

### CLIENT

POST /client - Rota para criar o cadastro do usuário.

    body: {
        "name": "Teste",
        "email": "teste@mail.com",
        "password": "12345678",
        "tel": "32999999999"
    }


GET /client - Rota para buscar o usuário logado. (Precisa de Token)


PATCH /client - Rota para editar o usuário logado. (Precisa de Token e chaves do body são opcionais)

    body: {
        "name": "Teste",
        "email": "teste@mail.com",
        "password": "12345678",
        "tel": "32999999999"
        }


DELETE /client - Rota para deletar o usuário logado. (Precisa de Token)


### LOGIN

POST /login - Rota para efetuar o login e obter um token.

    body: {
        "email": "teste@mail.com",
        "password": "12345678"
        }
    
    
 ### CONTACTS
 
 POST /contacts - Rota para cadastrar um novo contato. (Precisa de Token)
 
     body: {
        "name": "Teste 2",
        "email": "teste2@mail.com",
        "tel": "32999999991"
        }


GET /contacts - Rota para obter uma lista de todos os contados do usuário logado. (Precisa de Token)


PATCH /contacts/:ID - Rota para editar um contato específico. (Precisa de Token, ID do contato e chaves do body são opcionais)

    body: {
        "name": "Teste 2",
        "email": "teste2@mail.com",
        "tel": "32999999991"
        }
    
    
DELETE /contacts/:ID - Rota para deletar um contato específico. (Precis de Token e ID do contato)

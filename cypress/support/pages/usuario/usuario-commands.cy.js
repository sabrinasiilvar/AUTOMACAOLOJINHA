import { faker } from '@faker-js/faker'
let valorToken
let url = "http://165.227.93.41/lojinha/v2/"
let produtoId = faker.number.int()
let produtoIdExistente
let componenteIdExistente

 Cypress.Commands.add("adicionarNovoUsuario", () => {
    const usuarioNome = faker.person.firstName();
    const usuarioLogin = faker.internet.username();
    const usuarioSenha = faker.internet.password();
    cy.api({
      method: "POST",
      url: `${url}usuarios`,
      body: {
        usuarioNome: usuarioNome,
        usuarioLogin: usuarioLogin,
        usuarioSenha: usuarioSenha
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property("usuarioId", response.body.data.usuarioId).that.is.an("Number");
      //expect(response.body.data).to.have.property("usuarioLogin", usuarioLogin).that.is.an("string");
      expect(response.body.data).to.have.property("usuarioNome", usuarioNome).that.is.an("string");
      expect(response.body).to.have.property("message", "Usuário adicionado com sucesso").that.is.an("string");
      expect(response.body).to.have.property("error").that.is.an("string");
    });
  }); 

  
  Cypress.Commands.add("adicionarNovoUsuarioEmBranco", () => {
    const usuarioNome = null;
    const usuarioLogin = null;
    const usuarioSenha = null;
    cy.api({
      method: "POST",
      url: `${url}usuarios`,
      body: {
        usuarioNome: usuarioNome,
        usuarioLogin: usuarioLogin,
        usuarioSenha: usuarioSenha
      },
      failOnStatusCode: false
    }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("error")
            expect(response.body).to.have.property("message", "")
            expect(response.body).to.have.property("error", "usuarioNome, usuarioLogin e usuarioSenha são atributos obrigatórios").that.is.an("string")
        })
  });



//error 400 - Bad Request (Requisição Malformada)
    Cypress.Commands.add("adicionarNovoUsuarioSemNome", () => {
        const usuarioNome = null;
        const usuarioLogin = faker.internet.username();
        const usuarioSenha = faker.internet.password();
        cy.api({
            method: "POST",
            url: `${url}usuarios`,
            body: {
                usuarioNome: usuarioNome,
                usuarioLogin: usuarioLogin,
                usuarioSenha: usuarioSenha
            },
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("message", "")
            expect(response.body).to.have.property("error", "usuarioNome, usuarioLogin e usuarioSenha são atributos obrigatórios").that.is.an("string")
        })
    });

//error 400 - Bad Request (Requisição Malformada)
    it('Adicionar um novo usuário sem informar Login', () => {
        const usuarioNome = "Teste";
        const usuarioLogin = null;
        const usuarioSenha = faker.internet.password();
        cy.api({
            method: "POST",
            url: `${url}usuarios`,
            body: {
                usuarioNome: usuarioNome,
                usuarioLogin: usuarioLogin,
                usuarioSenha: usuarioSenha
            },
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("error")
            expect(response.body).to.have.property("message", "")
            expect(response.body).to.have.property("error", "usuarioNome, usuarioLogin e usuarioSenha são atributos obrigatórios").that.is.an("string")
        })
    });

//error 400 - Bad Request (Requisição Malformada)
    it('Adicionar um novo usuário sem informar senha', () => {
        const usuarioNome = "Teste";
        const usuarioLogin = faker.internet.password();
        const usuarioSenha = null;
        cy.api({
            method: "POST",
            url: `${url}usuarios`,
            body: {
                usuarioNome: usuarioNome,
                usuarioLogin: usuarioLogin,
                usuarioSenha: usuarioSenha
            },
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("error")
            expect(response.body).to.have.property("message", "")
            expect(response.body).to.have.property("error", "usuarioNome, usuarioLogin e usuarioSenha são atributos obrigatórios").that.is.an("string")
        })
    });

//error 409 (Conflito)
    it('Adicionar um usuário com login já existente', () => {
        const usuarioNome = faker.person.firstName();
        const usuarioLogin = "sabrina2024";
        const usuarioSenha = "sabrina2024";
        cy.api({
            method: "POST",
            url: `${url}usuarios`,
            body: {
                usuarioNome: usuarioNome,
                usuarioLogin: usuarioLogin,
                usuarioSenha: usuarioSenha
            },
            failOnStatusCode: false

        }).then((response) => {
            console.log(response)
            expect(response.status).to.eq(409)
            expect(response.body).to.have.property("error")
        })
    });

    it('Obter token do usuário', () => {
        cy.api({
            method: "POST",
            url: `${url}login`,
            body: {
                usuarioLogin: "sabrina2024",
                usuarioSenha: "sabrina2024"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            valorToken = response.body.data.token
            expect(response.body.data).to.have.property("token", response.body.data.token).that.is.an("string");
            expect(response.body).to.have.property("message", "Sucesso ao realizar o login")
            expect(response.body).to.have.property("error")
        })
    });

//error 401 - Unauthorized (Não Autorizado)
    it('Obter token do usuário sem informar o body, esperado (status 401)', () => {
        cy.api({
            method: "POST",
            url: `${url}login`,
            body: {

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    });

//error 401 - Unauthorized (Não Autorizado)
    it('Obter token do usuário sem informar login correto (status 401)', () => {
    cy.api({
        method: "POST",
        url: `${url}login`,
        body: {
            usuarioLogin: "teste",
            usuarioSenha: "sabrina2024 "
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
    }); 

//error 401 - Unauthorized (Não Autorizado)
    it('Obter token do usuário sem informar senha correta (status 401)', () => {
    cy.api({
        method: "POST",
        url: `${url}login`,
        body: {
            usuarioLogin: "sabrina2024",
            usuarioSenha: "teste "
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
    }); 

//error 401 - Unauthorized (Não Autorizado)
    it('Obter token do usuário com dados em branco (status 401)', () => {
    cy.api({
        method: "POST",
        url: `${url}login`,
        body: {
            usuarioLogin: " ",
            usuarioSenha: " "
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
    }); 



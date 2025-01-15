import { faker } from '@faker-js/faker'
let valorToken
let url = "http://165.227.93.41/lojinha/v2/"
let produtoId = faker.number.int()
let produtoIdExistente
let componenteIdExistente
 
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

    it('Adicionar um produto', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado",
            produtoValor: 5000,
            produtoCores: [
                "Branco"
            ],
            produtoUrlMock: "",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 3
                }
            ]
        }
    }).then((response) => {
        let produtoId = response.body.data.produtoId
        let componenteId = response.body.data.componentes[0].componenteId
        produtoIdExistente = response.body.data.produtoId
        expect(response.status).to.eq(201)
        expect(response.body.data).to.have.property("produtoId", produtoId).that.is.a("number")
        expect(response.body.data).to.have.property("produtoNome", "Teste automatizado").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 5000).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal(["Branco"]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteId", componenteId).that.is.an("number")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})
    it('Adicionar um novo componente ao produto', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
            token: valorToken
        },
        body: {
            componenteNome: "Componente de teste automatizado 2",
            componenteQuantidade: 1
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('data');  // Verifica se existe a propriedade 'data'
        expect(response.body.data).to.have.property('componenteId').that.is.a('number');
        componenteIdExistente = response.body.data.componenteId
        expect(response.body.data).to.have.property('componenteNome').that.is.a('string');
        expect(response.body.data).to.have.property('componenteQuantidade').that.is.a('number');
        expect(response.body).to.have.property('message').that.is.a('string');
        expect(response.body).to.have.property('error').that.is.a('string');
    })
});

//error 400 - Bad Request (Requisição Malformada)
    it('Adicionar um novo componente ao produto sem informar o body', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
            token: valorToken
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error", "componenteNome e componenteQuantidade são atributos obrigatórios").that.is.an("string")
    })
});

    it('Adicionar um novo componente ao produto sem informar o token', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
        },
        body: {
            componenteNome: "Componente de teste automatizado 2",
            componenteQuantidade: 1
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);
    })
});

    it('Adicionar um novo componente ao produto sem informar a URL correta', () => {
    cy.api({
        method: "POST",
        url: `${url}/produtos/${produtoIdExistente}/componentes`,
        headers: {
            token: valorToken
        },
        body: {
            componenteNome: "Componente de teste automatizado 2",
            componenteQuantidade: 1
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404);
    })
});

    it('Adicionar um novo componente ao produto sem informar a quantidade', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
            token: valorToken
        },
        body: {
            componenteNome: "Componente de teste automatizado 2",
            componenteQuantidade: 0
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property('error', "A quantidade mínima para o componente não deve ser inferior a 1").that.is.a('string');
    })
});

    it('Buscar dados dos componentes de um produto', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
            token: valorToken
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        // expect(response.body.data).to.have.property('componenteId').that.is.a('number');
        //expect(response.body.data).to.have.property('componenteNome').that.is.a('string');
        //expect(response.body.data).to.have.property('componenteQuantidade').that.is.a('number');
        //expect(response.body).to.have.property('message').that.is.a('string');
        //expect(response.body).to.have.property('error').that.is.a('string');    
    });
});

    it('Buscar dados dos componentes de um produto sem informar o token', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);
    });
});

    it('Buscar um componente de produto', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
        headers: {
            token: valorToken
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('componenteId').that.is.a('Number');
        expect(response.body.data).to.have.property('componenteNome').that.is.a('string');
        expect(response.body.data).to.have.property('componenteQuantidade').that.is.a('Number');
        expect(response.body).to.have.property('message').that.is.a('string');
        expect(response.body).to.have.property('error').that.is.a('string');
    });
});

    it('Buscar um componente de produto sem informar o metódo GET', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
            token: valorToken
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
    });
});

    it('Buscar um componente de produto sem informar o token', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos/${produtoIdExistente}/componentes`,
        headers: {
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);
    });
});

    it('Buscar um componente de produto sem informar a URL correta', () => {
    cy.api({
        method: "GET",
        url: `${url}/produtos/${produtoIdExistente}/componentes`,
        headers: {
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404);
    });
});

    it('Alterar informações de um componente de produto', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
        headers: {
            token: valorToken
        },
        body: {
            componenteNome: "Teste",
            componenteQuantidade: 5
          }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('componenteId').that.is.a('Number');
        expect(response.body.data).to.have.property('componenteNome').that.is.a('string');
        expect(response.body.data).to.have.property('componenteQuantidade').that.is.a('Number');
        expect(response.body).to.have.property('message').that.is.a('string');
        //expect(response.body).to.have.property('error', '').that.is.a('string');
    });
});

    it('Alterar informações de um componente de produto sem informar o body', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
        headers: {
            token: valorToken
          },
          failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('data');
        expect(response.body).to.have.property('error').that.is.a('string');
    });
});

    it('Alterar informações de um componente de produto sem informar o token', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
        headers: {
          },
        
        body: {
            componenteNome: "Teste",
            componenteQuantidade: 5
        },
          failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);
    });
});

    it('Alterar informações de um componente de produto sem informar a url correta', () => {
    cy.api({
        method: "PUT",
        url: `${url}/produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
        headers: {
            token: valorToken
          },
        
        body: {
            componenteNome: "Teste",
            componenteQuantidade: 5
        },
          failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404);
    });
});

    it(`Remover um componente do produto ${produtoIdExistente}/${componenteIdExistente}`, () => {
    cy.api({
        method: "DELETE",
        url: `${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
        headers: {
            token: valorToken
        }
    }).then((response) => {
        expect(response.status).to.eq(204);
    })
});


    it(`Remover um componente do produto ${produtoIdExistente}/${componenteIdExistente} sem informar o token`, () => {
        cy.api({
            method: "DELETE",
            url: `${url}produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
            headers: {
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    });

    it(`Remover um componente do produto ${produtoIdExistente}/${componenteIdExistente} com URl inválida`, () => {
        cy.api({
            method: "DELETE",
            url: `${url}/produtos/${produtoIdExistente}/componentes/${componenteIdExistente}`,
            headers: {
                token: valorToken
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        })
    });
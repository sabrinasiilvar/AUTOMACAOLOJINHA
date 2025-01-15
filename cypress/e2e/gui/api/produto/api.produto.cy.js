import { faker } from '@faker-js/faker'
let valorToken
let url = "http://165.227.93.41/lojinha/v2/"
let produtoId = faker.number.int()
let produtoIdExistente
let componenteIdExistente

describe('Testes relacionado ao produto', () => {
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

//error deveria 400, pois a loja não salva
    it('Adicionar um produto com nome acima de 100 caracteres', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            produtoValor: 7000.00,
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
        },
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.status).to.eq(201)
        expect(response.body.data).to.have.property("produtoNome", "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 7000.00).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal(["Branco"]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteId", componenteId).that.is.an("number")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})

    it('Adicionar um produto com caracter especial', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "😊",
            produtoValor: 7000.00,
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
        },
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body.data).to.have.property("produtoNome", "😊").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 7000.00).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal(["Branco"]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})

    it('Adicionar um produto com acentuação', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "ç",
            produtoValor: 7000.00,
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
        },
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body.data).to.have.property("produtoNome", "ç").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 7000.00).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal(["Branco"]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})

    it('Adicionar um produto com acentuação', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "ç",
            produtoValor: 7000.00,
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
        },
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body.data).to.have.property("produtoNome", "ç").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 7000.00).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal(["Branco"]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})

    it('Adicionar um produto com nome em branco', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: " ",
            produtoValor: 7000.00,
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
        },
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body.data).to.have.property("produtoNome", " ").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 7000.00).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal(["Branco"]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})
    it('Adicionar um produto com cores em branco', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: " ",
            produtoValor: 7000.00,
            produtoCores: [
                " "
            ],
            produtoUrlMock: "",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 3
                }
            ]
        },
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body.data).to.have.property("produtoNome", " ").that.is.an("string")
        expect(response.body.data).to.have.property("produtoValor", 7000.00).that.is.a("number")
        expect(response.body.data).to.have.property("produtoCores").that.deep.equal([" "]).that.is.an("Array")
        expect(response.body.data).to.have.property("produtoUrlMock", "").that.is.an("string").that.is.an("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteNome", "Componente de teste automatizado").that.is.a("string")
        expect(response.body.data.componentes[0]).to.have.property("componenteQuantidade", 3).that.is.an("number")
        expect(response.body).to.have.property("message", "Produto adicionado com sucesso").that.is.an("string")
        expect(response.body).to.have.property("error", "").that.is.an("string")
    })
})
//error 422 Unprocessable Entity
    it('Adicionar um produto com valor > R$7000,01', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado",
            produtoValor: 7000.01,
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
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body).to.have.property("error", "O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00").that.is.an("string")
    })
})

    it('Adicionar um produto com valor em branco', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado",
            produtoValor: " ",
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
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body).to.have.property("error", "O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00").that.is.an("string")
    })
})

//error 422 Unprocessable Entity
    it('Adicionar um produto com valor < R$0,01', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado",
            produtoValor:  0,
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
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body).to.have.property("error", "O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00").that.is.an("string")
        
    })
})
//error 400 - Bad Request (Requisição Malformada)
    it('Adicionar um produto sem informar o body', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property("error", "produtoNome, produtoValor e produtoCores são campos obrigatórios").that.is.an("string")
    })
})

//error 401 - Unauthorized (Não Autorizado)
    it('Adicionar um produto sem informar o token', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401)
    })
})
//error 422 - Unprocessable Entity (Entidade Não Processável)
    it('Adicionar um produto sem os dados obrigatórios', () => {
    cy.api({
        method: "POST",
        url: `${url}produtos`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: " ",
            produtoValor: " ",
            produtoCores: [
                " "
            ],
            produtoUrlMock: "",
            componentes: [
                {
                    componenteNome: " ",
                    componenteQuantidade: 3
                }
            ]
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422)
        expect(response.body).to.have.property("error", "O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00").that.is.an("string")
    })
})

    it('Buscar os produtos do usuário', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos`,
        headers: {
            token: valorToken //para dar 401 retirar o token
        }
    }).then((response) => {
        expect(response.status).to.eq(200);  // Verifica se a resposta foi bem-sucedida (status 200)
        expect(response.body).to.have.property('data');  // Espera-se que a resposta tenha a propriedade 'data' com os produtos
        expect(response.body.data).to.be.an('array');  // Verifica se 'data' é um array de produtos
        response.body.data.forEach((produto) => {
            expect(produto).to.have.property('produtoId').that.is.a("number")
            expect(produto).to.have.property('produtoNome').that.is.a("string")
            expect(produto).to.have.property('produtoValor').that.is.a("number")
            expect(produto).to.have.property('produtoCores').that.is.a("array")
            //expect(produto).to.have.property("produtoUrlMock", "").that.is.an("string")
            produto.componentes.forEach((componente) => {
                expect(componente).to.have.property('componenteId').that.is.a("number")
                expect(componente).to.have.property('componenteNome').that.is.a("string")
                expect(componente).to.have.property('componenteQuantidade').that.is.a("Number")


            })
        });
    });
});

//error 401 - Unauthorized
    it('Buscar os produtos do usuário sem informar o token', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos`,
        headers: { 
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);  // Verifica se a resposta foi bem-sucedida (status 200)
    });
});

    it('Buscar um dos produtos do usuário', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        },
    }).then((response) => {
        expect(response.status).to.eq(200);  // Verifica se a resposta foi bem-sucedida (status 200)
        expect(response.body).to.have.property('data');  // Espera-se que a resposta tenha a propriedade 'data' com os produtos
        expect(response.body.data).to.be.an('object');  // Verifica se 'data' é um array de produtos
        let umProduto = response.body.data
        expect(umProduto).to.have.property('produtoId').that.is.a("number")
        expect(umProduto).to.have.property('produtoNome').that.is.a("string")
        expect(umProduto).to.have.property('produtoValor').that.is.a("number")
        expect(umProduto).to.have.property('produtoCores').that.is.a("array")
        umProduto.componentes.forEach((componente) => {
            expect(componente).to.have.property('componenteId').that.is.a("number")
            expect(componente).to.have.property('componenteNome').that.is.a("string")
            expect(componente).to.have.property('componenteQuantidade').that.is.a("number")
        })
    })
});

//error 401 - Unauthorized (Não Autorizado)
    it('Buscar um dos produtos do usuário sem informar o token', () => {
    cy.api({
        method: "GET",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);  // Verifica se a resposta foi bem-sucedida (status 200)
    })
});

//error 404 - Not Found (Recurso Não Encontrado)
    it('Buscar um dos produtos do usuário sem informar a URL correta', () => {
    cy.api({
        method: "GET",
        url: `${url}/produtos`,
        headers: { 
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404);  
    });
});

    it('Alterar informações de um produto', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado 2",
            produtoValor: 5000,
            produtoCores: [
                "Branco"
            ],
            produtoUrlMock: "string",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 3
                }
            ]
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');  // Verifica se existe a propriedade 'data'
    })
});

    it('Alterar informações de um produto sem informar o body', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('data');  // Verifica se existe a propriedade 'data'
        expect(response.body).to.have.property("error", "produtoNome, produtoValor e produtoCores são campos obrigatórios").that.is.an("string")
    })
});

    it('Alterar informações de um produto sem informar o token', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
        },
        body: {
            produtoNome: "Teste automatizado 2",
            produtoValor: 5000,
            produtoCores: [
                "Branco"
            ],
            produtoUrlMock: "string",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 3
                }
            ]
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(401);
    })
});

    it('Alterar informações de um produto sem informar a url correta', () => {
    cy.api({
        method: "PUT",
        url: `${url}/produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado 2",
            produtoValor: 5000,
            produtoCores: [
                "Branco"
            ],
            produtoUrlMock: "string",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 3
                }
            ]
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404);
    })
});

    it('Alterar informações de um produto sem informar o valor', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado 2",
            produtoValor: " ",
            produtoCores: [
                "Branco"
            ],
            produtoUrlMock: "string",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 3
                }
            ]
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property("error", "O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00").that.is.an("string")
    })
});

    it('Alterar informações de um produto sem informar o componente', () => {
    cy.api({
        method: "PUT",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        },
        body: {
            produtoNome: "Teste automatizado 2",
            produtoValor: 50,
            produtoCores: [
                "Branco"
            ],
            produtoUrlMock: "string",
            componentes: [
                {
                    componenteNome: "Componente de teste automatizado",
                    componenteQuantidade: 0
                }
            ]
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body).to.have.property("error", "A quantidade mínima para os componentes não devem ser inferiores a 1").that.is.an("string")
    })
});

    it(`Remover o produto ${produtoIdExistente}`, () => {
    cy.api({
        method: "DELETE",
        url: `${url}produtos/${produtoIdExistente}`,
        headers: {
            token: valorToken
        }
    }).then((response) => {
        expect(response.status).to.eq(204);
    })
});

    it(`Limpar todos os dados do usuário`, () => {
    cy.api({
        method: "DELETE",
        url: `${url}dados`,
        headers: {
            token: valorToken
        }
    }).then((response) => {
        expect(response.status).to.eq(204);
    })
});

});
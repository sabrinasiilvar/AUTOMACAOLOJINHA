const {faker} = require('@faker-js/faker')
const usuario = Cypress.env('username')
const senha = Cypress.env('username')

describe('Testes página de login', () => {
    it('Login com credenciais inválidas', () => {
        cy.login(faker.person.firstName(), faker.internet.password())
        cy.url().should('eq','http://165.227.93.41/lojinha-web/v2/?error=Falha%20ao%20fazer%20o%20login')
        cy.assertionsLogin()
        cy.pageAccessibility()
        cy.screenshot()
    }); 

    it('login com campos em branco', () => {
        cy.login(' ', ' ')
        cy.get(".toast").contains("Falha ao fazer o login").should('be.visible')
        cy.assertionsLogin()
        cy.pageAccessibility()
        cy.screenshot()
    }); 

    it('login com credenciais corretas', () => {
        cy.login(usuario, senha)
        cy.assertionsLogin()
        cy.pageAccessibility()
        cy.screenshot()
    }); 

    it('login com usuário incorreto e senha correta', () => {
        cy.login(faker.person.firstName(),senha)
        cy.assertionsLogin()
        cy.pageAccessibility()
        cy.screenshot()
    });

    it('login com senha incorreta e usuário correto', () => {
        cy.login(usuario, faker.internet.password())
        cy.assertionsLogin()
        cy.pageAccessibility()
        cy.screenshot()
    });

    it('Acessar uma rota sem estar logado', () => {
        cy.visit('http://165.227.93.41/lojinha-web/v2/produto')
        cy.url().should('eq','http://165.227.93.41/lojinha-web/v2/?error=Acesse%20a%20lojinha')
        cy.assertionsLogin()
        cy.pageAccessibility()
        cy.screenshot()
    });

    
});

describe('Testa fluxo do produto', () => {
    beforeEach(() => {
        cy.login(usuario, senha)
        cy.url().should('eq','http://165.227.93.41/lojinha-web/v2/produto')
    });

    // Criar produto
    it('criar um produto com sucesso', () => {
        cy.criarProduto("Playstation", "70", "Branca" )  
        cy.url().should('include','http://165.227.93.41/lojinha-web/v2/produto/')
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    });

    it('criar um produto com caracter especial', () => {
        cy.criarProduto("😊", "10", " ")
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    })

    it('criar um produto com acentuação', () => {
        cy.criarProduto("ç", "5", " ")
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    })

    it('criar um produto acima de 100 caracteres', () => {
        cy.criarProduto("10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "10", " ")
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    })

    it('criar um produto com nome em branco', () => {
        cy.criarProduto(" ", "10", "verde")
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    })

    it('criar um produto com cores acima de 100 caracteres', () => {
        cy.criarProduto("cores", "10", "100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    })

    it('criar um produto com cores em branco', () => {
        cy.criarProduto("cores", "10", " ")
        cy.assertionsdeAdicionarProduto()
        cy.pageAccessibility()
    })

    it('criar um produto com valor > R$7000,01', () => {
        cy.validaValordeUmNovoProduto("Playstation", "7000,01", "Preto" )
        cy.pageAccessibility()
    })

    it('criar um produto com valor < R$0,01', () => {
        cy.validaValordeUmNovoProduto("Playstation", "0", "Preto" )
        cy.pageAccessibility()
    })

    it('criar um produto sem valor', () => {
        cy.validaValordeUmNovoProduto(" ", " ", " " )
        cy.pageAccessibility()
    })

    // CRIAR COMPONENTES
    it('criar um componente', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente("Teste1", "20") 
        cy.pageAccessibility()
    });

    it('criar um componente com caracter especial', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente("😊", "20") 
        cy.pageAccessibility()
    });

    it('criar um componente acima de 100 caracteres', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente("10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "20") 
        cy.pageAccessibility()
    });

    it('criar um componente com acentuação', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente("ç", "20") 
        cy.pageAccessibility()
    });

    
    it('criar um componente com nome em branco', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente(" ", "20") 
        cy.pageAccessibility()
    });

    it('criar um componente com quantidade inferior a 1', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.validadeQuantidadeComponente("Teste1", "0") 
        cy.pageAccessibility()
    });

    it('criar um componente com quantidade superior a 100 caracteres', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente("Teste1", "10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") 
        cy.pageAccessibility()
    });

    // excluir componente 
    it('excluir componente', () => {
        cy.criarProduto("Teste1", "20", "Verde" )  
        cy.get(".waves-effect.waves-light.btn.right").click() 
        cy.criarComponente("Teste1", "20") 
        cy.get('a.secondary-content').click();
        cy.get('.toast.rounded').contains('Componente de produto removido com sucesso').should('be.visible') 
        cy.pageAccessibility()
    });
    
    // Editar produto
    it('editar o nome de produto', () => {
        let nomeProduto = "TestediacaoNome"
        cy.criarProduto(nomeProduto, "70", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click() 
        cy.editarUmProduto(nomeProduto, nomeProduto+" 001", "70 ", "Branca" )
        cy.pageAccessibility()
    })

    it.only('editar um valor de produto', () => {
        let nomeProduto = "TesteEdiacaoValor"
        cy.criarProduto(nomeProduto, "70", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click() 
        cy.editarUmProduto(nomeProduto, nomeProduto, "500,00", "Branca" )
        cy.assertionsEditaProduto()
        cy.pageAccessibility()
    })

    it('editar a cor de produto', () => {
        let nomeProduto = "TesteEdiacaoCor"
        cy.criarProduto(nomeProduto, "500,00", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click() 
        cy.editarUmProduto(nomeProduto, nomeProduto, "500,00", "Azul" )
        cy.assertionsEditaProduto()
        cy.pageAccessibility()
    })

    it('editar e deixar nome em branco', () => {
        let nomeProduto = "TesteEdiacaoSemNome"
        cy.criarProduto(nomeProduto, "500,00", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click() 
        cy.editarUmProduto(nomeProduto, " ", "500,00", "Azul" )
        cy.assertionsEditaProduto()
        cy.pageAccessibility()
    })
      
    it('editar e deixar valor em branco', () => {
        let nomeProduto = "TesteEdiacaoSemNome"
        cy.criarProduto(nomeProduto, "500,00", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click() 
        cy.editarUmProdutoSemValor(nomeProduto, "TesteEdiacaoSemNome", " ", "Azul" )
        cy.pageAccessibility()
    })

    it('editar e deixar cor em branco', () => {
        let nomeProduto = "TesteEdiacaoSemNome"
        cy.criarProduto(nomeProduto, "500,00", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click() 
        cy.editarUmProduto(nomeProduto, "TesteEdiacaoSemNome", "500,00", " " )
        cy.assertionsEditaProduto()
        cy.pageAccessibility()
    
    })

    // Excluir um produto 
    it('Excluir um produto', () => {
        cy.criarProduto("deletarproduto", "500,00", "Branca" )  
        cy.get('.waves-effect.waves-light.btn.grey').contains("Lista de Produtos").click()
        cy.get('title').get('a').contains("deletarproduto").parent().parent().children('a').should('have.class', 'secondary-content').click() //.parent().parent(): sobe dois níveis na árvore DOM. | .children('a'): seleciona os filhos <a> do elemento atual.
        cy.get('.toast').contains('Produto removido com sucesso').should('be.visible') 
        cy.assertionsDeCoresListaProdutos()
        cy.pageAccessibility()
    })


});

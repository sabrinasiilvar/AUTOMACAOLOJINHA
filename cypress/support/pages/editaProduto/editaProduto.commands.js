Cypress.Commands.add('editarUmProduto', (nomeProduto, novoNomeProduto, valor, cor) => {
  cy.url().should('eq', 'http://165.227.93.41/lojinha-web/v2/produto')
  cy.get('a').contains(nomeProduto).click()
  cy.get("[id='produtonome']").should('be.visible').clear().type(novoNomeProduto)
  cy.get("[id='produtovalor']").should('be.visible').clear().type(valor)
  cy.get("[id='produtocores']").should('be.visible').clear().type(cor)
  cy.get('button[type="submit"]').should('be.visible').click()
  cy.url().should('include', 'message=Produto%20alterado%20com%20sucesso') // Verificar o parâmetro de sucesso
  cy.contains('Produto alterado com sucesso').should('be.visible')
})

Cypress.Commands.add('editarUmProdutoSemValor', (nomeProduto, novoNomeProduto, valor, cor) => {
  cy.url().should('eq', 'http://165.227.93.41/lojinha-web/v2/produto')
  cy.get('a').contains(nomeProduto).click()
  cy.get("[id='produtonome']").should('be.visible').clear().type(novoNomeProduto)
  cy.get("[id='produtovalor']").should('be.visible').clear().type(valor)
  cy.get("[id='produtocores']").should('be.visible').clear().type(cor)
  cy.get('button[type="submit"]').should('be.visible').click()
  cy.get('.toast').contains('O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00').should('be.visible')
})

//Verificação de cores, etc...
Cypress.Commands.add("assertionsEditaProduto", (nomeProduto) => {
  cy.get('#logo-container').should('be.visible').and('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); //Logo lojinha
  cy.get('#nav-mobile').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //icone boas vindas e sair
  cy.get('a').contains('Sair').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //sair
  cy.get('a').contains('Boas vindas, Sabrina!').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //boas vindas
  cy.get('.blue-grey.darken-1').should('be.visible').and('have.css', 'background-color', 'rgb(84, 110, 122)'); //fundo header
  cy.get('.nav-wrapper.container').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //fundo header
  cy.get('h4').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)'); //Editar produto
  cy.get('.row').contains('Não esqueça de preencher todas as informações do produto para que ele seja mais vendível a seus clientes.').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)'); //textinho
  cy.get('.section').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)'); //fundo total
  cy.get('.active').contains('Nome do Produto').should('be.visible').and('have.css', 'color', 'rgb(158, 158, 158)');
  cy.get('.active').contains('Valor do Produto').should('be.visible').and('have.css', 'color', 'rgb(158, 158, 158)');
  cy.get('.active').contains('Cores do Produto (Separadas por Vírgula)').should('be.visible').and('have.css', 'color', 'rgb(158, 158, 158)');
  cy.get('.btn.waves-effect.waves-light').contains('Salvar').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)');
  cy.get('.waves-effect.waves-light.btn.grey').contains('Lista de Produtos').should('be.visible').and('have.css', 'background-color', 'rgb(158, 158, 158)');
  cy.get('.waves-effect.waves-light.btn.right.pink.modal-trigger').contains('Adicionar componente').should('be.visible').and('have.css', 'background-color', 'rgb(233, 30, 99)');
})

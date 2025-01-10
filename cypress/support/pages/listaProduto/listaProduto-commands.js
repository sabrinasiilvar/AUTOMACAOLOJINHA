Cypress.Commands.add('listaProduto', (descricao, valor, cor) => {
  cy.url().should('eq', 'http://165.227.93.41/lojinha-web/v2/produto')
  cy.get('a').contains('Playstation').should('be.visible').type(descricao)
  cy.get('p').contains('R$ 100,02').should('be.visible').type(valor)
  cy.get('p').contains(cor).should('be.visible').type(valor)
  cy.get(".material-icons").click()
  cy.get('.material-icons').contains('delete').click();
  cy.get(".material-icons").click()
  cy.get('button[type="submit"]').should('be.visible').click()
  cy.url().should('include', '/produto/editar/') // verifiquei se a URL tem "/produto/editar/"
  cy.url().should('include', 'message=Produto%20adicionado%20com%20sucesso') // Verificar o parâmetro de sucesso
  cy.contains('Produto adicionado com sucesso').should('be.visible')
})


Cypress.Commands.add("assertionsDeCoresListaProdutos", () => {
  cy.get('#logo-container').should('be.visible').and('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); //Logo lojinha
  cy.get('#nav-mobile').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //icone boas vindas e sair
  cy.get('a').contains('Sair').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //sair
  cy.get('a').contains('Boas vindas, Sabrina!').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //boas vindas
  cy.get('.blue-grey.darken-1').should('be.visible').and('have.css', 'background-color', 'rgb(84, 110, 122)'); //fundo header
  cy.get('.nav-wrapper.container').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); //fundo header
  cy.get('h3').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)'); //titulo lista de produtos
  cy.get('.section').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)'); //fundo total
  cy.get('.row').should('be.visible').and('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); //linha de adicionar produto
  cy.get('.waves-effect.waves-light.btn.right').should('be.visible').and('have.css', 'background-color', 'rgb(38, 166, 154)');//botão adicionar produto
  cy.get('.material-icons.circle').should('be.visible').and('have.css', 'background-color', 'rgb(153, 153, 153)'); //categoria
  cy.get('.material-icons').should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)'); // verificar
  cy.get('.material-icons').contains('delete').should('have.css', 'color', 'rgb(38, 166, 154)'); //delete
  cy.get('.collection-item').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)'); //delete. COMO VERIFICAR LARGURA, ESPAÇO? FAZER DEPOIS
}) 
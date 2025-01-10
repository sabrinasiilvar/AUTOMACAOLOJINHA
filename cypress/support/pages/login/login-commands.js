Cypress.Commands.add("login", (usuario, senha) => {
    cy.visit('http://165.227.93.41/lojinha-web/v2/')
    cy.url().should('eq', 'http://165.227.93.41/lojinha-web/v2/')
    cy.get('#usuario').should('be.visible').type(usuario, { force: true })
    cy.get('#senha').should('be.visible').type(senha, { force: true })
    cy.get('#btn-entrar').should('be.visible').and('have.css', "background-color", "rgb(38, 166, 154)").click()
})

//Verificação de cores, etc...
Cypress.Commands.add("assertionsLogin", () => {
    cy.visit('http://165.227.93.41/lojinha-web/v2/')
    cy.get('#usuario').should('be.visible').and('have.css', 'color', 'rgb(0, 0, 0)');
    cy.get('#senha').should('be.visible').and('have.css', 'color', 'rgb(0, 0, 0)');
    cy.get('#btn-entrar').should('be.visible').and('have.css', "background-color", "rgb(38, 166, 154)");
    cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); // cor de fundo
    cy.get('h4').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
    cy.get('#logo-container').should('be.visible').and('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.blue-grey.darken-1').and('have.css', 'background-color', 'rgb(84, 110, 122)');
    cy.get('.nav-wrapper.container').and('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.row.center').should('be.visible').and('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
    cy.get('.row.center > a').should('be.visible').and('have.css', 'color', 'rgb(3, 155, 229)');
})

//Arrow funcion, mesma coisa que uma function ()
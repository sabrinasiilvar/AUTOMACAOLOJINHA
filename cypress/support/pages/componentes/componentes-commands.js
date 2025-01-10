Cypress.Commands.add('criarComponente', (descricao, quantidade) => {
  cy.get('.waves-effect.waves-light.btn.right.pink.modal-trigger').contains("Adicionar componente").should('be.visible')
  cy.get("[id='componentenomeadicionar']").should('be.visible').type(descricao)
  cy.get("[id='componentequantidadeadicionar']").should('be.visible').type(quantidade)
  cy.get('a[onclick="adicionarComponente()"]').should('be.visible').click()
  cy.url().should('include', 'message=Componente%20de%20produto%20adicionado%20com%20sucesso') // Verificar o parâmetro de sucesso
  cy.contains('Componente de produto adicionado com sucesso').should('be.visible')
})

//Verificação de cores, etc...
Cypress.Commands.add('validadeQuantidadeComponente', (descricao, quantidade) => {
  cy.get('.waves-effect.waves-light.btn.right.pink.modal-trigger').contains("Adicionar componente").should('be.visible')
  cy.get("[id='componentenomeadicionar']").should('be.visible').type(descricao)
  cy.get("[id='componentequantidadeadicionar']").should('be.visible').type(quantidade)
  cy.get('a[onclick="adicionarComponente()"]').should('be.visible').click()
  cy.get('.toast.rounded').contains('A quantidade mínima para o componente não deve ser inferior a 1').should('be.visible')
})
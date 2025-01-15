// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './pages/login/login-commands'
import './pages/novoProduto/novoProduto-commands'
import './pages/editaProduto/editaProduto.commands'
import './pages/listaProduto/listaProduto-commands'
import './pages/componentes/componentes-commands'
import 'cypress-axe'
import './accessibility-commands'
import 'cypress-mochawesome-reporter/register'
import 'cypress-plugin-api'

 
 

/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4

        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]')
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'L', 'Blue', '4')
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.get('#terms').click()
        cy.get('#place_order').should('be.visible').click({ force: true })
        cy.get('.woocommerce-notice').should('contain', "Obrigado. Seu pedido foi recebido.")

    })
})
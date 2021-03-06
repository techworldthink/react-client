describe('History', () => {
  beforeEach(() => {
    cy.visit('/history')
  })

  describe('History Mode', () => {
    it('Cards', () => {
      cy.get('div.card')
        .should('be.visible')
    })

    it('Table', () => {
      cy.get('i.fa-table')
        .click()
      cy.get('table.history-table')
        .should('be.visible')
    })
  })

  describe('Pinning', () => {
    it('Cards', () => {
      cy.get('div.card')
        .should('be.visible')
      cy.get('.fa-thumb-tack')
        .first()
        .click()
      cy.get('.modal-dialog')
        .should('be.visible')
    })

    it('Table', () => {
      cy.get('i.fa-table')
        .click()
      cy.get('.fa-thumb-tack')
        .first()
        .click()
      cy.get('.modal-dialog')
        .should('be.visible')
    })
  })
})

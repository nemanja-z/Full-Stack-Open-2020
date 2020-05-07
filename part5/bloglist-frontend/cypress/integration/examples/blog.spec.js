describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { name: 'proba', username: 'proba', password: 'tri' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login from is shown', function () {
    cy.contains('Login to application')
    cy.contains('login').click()
  })
  describe('Login', function () {
    it('login fails with wrong password', function () {
      cy.get('#username').type('who')
      cy.get('#password').type('isthat')
      cy.get('#login-button').click()

      cy.get('.message').contains('wrong credentials')
    })
    it('successful login', function () {
      cy.get('#username').type('proba')
      cy.get('#password').type('tri')
      cy.get('#login-button').click()

      cy.get('.message').contains('successful login')
    })
  })
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('proba')
      cy.get('#password').type('tri')
      cy.get('#login-button').click()

      cy.get('.message').contains('successful login')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Karmen')
      cy.get('#author').type('moja kompjuterska')
      cy.get('#url').type('zena.com')
      cy.contains('save').click()
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Karmen')
      cy.get('#author').type('moja kompjuterska')
      cy.get('#url').type('zena.com')
      cy.contains('save').click()
      cy.contains('show more').click()
      cy.contains('like').click()
    })
  })
})



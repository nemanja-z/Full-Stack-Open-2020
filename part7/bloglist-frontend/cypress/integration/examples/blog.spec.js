describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { username: 'proba', password: 'tri' }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', () => {
    cy.contains('Login to application')
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
      cy.contains('Blogs')
      cy.contains('logout').click()
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'proba', password: 'tri' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('this')
      cy.get('#author').type('is')
      cy.get('#url').type('confusing.com')
      cy.contains('save').click()
    })
    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('this')
      cy.get('#author').type('is')
      cy.get('#url').type('confusing.com')
      /*  cy.contains('save').click()
      cy.contains('show more').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click() */
    })
    it('A blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('this')
      cy.get('#author').type('is')
      cy.get('#url').type('confusing.com')
      cy.contains('save').click()
      /*  cy.contains('show more').click()
       cy.contains('delete').click()
       cy.get('this').should('not.exist') */
    })
    describe('Sort blogs by likes number', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'this',
          author: 'is',
          url: 'confusing',
          likes: 43
        })
        cy.createBlog({
          title: 'this',
          author: 'is',
          url: 'confusing...not',
          likes: 100
        })
        cy.createBlog({
          title: 'this',
          author: 'is',
          url: 'not confusing',
          likes: 75
        })
      })
    })
  })
})





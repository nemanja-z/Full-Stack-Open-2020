describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const userOne = { username: 'proba', password: 'tri' };
    cy.request('POST', 'http://localhost:3001/api/users', userOne);
    const userTwo = { username: 'danas', password: 'danas' };
    cy.request('POST', 'http://localhost:3001/api/users', userTwo);
    cy.visit('http://localhost:3000');
  });

  it('Login from is shown', () => {
    cy.contains('Login to application');
  });

  describe('Login', function () {
    it('login fails with wrong password', function () {
      cy.get('#username').type('who');
      cy.get('#password').type('isthat');
      cy.get('#login-button').click();

      cy.get('.message').contains('wrong credentials');
    });
    it('successful login', function () {
      cy.get('#username').type('proba');
      cy.get('#password').type('tri');
      cy.get('#login-button').click();
      cy.wait(500).get('.message').contains('successful login');
      cy.contains('Blogs');
      cy.contains('logout').click();
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'proba', password: 'tri' });
      cy.contains('new blog').click();
      cy.get('#title').type('this');
      cy.get('#author').type('is');
      cy.get('#url').type('confusing.com');
      cy.contains('create blog').click();
    });
    it('A blog can be created', function () {
      cy.wait(5001).contains('new blog').click();
      cy.get('#title').type('what');
      cy.get('#author').type('is');
      cy.get('#url').type('love.com');
      cy.contains('create blog').click();
    });
    it('A blog can be liked', function () {
      cy.contains('this is').click();
      cy.wait(100).get('.btn-like').click();
    });
    it('A blog can be deleted', function () {
      cy.contains('this is').click();
      cy.wait(100).get('.btn-delete').click();
    });
  });
});





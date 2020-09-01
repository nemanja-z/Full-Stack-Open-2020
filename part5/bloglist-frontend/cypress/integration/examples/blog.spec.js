describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = { username: 'danas', name: 'danas', password: 'danas' };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    const other = { username: 'test', name: 'test', password: 'test' };
    cy.request('POST', 'http://localhost:3001/api/users', other);
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
      cy.get('#username').type('danas');
      cy.get('#password').type('danas');
      cy.get('#login-button').click();

      cy.get('.message').contains('successful login');
      cy.contains('Blogs');
      cy.contains('logout').click();
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'danas', password: 'danas' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('this');
      cy.get('#author').type('is');
      cy.get('#url').type('confusing.com');
      cy.contains('save').click();
      cy.contains('show more').click();
    });
    it('A blog can be liked', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('this');
      cy.get('#author').type('is');
      cy.get('#url').type('confusing.com');
      cy.contains('save').click();
      cy.contains('show more').click();
      cy.contains('like').click();
      cy.contains('like').click();
      cy.contains('like').click();
      cy.contains('like').click();
    });
    it('A blog can be deleted', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('this');
      cy.get('#author').type('is');
      cy.get('#url').type('confusing.com');
      cy.contains('save').click();
      cy.contains('show more').click();
      cy.contains('delete').click();
      cy.get('this').should('not.exist');
    });
  });
    describe('Sort blogs by likes number', function () {
      beforeEach(function () {
        cy.login({ username: 'danas', password: 'danas' });
        cy.createBlog({
          title: 'this',
          author: 'is',
          url: 'confusing...not',
          likes: 100
        });
        cy.createBlog({
          title: 'what',
          author: 'is',
          url: 'confusing',
          likes: 43
        });
        cy.createBlog({
          title: 'why',
          author: 'is',
          url: 'not confusing',
          likes: 75
        });
        cy.visit('http://localhost:3000');
      });
       it('Sort blogs', function () {
        cy.get('.blog').each(() => {
          cy.contains('show more').click();
        }).then(() => {
          cy.get('[data-testid= "likes"]').should((like) => {
            expect(like).to.have.length(3);
            expect(like.first()).to.contain('100');
            expect(like.last()).to.contain('43');
          });
        }); 
      });
      it('User can\'t delete other user blog', function (){
        cy.contains('logout').click();
        cy.login({ username: 'test', password: 'test' });
        cy.contains('show more').first().click();
        cy.get('delete').should('not.exist');
      }) 
    });
  
  });


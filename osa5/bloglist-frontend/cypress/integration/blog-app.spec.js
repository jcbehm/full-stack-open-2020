describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Urho Kekkonen',
      username: 'Pekka Peitsi',
      password: 'lep1kko'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Pekka Peitsi')
      cy.get('#password').type('lep1kko')
      cy.get('#login-button').click()

      cy.contains('Pekka Peitsi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('huijari')
      cy.get('#password').type('tiirikka')
      cy.get('#login-button').click()

      cy.contains('Log in to application')
    })
  })
})
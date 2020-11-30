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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Pekka Peitsi', password: 'lep1kko' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Norjalaisten kukkaruukkujen historia')
      cy.get('#author').type('Magnus Larsson')
      cy.get('#url').type('http://www.blomsterpotterna.no/')
      cy.get('#create-button').click()

      cy.contains('Norjalaisten kukkaruukkujen historia')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Norjalaisten kukkaruukkujen historia',
          author: 'Magnus Larsson',
          url: 'http://www.blomsterpotterna.no/'
        })
      })
      it('a blog can be liked', function() {
        cy.contains('Norjalaisten kukkaruukkujen historia').click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('a blog can be removed', function() {
        cy.intercept('/api/blogs/*').as('blogs')
        cy.contains('Norjalaisten kukkaruukkujen historia').click()
        cy.contains('remove').click()

        cy.contains('removed')

        cy.get('html').should('not.contain', 'hide')
        cy.get('html').should('not.contain', 'view')
      })

      it('several blogs are arranged according to their likes', function() {
        cy.createBlog({
          title: 'Helmenkalastajan tyypillinen viikko',
          author: 'Michael Järvinen',
          url: 'http://www.helmiblogi.fi/'
        })
        cy.createBlog({
          title: 'Muinaiset juhlapyhät',
          author: 'Aleksi Anttonen',
          url: 'http://www.muinaisetjuhlapyhat.fi/'
        })

        cy.intercept('/api/blogs/*').as('blogs')

        cy.contains('Helmenkalastajan tyypillinen viikko').click()
          .contains('like').click()

        cy.contains('Muinaiset juhlapyhät').click()
          .contains('like').click()

        cy.wait(1000)

        cy.contains('Muinaiset juhlapyhät').click()
          .contains('like').click()

        cy.wait(1000)

        cy.contains('Norjalaisten kukkaruukkujen historia').click()

        cy.get('[data-test-id="blog"]').first().contains('likes 2')

        cy.get('[data-test-id="blog"]').last().contains('likes 0')
      })
    })
  })
})
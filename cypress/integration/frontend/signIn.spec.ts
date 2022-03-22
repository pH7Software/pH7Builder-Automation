import faker from 'faker';

describe('SignIn', () => {
  const formElement = 'form#form_login_user';

  beforeEach(() => {
    cy.visit('login');
  });

  describe('Unhappy Cases', () => {
    it(`must receive an error message when credentials aren't valid`, () => {
      cy.get('[name=mail]').type('doesntexist@ph7builder.com');
      cy.get('[name=password]').type('invalid password');
      cy.get('form').submit();

      // Check error messages
      cy.get(formElement).should('have.text', 'The following error was found');
      cy.get(formElement).should('have.class', 'pfbc-error');
    });

    it(`must receive an error when email is invalid`, () => {
      cy.get('[name=mail]').type('not an email');
      cy.get(formElement).should('have.class', 'input_error');
      cy.get('.input_error .email_login').contains('invalid', {matchCase: false, timeout: 1500});
    });
  });

  describe('Happy Cases', () => {
    const registeredUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      nickname: faker.internet.userName()
    };

    const createUser = (user) => {
      cy.visit('signup');

      // Minimum step to create a user
      cy.get('[name=first_name]').type(user.firstName);
      cy.get('[name=username]').type(user.nickname);
      cy.get('[name=mail]').type(user.email);
      cy.get('[name=password]').type(user.password);
      cy.get('[name="terms[]"]').click();
      cy.get('form').submit();
    };

    beforeEach(() => {
      createUser(registeredUser);
    });

    it(`must create an account`, () => {
      cy.get('[name=mail]').type(registeredUser.email);
      cy.get('[name=password]').type(registeredUser.password);
      cy.get('form').submit();
    });
  });
})

import faker from 'faker';

describe('signUp', () => {
  const formStep1 = 'form#form_join_user';
  const formStep2 = 'form#form_join_user2';
  const formStep3 = 'form#form_join_user3';
  const formStep4 = 'form#form_join_user4';

  beforeEach(() => {
    cy.visit('signup');
  });

  describe('success', () => {
    it('must sign-up a user on every registration step', () => {
      // Step 1
      cy.get('#headings').should('contain.text', 'Step 2/3');

      cy.get('[name=first_name]').type(faker.name.firstName());
      cy.get('[name=username]').type(faker.internet.userName());
      cy.get('[name=mail]').type(faker.internet.email());
      cy.get('[name=password]').type(faker.internet.password());
      cy.get('[name="terms[]"]').check();
      cy.get(formStep1).submit();

      // Step 2
      cy.get('#headings').should('contain.text', 'Step 2/3');

      cy.get('[name=sex]').check('male');
      cy.get('[name=match_sex[]]').check(['female', 'male', 'couple']);
      cy.get('[name=birth_date]').type('2/12/2002');
      cy.get('[name=country]').type(faker.address.countryCode());
      cy.get('[name=city]').type(faker.address.city());
      cy.get('[name=zip_code]').type(faker.address.zipCode());
      cy.get(formStep2).submit();

      // Step 3
      const userDescription = faker.lorem.sentence();
      cy.get('#headings').should('contain.text', 'Step 3/3');
      cy.get('[name=description]').type(userDescription);
      cy.get(`${formStep3} p span#str_description_rem_len`).should('contain.text', userDescription.length() + ' character(s)');
      cy.get(formStep3).submit();

      // Step 4
      const fixtureFilename = 'avatar.jpg';
      cy.get('[name=avatar]').attachFile(fixtureFilename);
      cy.get(formStep4).submit();

      // Check expected redirection
      cy.location().should('eq', 'user/signup/done', {timeout: 2000});

      // Check success message
      cy.get('.alert .alert-success').should('be.visible').should('contain.text', 'Your account has just been created');
    });
  });
});

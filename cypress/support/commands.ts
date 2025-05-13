import {} from 'cypress';

Cypress.Commands.add('prepare', () => {
	cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
	cy.intercept('GET', 'user', { fixture: 'user' }).as('userInfo');
	cy.intercept('POST', 'orders', { fixture: 'orders' });
	cy.visit('http://localhost:8080/');
	cy.wait('@userInfo')
		.its('response.body')
		.should('deep.equal', {
			success: true,
			user: {
				email: 'nn21233@mail.ru',
				name: 'Mike',
			},
		});
});

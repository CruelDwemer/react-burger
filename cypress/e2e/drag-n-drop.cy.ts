// import { describe, it } from '@jest/globals';
import {} from 'cypress';

describe('dragging and modals test', () => {
	beforeEach(() => {
		cy.setCookie('accessToken', 'test-accessToken');
		cy.setCookie('refreshToken', 'test-refreshToken');
	});

	it('test user path from clicking on an ingredient, draggin ingredients container to confirming the order', () => {
		cy.prepare();
		cy.get('[data-test-id="drag-element"]').first().as('bunElement');
		cy.get('[data-test-id="drag-element"]').last().as('mainElement');
		cy.get('[data-test-id="drop-container"]').as('dropContainer');
		cy.get('[data-test-id="drop-container"] button').as('orderButton');

		cy.get('@bunElement').click();
		cy.get('[data-test-id="modal"]').contains('Краторная булка N-200i');
		cy.get('[data-test-id="close-modal"]').click();

		const dataTransfer = new DataTransfer();

		cy.get('@bunElement').trigger('dragstart', { dataTransfer });

		cy.get('@dropContainer').trigger('drop').trigger('dragend');

		cy.get('@dropContainer').should('contain', 'Краторная булка N-200i');

		cy.get('@mainElement').trigger('dragstart', { dataTransfer });

		cy.get('@dropContainer').trigger('drop').trigger('dragend');

		cy.get('@dropContainer').should(
			'contain',
			'Биокотлета из марсианской Магнолии'
		);

		cy.get('@orderButton').click();
		cy.get('[data-test-id="modal"]').contains('71620');
		cy.get('[data-test-id="close-modal"]').click();
	});
});

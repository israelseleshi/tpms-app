/// <reference types="cypress" />

describe('Auth: login flow', () => {
  it('submits any credentials and lands on dashboard', () => {
    cy.visit('/login');

    const randomEmail = `user_${Date.now()}@example.com`;
    cy.get('#email').type(randomEmail);
    cy.get('#password').type('P@ssw0rd!');

    cy.contains('button', 'Sign in').click();

    // Wait for redirect and verify URL contains /dashboard
    cy.location('pathname', { timeout: 10000 }).should('include', '/dashboard');
  });
});

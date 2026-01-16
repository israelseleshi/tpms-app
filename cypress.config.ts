import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // IMPORTANT: make sure your dev server is running on this port before executing `cypress run`
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    chromeWebSecurity: false,
  },
});

/// <reference types="cypress" />

// E2E test: Fills the EPA form UI and verifies successful PDF generation toast

describe('EIPA Form Automation', () => {
  beforeEach(() => {
    // Visit the form page – ensure your Next.js dev server is running
    cy.visit('/dashboard/eipa-forms');
  });

  it('fills fields, checks check-boxes and downloads filled form', () => {
    // --- Mark Type ---
    cy.get('#mark_type_figurative').click({ force: true });
    cy.get('#mark_type_word').click({ force: true });
    cy.get('#mark_type_mixed').click({ force: true });
    cy.get('#mark_type_three_dim').click({ force: true });

    // --- Fill text inputs ---
    cy.get('#applicant_name').clear().type('Israel Seleshi PLC');
    cy.get('#address_street').type('123 Innovation Ave');
    cy.get('#address_zone').type('Bole');
    cy.get('#city_name').type('Addis Ababa');
    cy.get('#city_code').type('AA');
    cy.get('#state_name').type('Addis Ababa');
    cy.get('#state_code').type('AA');
    cy.get('#zip_code').type('1000');

    // Nationality field lives in Section I but has id="nationality"
    cy.get('#nationality').type('Ethiopian');

    // --- Location specifics ---
    cy.get('#wereda').type('01');
    cy.get('#house_no').type('15');
    cy.get('#po_box').type('1234');
    cy.get('#residence_country').type('Ethiopia');

    // --- Contact ---
    cy.get('#telephone').type('+251911000000');
    cy.get('#email').type('test@example.com');
    cy.get('#fax').type('+251115555555');

    // --- Additional fields not previously filled ---
    cy.get('#po_box').type('PO123');
    cy.get('#mark_translation').type('Translated Mark');
    cy.get('#mark_transliteration').type('መርካት');
    cy.get('#mark_language_requiring_translation').type('Amharic');
    cy.get('#mark_has_three_dim_features').type('Yes – it has embossed surface');
    cy.get('#mark_color_indication').type('Red & Black');
    cy.get('#goods_services_list').type('Class 25: Clothing\nClass 35: Advertising');
    cy.get('#disclaimer_text').type('No claim to "SOFT" apart from the mark.');
    cy.get('#priority_application_filing_date').type('2025-01-01');
    cy.get('#priority_country').type('Kenya');

    // --- Checkboxes ---
    cy.get('#chk_female').click({ force: true });
    cy.get('#chk_male').click({ force: true });
    cy.get('#chk_company').click({ force: true });
    cy.get('#chk_goods').click({ force: true });
    cy.get('#chk_services').click({ force: true });
    cy.get('#chk_collective').click({ force: true });

    // Trigger PDF generation
    cy.contains('button', 'Download PDF').click();

    // Expect PDF file downloaded
    const downloadName = 'EIPA_Form_ET_2025_0142.pdf';
    cy.readFile(`cypress/downloads/${downloadName}`, { timeout: 15000 }).should('exist');
  });
});

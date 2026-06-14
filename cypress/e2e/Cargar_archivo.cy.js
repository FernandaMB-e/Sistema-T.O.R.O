describe('MCA-001 - ManejadorCargarArchivo', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5000');

    // Login
    cy.get('#nombre').type('Emanuel Ruiz');
    cy.get('#matricula').type('220591');
    cy.contains('button', 'Continuar').click();

    // Esperamos pantalla de materias
    cy.get('.materias-view-container', { timeout: 10000 }).should('exist');

    cy.get('body').then(($body) => {
      if ($body.find('.card-materia').length === 0) {
        // Abrimos el modal
        cy.get('.fab-add').click();

        // Esperamos a que el modal esté visible antes de escribir
        cy.get('#reg-nombre-materia', { timeout: 5000 }).should('be.visible').clear().type('Cultura Digital');
        cy.get('#reg-grupo').should('be.visible').clear().type('3A');
        cy.get('#reg-ciclo').should('be.visible').clear().type('2025-2026');

        // Hacemos clic en Crear
        cy.contains('button', 'Crear').should('be.visible').click();

        // Esperamos a que aparezca la tarjeta
        cy.get('.card-materia', { timeout: 10000 }).should('exist');
      }

      // Entramos a Cultura Digital
      cy.contains('.card-materia', 'Cultura Digital', { timeout: 10000 }).click();
    });
  });

  it('MCA-001 - debe mostrar el botón para abrir el explorador de archivos', () => {
    cy.get('.btn-upload')
      .should('exist')
      .and('be.visible');
  });

  it('MCA-002 - el input de archivo debe aceptar solo archivos ZIP', () => {
    cy.get('#fileInput')
      .should('exist')
      .and('have.attr', 'accept', '.zip');
  });

  it('MCA-003 - debe mostrar el nombre del archivo seleccionado', () => {
    cy.get('#fileInput').selectFile({
      contents: Cypress.Buffer.from('archivo zip simulado'),
      fileName: 'completar-camino(4).zip',
      mimeType: 'application/zip'
    }, { force: true });

    cy.get('#file-status')
      .should('contain', 'completar-camino(4).zip');
  });

  it('MCA-004 - debe mostrar el botón de cargar archivos', () => {
    cy.contains('button', 'Cargar archivos')
      .should('exist')
      .and('be.visible');
  });

  it('MCA-005 - no debe procesar si no hay archivo seleccionado', () => {
    cy.contains('button', 'Cargar archivos').click();

    cy.get('#contenedor-lecciones').should('exist');

    cy.get('body').should('not.contain', 'Cannot read');
  });

  it('MCA-006 - debe mostrar el área de carga de archivos', () => {
    cy.get('.upload-area')
      .should('exist')
      .and('be.visible');
  });

  it('MCA-007 - debe mostrar el portal de archivos para sincronización', () => {
    cy.contains('button', 'Carga y descarga de lecciones')
      .should('exist')
      .and('be.visible');
  });

});
describe('MCL-001 - ManejadorContenidoLección', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5000');

    // Login
    cy.get('#nombre').type('Emanuel Ruiz');
    cy.get('#matricula').type('220591');
    cy.contains('button', 'Continuar').click();

    // Esperamos pantalla de materias
    cy.get('.materias-view-container', { timeout: 10000 }).should('exist');

    // Si no hay materias, creamos Cultura Digital
    cy.get('body').then(($body) => {
      if ($body.find('.card-materia').length === 0) {
        cy.get('.fab-add').click();
        cy.get('#reg-nombre-materia', { timeout: 5000 }).should('be.visible').clear().type('Cultura Digital');
        cy.get('#reg-grupo').should('be.visible').clear().type('3A');
        cy.get('#reg-ciclo').should('be.visible').clear().type('2025-2026');
        cy.contains('button', 'Crear').should('be.visible').click();
        cy.get('.card-materia', { timeout: 10000 }).should('exist');
      }

      // Entramos a Cultura Digital
      cy.contains('.card-materia', 'Cultura Digital', { timeout: 10000 }).click();
    });
  });

  it('debe mostrar solo las lecciones de la materia seleccionada', () => {

    // Verificamos que el contenedor de lecciones existe
    cy.get('#contenedor-lecciones', { timeout: 10000 })
      .should('exist')
      .and('be.visible');

    // Verificamos que sessionStorage tiene la materia guardada
    cy.window().then((win) => {
      const materiaIdActual = win.sessionStorage.getItem('materia_id_actual');
      expect(materiaIdActual).to.not.be.null;
      expect(materiaIdActual).to.not.equal('');
    });

    // Si hay lecciones verificamos que se renderizan correctamente
    cy.get('#contenedor-lecciones').then(($contenedor) => {
      const tarjetas = $contenedor.find('.lesson-card');

      if (tarjetas.length > 0) {
        cy.get('.lesson-card').each(($card) => {
          cy.wrap($card).should('be.visible');
          cy.wrap($card).invoke('text').should('not.be.empty');
        });
      } else {
        cy.get('#contenedor-lecciones').should('be.empty');
      }
    });
  });
});
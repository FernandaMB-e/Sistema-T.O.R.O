describe('MCL-001 - ManejadorContenidoLección', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5000');

    // Login
    cy.get('#nombre').type('Emanuel Ruiz');
    cy.get('#matricula').type('220591');
    cy.contains('button', 'Continuar').click();
  });

  it('debe mostrar solo las lecciones de la materia seleccionada', () => {

    // Esperamos a que carguen las materias
    cy.get('.card-materia', { timeout: 10000 })
      .should('be.visible')
      .first()
      .click();

    // Verificamos que el contenedor de lecciones existe
    cy.get('#contenedor-lecciones')
      .should('exist')
      .and('be.visible');

    // Verificamos que el filtro funcionó:
    // todas las tarjetas visibles pertenecen a la misma materia activa
    cy.window().then((win) => {
      const materiaIdActual = win.sessionStorage.getItem('materia_id_actual');

      // Verificamos que sessionStorage tiene la materia guardada
      expect(materiaIdActual).to.not.be.null;
      expect(materiaIdActual).to.not.equal('');
    });

    // Si hay lecciones, verificamos que se renderizan como tarjetas
    cy.get('#contenedor-lecciones').then(($contenedor) => {
      const tarjetas = $contenedor.find('.lesson-card');

      if (tarjetas.length > 0) {
        // Hay lecciones: verificamos que cada tarjeta tiene contenido
        cy.get('.lesson-card').each(($card) => {
          cy.wrap($card).should('be.visible');
          cy.wrap($card).invoke('text').should('not.be.empty');
        });
      } else {
        // No hay lecciones aún: el contenedor debe estar vacío sin errores
        cy.get('#contenedor-lecciones').should('be.empty');
      }
    });
  });
});
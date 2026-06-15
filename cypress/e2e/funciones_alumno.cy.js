describe('Pruebas Unitarias/Integración - Lógica del Alumno', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('titulo') || err.message.includes('transaction')) {
      return false; 
    }
    return true;
  });

  beforeEach(() => {
    cy.visit('http://localhost:5000/index.html');
    cy.wait(1000); 
  });

  it('1 y 3. Debe guardar una lección en ToroDB y luego cargarla correctamente', () => {
    const matriculaPrueba = '2026001';
    
    const leccionSimulada = {
      materia_id: 'MAT-101',
      id_leccion: 'LEC-01',
      titulo_actividad: 'Sopa de Letras - Hardware',
      html: '<p>Contenido de prueba</p>',
      archivos: []
    };

    cy.window().then((win) => {
      win.sessionStorage.setItem('materia_id_actual', 'MAT-101');

      win.guardarLeccionDB(matriculaPrueba, leccionSimulada).then(() => {
        win.cargarLeccionesDB(matriculaPrueba).then((lecciones) => {
          expect(lecciones).to.be.an('array');
          expect(lecciones.length).to.be.greaterThan(0);
          expect(lecciones[0].titulo_actividad).to.equal('Sopa de Letras - Hardware');
        });
      });
    });
  });

  it('2. Debe transicionar de la vista de lección a la actividad interactiva', () => {
    cy.window().then((win) => {
      win.leccionActual = { titulo: 'Simulada' }; 
      
      const lessonModal = win.document.getElementById('lesson-modal');
      lessonModal.style.display = 'block';

      win.iniciarActividadDesdeLeccion();

      cy.get('#lesson-modal').should('have.css', 'display', 'none');
    });
  });
});
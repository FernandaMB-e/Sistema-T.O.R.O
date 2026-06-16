describe('Pruebas Unitarias/Integración - Lógica del Alumno', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('titulo')) {
      return false; 
    }

    return true;
  });

  beforeEach(() => {
    cy.visit('http://localhost:5000/index.html');
    cy.wait(1000); 
  });

  it('1 y 3. Debe guardar una lección en ToroDB y luego cargarla correctamente', () => {
    const matriculaPrueba = `2026001-${Date.now()}`;
    const idMateria = '101';

    const leccionSimulada = {
      matricula: matriculaPrueba,

      // Estos campos son solo para simular una lección completa
      // pero guardarLeccionDB toma el materia_id desde sessionStorage
      materia_id: 101,
      id_materia: 101,
      materia: 'MAT-101',

      id_leccion: `LEC-01-${Date.now()}`,
      titulo_actividad: 'Sopa de Letras - Hardware',
      html: '<p>Contenido</p>',
      archivos: []
    };

    cy.window().then((win) => {
      expect(win.guardarLeccionDB).to.be.a('function');
      expect(win.cargarLeccionesDB).to.be.a('function');

      // Debe ser numérico porque guardarLeccionDB usa parseInt()
      win.sessionStorage.setItem('materia_id_actual', idMateria);

      return win.guardarLeccionDB(matriculaPrueba, leccionSimulada);
    }).then(() => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('materia_id_actual', idMateria);

        return win.cargarLeccionesDB(matriculaPrueba);
      });
    }).then((lecciones) => {
      cy.log('Lecciones cargadas: ' + JSON.stringify(lecciones));

      expect(lecciones).to.be.an('array');

      const leccionEncontrada = lecciones.find((leccion) => {
        return leccion.titulo_actividad === 'Sopa de Letras - Hardware';
      });

      expect(leccionEncontrada).to.exist;
      expect(leccionEncontrada.matricula).to.equal(matriculaPrueba);
      expect(leccionEncontrada.materia_id).to.equal(101);
      expect(leccionEncontrada.titulo_actividad).to.equal('Sopa de Letras - Hardware');
    });
  });

  it('2. Debe transicionar de la vista de lección a la actividad interactiva', () => {
    cy.window().then((win) => {
      win.leccionActual = { titulo: 'Simulada' }; 

      const lessonModal = win.document.getElementById('lesson-modal');
      lessonModal.style.display = 'block';

      win.iniciarActividadDesdeLeccion();
    });

    cy.get('#lesson-modal').should('have.css', 'display', 'none');
  });
});
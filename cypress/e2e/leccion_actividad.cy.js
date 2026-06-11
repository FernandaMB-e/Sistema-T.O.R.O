describe('Navegación del Alumno: De la Lección a la Actividad', () => {
  
  beforeEach(() => {
    cy.visit('http://192.168.1.10:5000'); 
    
    // 1. Llenar el formulario usando los IDs exactos de tu HTML
    // Asegúrate de poner un nombre y matrícula que SÍ existan en tu base de datos local
    cy.get('#nombre').type('fer'); 
    cy.get('#matricula').type('121305'); 
    
    // 2. Hacer clic en el botón de ingresar
    // (Si tu botón dice otra cosa como "Entrar" o "Acceder", cámbialo aquí)
    cy.contains('button', 'Continuar').click();
    
    // 3. Esperar a que carguen las materias y hacer clic en la primera
    cy.get('.card-materia', { timeout: 10000 }).should('be.visible').first().click(); 
    
    // 4. Simular clic en la primera lección disponible
    cy.get('.lesson-card').should('be.visible').first().click(); 

    // 5. Validamos que el modal de la lección ya es visible
    cy.get('#lesson-modal').should('be.visible');
  });

  it('Debe cancelar y ocultar el modal si el alumno hace clic en "Volver"', () => {
    // 2. El alumno intenta ir a la actividad
    cy.contains('button', 'Realizar Actividad').click();

    // 3. Aparece el modal de advertencia
    cy.contains('¿Te sientes listo para poner a prueba lo aprendido?').should('be.visible');

    // 4. El alumno hace clic en "Volver" (lo que ejecuta tu btnIzq.onclick)
    cy.contains('button', 'Volver').click();

    // 5. Validamos que el modal de advertencia se cerró
    cy.contains('¿Te sientes listo para poner a prueba lo aprendido?').should('not.be.visible');
    
    // NOTA: Según tu código JS, btnIzq cierra el modal de confirmación. 
    // Si tu aplicación vuelve a abrir el `#lesson-modal` automáticamente, puedes validarlo así:
    // cy.get('#lesson-modal').should('be.visible');
  });
});
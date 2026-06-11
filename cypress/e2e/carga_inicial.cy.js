describe('Smoke Test - Sistema T.O.R.O.', () => {
  
  beforeEach(() => {
    // 1. ¡OJO AQUÍ! Cambié el puerto a 5500 que es el estándar de Live Server. 
    // Si usas otro, cámbialo.
    cy.visit('http://localhost:5000'); 
    
    // Forzamos la limpieza de sesión para que SIEMPRE aparezca el Login
    cy.clearLocalStorage();
  });

  it('Debe cargar la vista principal sin errores', () => {
    cy.get('body').should('be.visible');
  });

  it('Debe mostrar el logo del sistema', () => {
    // Le damos hasta 10 segundos para que inicializarDB() termine y dibuje la pantalla
    cy.get('img[src*="logo_toro.png"]', { timeout: 10000 })
      .should('be.visible');
  });

  it('Debe tener acceso al manifest para el soporte offline', () => {
    cy.request('/manifest.json').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // ====================================================================
  // PRUEBA DE LOGIN
  // ====================================================================
  it('Debe hacer login y redirigir a la vista de materias', () => {
    
    // Esperamos pacientemente a que aparezca el input de nombre
    cy.get('#nombre', { timeout: 10000 }).type('Maria Fernanda');
    cy.get('#matricula').type('8273');

    cy.get('.btn-continuar-login').click();

    // Verificamos que el formulario de login fue DESTRUIDO del HTML
    cy.get('#loginForm').should('not.exist'); 
    
    // IMPORTANTE: Abre tu archivo donde dibujas las materias y busca 
    // una clase o ID real. Por ejemplo, si tus materias se dibujan en 
    // un div con id="main-content", pon ese.
    cy.get('body').should('be.visible'); // Reemplaza 'body' por el '#ID_DE_TUS_MATERIAS'
  });

});
describe('Smoke Test - Sistema T.O.R.O.', () => {
  
  // Antes de cada prueba (it), le decimos a Cypress que visite la página principal
  beforeEach(() => {
    // Nota: Cambia el '3000' por el puerto donde corra tu servidor de Node/Express
    cy.visit('http://localhost:5000'); 
  });

  it('Debe cargar la vista principal sin errores', () => {
    // Verificamos que el body de la página se haya renderizado
    cy.get('body').should('be.visible');
  });

  it('Debe mostrar el logo del sistema', () => {
    // Buscamos que exista una imagen cuyo origen (src) incluya el nombre de tu archivo
    cy.get('img[src*="logo_toro.png"]')
      .should('be.visible')
      .and(($img) => {
        // Esta aserción extra verifica que la imagen realmente cargó y no está rota
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Debe tener acceso al manifest para el soporte offline', () => {
    // Hacemos una petición directa al archivo manifest.json para asegurar que el servidor lo está entregando
    cy.request('/manifest.json').then((response) => {
      expect(response.status).to.eq(200);
      // Opcional: verificar que sea un JSON válido
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

});
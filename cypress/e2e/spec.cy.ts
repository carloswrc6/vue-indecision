// global cypress
describe('Sending messages', () => {
  it('Render written message', () => {
    const message = 'Hola, este es un mensaje de prueba';
    cy.visit('http://localhost:5173')

    cy.get('input[type="text"]')
    .type(message) 
    .should('have.value', message);  

    cy.get('button.bg-blue-500').click();

    cy.get('.bg-blue-200').should('have.text', message);

  })

  it('Display reply message if sent message contains this "?" sign ', () => {
    const message = 'Hola?';
    cy.visit('http://localhost:5173')

    cy.get('input[type="text"]')
    .type(message) 
    .should('have.value', message);  

    cy.get('button.bg-blue-500').click();

    cy.get('.bg-blue-200')
      .should('have.text', message);

    cy.get('.bg-gray-300')
      .should('exist')  
      .within(() => {
        // cy.get('span').should('contain.text', 'yes').or('contain.text', 'no');
        // cy.get('span').should('match', /yes|no/);
        cy.get('span').invoke('text').then((text) => {
          expect(text).to.match(/yes|no/);
        });
        cy.get('img').should('have.attr', 'src').and('include', 'https://yesno.wtf/assets');
      });

  })

  it.only('recorrer el array de mensajes, solo si el string contiene ? deberá verificar que tenga una respuesta yes o no', () => {
    const messages = ['Hola1', 'Hola2?', 'Hola3?', 'Hola4', 'Hola5?', 'Hola6?'];
    const defaultTimeout = 5000; // Tiempo de espera

    cy.visit('http://localhost:5173');

    messages.forEach((message, index) => {
      cy.get('input[type="text"]')
        .type(message, { force: true })
        .should('have.value', message);

      cy.get('button.bg-blue-500').click();

      cy.get('.bg-blue-200')
        .last()
        .should('have.text', message);

      if (message.includes('?')) {
        // Esperar hasta que se agregue un nuevo mensaje de respuesta
        cy.get('.bg-gray-300', { timeout: defaultTimeout })
          .last() // Tomar la última respuesta
          .within(() => {
            // Verificar que el texto sea "yes" o "no"
            cy.get('span')
              .invoke('text')
              .should('match', /yes|no/);

            // Verificar que la imagen tiene el atributo 'src' correcto
            cy.get('img')
              .should('have.attr', 'src')
              .and('include', 'https://yesno.wtf/assets');
          });
      }
    });
  });
  
  it('verificar que mensajes con ? tengan respuestas válidas', () => {
    const messages = ['Hola1', 'Hola2?', 'Hola3?', 'Hola4', 'Hola5?', 'Hola6?'];
    const defaultTimeout = 5000; // Tiempo de espera
  
    cy.visit('http://localhost:5173');
  
    let questionCount = 0; // Contador de mensajes con ?
    let responseCount = 0; // Contador de respuestas válidas
  
    messages.forEach((message, index) => {
      cy.get('input[type="text"]')
        .type(message, { force: true })
        .should('have.value', message);
  
      cy.get('button.bg-blue-500').click();
  
      cy.get('.bg-blue-200')
        .last()
        .should('have.text', message);
  
      if (message.includes('?')) {
        questionCount++; // Incrementar contador de mensajes con ?
  
        // Esperar hasta que se agregue un nuevo mensaje de respuesta
        cy.get('.bg-gray-300', { timeout: defaultTimeout })
          .last()
          .within(() => {
            cy.get('span')
              .invoke('text')
              .should('match', /yes|no/)
              .then(() => {
                responseCount++; // Incrementar contador de respuestas válidas
              });
  
            cy.get('img')
              .should('have.attr', 'src')
              .and('include', 'https://yesno.wtf/assets');
          });
      }
    });
  
    // Verificar que la cantidad de respuestas coincida con la cantidad de mensajes con ?
    cy.then(() => {
      expect(responseCount).to.equal(questionCount);
    });
  });
  
  
})
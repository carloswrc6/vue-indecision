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


  // it.only('recorrer el array de mensajes, solo si el string contiene ? deberá verificar que tenga una respuesta yes o no', () => {
  //   const messages = ['Hola1', 'Hola2?', 'Hola3?', 'Hola4', 'Hola5?', 'Hola6?'];
  //   const defaultTimeout = 5000; // Tiempo de espera
  
  //   cy.visit('http://localhost:5173');
  
  //   messages.forEach((message, index) => {
  //     // Enviar el mensaje
  //     cy.get('input[type="text"]')
  //       .type(message)
  //       .should('have.value', message);
  
  //     cy.get('button.bg-blue-500').click();
  
  //     // Validar que el mensaje enviado aparece en la lista
  //     cy.get('.bg-blue-200')
  //       .last()
  //       .should('have.text', message);
  
  //     // Si el mensaje contiene '?', esperar y verificar la respuesta
  //     if (message.includes('?')) {
  //       // Esperar hasta que se agregue un nuevo mensaje de respuesta
  //       cy.get('.bg-gray-300', { timeout: defaultTimeout })
  //         .should('have.length.greaterThan', index) // Asegurarse que hay más respuestas que mensajes
  //         .last() // Tomar la última respuesta
  //         .within(() => {
  //           // Verificar que el texto sea "yes" o "no"
  //           cy.get('span')
  //             .invoke('text')
  //             .should('match', /yes|no/);
  
  //           // Verificar que la imagen tiene el atributo 'src' correcto
  //           cy.get('img')
  //             .should('have.attr', 'src')
  //             .and('include', 'https://yesno.wtf/assets');
  //         });
  //     }
  //   });
  // });
  
})
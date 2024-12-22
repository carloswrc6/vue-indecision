import { defineConfig } from "cypress";

export default defineConfig ({
  e2e: {
    setupNodeEvents(on, config) {
      // configuración de eventos
    },
    baseUrl: 'http://localhost:5173', 
  }
});

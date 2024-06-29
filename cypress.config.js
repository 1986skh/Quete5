const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://practice.expandtesting.com/notes/api",
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // Ajouter des écouteurs d'événements ou d'autres configurations si nécessaire
     
    }
  }
});



const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://practice.expandtesting.com/notes/api",
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      
      // Ajouter d'autres écouteurs d'événements ou configurations si nécessaire
    },
  },
});




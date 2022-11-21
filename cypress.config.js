const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,

  e2e: {
    baseUrl: "http://localhost:3000/",
    viewportWidth: 1980,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  component: {
    viewportWidth: 1980,
    viewportHeight: 1080,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: 'cypress/component/*.cy.{js,jsx,ts,tsx}'
  },
});

module.exports = {
  client: {
    includes: [
      "web-app/src/**/*.{ts,tsx,js,jsx,graphql}"
  ],
    name: "manywords-dev",
    service: {
      url: "https://localhost:4000/graphql"

    },
    skipSSLValidation: true,
  }
};
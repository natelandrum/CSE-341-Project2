const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Favorite Song API",
    description: "API to manage favorite songs",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

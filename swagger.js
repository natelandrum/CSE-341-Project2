const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Favorite Song API",
    description: "API to manage favorite songs",
  },
  host: "cse-341-project2-30zs.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

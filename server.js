// app.js
require('module-alias/register')


const express = require('express');
const path = require("path");
const { connectDB } = require('@config/database');
const { syncDatabase } = require("@models/index.js");
// const { specs, swaggerUi } = require('./swagger');
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const apiRoutes = require("@routes/Api.routes");
const { jsonParser, urlEncodedParser } = require('./middleware/middleware');
const app = express();
const port = 3000;
const swaggerDocument = yaml.load("./docs/swagger.yaml");


app.use(jsonParser);
app.use(urlEncodedParser);

app.use("/content/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello, Swagger!');
});

connectDB().then(()=>{
  syncDatabase();
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
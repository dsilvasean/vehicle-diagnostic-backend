// app.js
require('module-alias/register')


const express = require('express');
const { connectDB } = require('@config/database');
const { syncDatabase } = require("@models/index.js");
const { specs, swaggerUi } = require('./swagger');
const apiRoutes = require("@routes/Api.routes");
const { jsonParser, urlEncodedParser } = require('./middleware/middleware');
const app = express();
const port = 3000;


app.use(jsonParser);
app.use(urlEncodedParser);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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
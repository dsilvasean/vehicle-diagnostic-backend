// app.js
require('module-alias/register')


const express = require('express');
const http = require("http");
const cors = require("cors");
const path = require("path");
const { connectDB } = require('@config/database');
const { syncDatabase } = require("@models/index.js");
// const { specs, swaggerUi } = require('./swagger');
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const { jsonParser, urlEncodedParser } = require('./middleware/middleware');
const app = express();
const server = http.createServer(app);
const port = 3000;
const swaggerDocument = yaml.load("./docs/swagger.yaml");
const socketServer = require("./socket"); // Import the socket server
const io = socketServer(server);
const apiRoutes = require("@routes/Api.routes");
const chatRoutes = require("@routes/Chat.routes")(io); // Pass io instance

app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);

app.use("/content/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', apiRoutes)
app.use("/api/chat", chatRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Swagger!');
});

connectDB().then(()=>{
  syncDatabase();
})

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
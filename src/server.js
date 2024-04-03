require("dotenv").config();
require("./db").connectToPostgres();
//require("./models/postgres");
//require("./config/firebase.config");

const http = require("http");
const app = require("./app");

//const logger = require("./config/logger.config");
const { PORT } = require("./config/constants");

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
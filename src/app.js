const express = require("express");
const cors = require("cors");
//const { swaggerUi, specs } = require("./config/swagger.config");
//const whitelistedUrls = require("./config/cors.config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => res.status(200).json({ message: "Server is healthy", pid: process.pid, uptime: process.uptime() }));

app.use("/api/v1/", require("./routes"));

module.exports = app;

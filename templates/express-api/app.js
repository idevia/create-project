const express = require("express");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
require("./db/db");

const app = express();


dotenv.config();

const apiRoutes = require(`./api/${process.env.API_VERSION}/routes/index`);
const port = process.env.PORT || 5000;
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
  })
);


app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static("public"));
// Add middleware to console log every request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  console.log(
    `[${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")}]`,
    chalk.underline.bgMagenta(req.method),
    chalk.bold.white(req.url)
  );
  next();
});

// app.get("/api/v1", (req, res) => {
//   res.send("Welcome");
// });
app.use(`/api/${process.env.API_VERSION}`, apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
const mongoose = require("mongoose");

const mongoURI = process.env.DB_URL;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database connected."))
  .catch(err => console.log(err));

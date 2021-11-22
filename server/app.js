const express = require("express");
const dotenv = require("dotenv");
const connect = require("./database/connection");

const app = express();
app.use(express.json());

dotenv.config({ path: "./config.env" });

//routes
app.use("/api", require("./routes/router"));

//database connection
connect();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

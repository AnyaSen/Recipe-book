const express = require("express");
require("./db/mongoose");
const RecipeRouter = require("./routes/recipe-router");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(RecipeRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

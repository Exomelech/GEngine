const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { stat } = require("fs");
app.use(cors());

const jsonParser = express.json();
const port = 3000;
const static = path.join(__dirname, "../../bundle");

app.use( express.static(static) );

app.use(jsonParser).use(express.static(path.join(__dirname, "../../bundle")));

app.get("*", (req, res) => {
  console.log(res, "Client has redirected");
  res.redirect("/");
});

app.get('/', (req, res) => {
  //console.log('conn');
  res.sendFile(`${static}/index.html`);
  //res.end();
});


app.listen(port, () => console.log(`Running at Port ${port}`));
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

/*
app.post("/auth/", jsonParser, (req, res) => {
  console.log( 'Client has request auth' );
  external_api.auth_request(req.body)
    .then( data => res.json(data) );
});
*/
// app.get('/helloworld', (req, res) => {
//   console.log('request')
//   res.json({
//     a:'i love nikita'
//   })
// });

// app.post('/registration', jsonParser, (req, res) => {
//   //external_api.reg_request(req.body)
//   temp_db.registration( req.body )
//   .then( data => res.json(data) );
// });

// app.post('/login', jsonParser, (req, res) => {
//   //external_api.login_request(req.body)
//   temp_db.login(req.body)
//   .then( data => res.json(data) );
// });
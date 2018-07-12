const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;

//help page
app.use(express.static(publicPath));

//app.use(bodyParser.json());
// app.get('/', (req, res) => {
//   res.render('/public/index.html');
// });

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

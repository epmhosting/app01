const express = require('express');
const bodyParser = require('body-parser');

const http = require('http');
const https = require('https');
const fs = require('fs');

const path = require("path");

const app = express();

// support json encoded bodies
app.use(bodyParser.json({
  limit: '5mb'
}));

// support encoded bodies
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));

// Static Routes
var publicPath = path.resolve(__dirname, "public");
app.use('/', express.static(publicPath));


app.get('/hello', (req, res) => {
  console.log('GET /hello');
  // res.type('text/plain');
  res.type('text/html');
  res.send("<h1>Good Morning from App01! (Docker)<h1>");
});

const port = 3000;
// app.listen(port, () => console.log(`01 - Server running on port ${port} .................`));
http.createServer(function(req, res) {   
  // console.log(req.headers);
  console.log(req.headers['host']);
  console.log(req.url);
  // res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
  res.writeHead(301, {"Location": "https://docker.mightybest.com:8443" + req.url});
  res.end();
}).listen(port, ()=> {
  console.log(`Server running...on port ${port}`)
  // console.log('hhhh');
});



https.createServer({
  // for aws, has /etc/letscencrypt
  key: fs.readFileSync('/etc/letsencrypt/live/docker.mightybest.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/docker.mightybest.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/docker.mightybest.com/chain.pem'),
  
  // for local, no /etc/letscencrypt
  // key: fs.readFileSync('./letsencrypt/docker.mightybest.com/privkey.pem'),
  // cert: fs.readFileSync('./letsencrypt/docker.mightybest.com/cert.pem'),
  // ca: fs.readFileSync('./letsencrypt/docker.mightybest.com/chain.pem')
}, app).listen(443, () => {
  console.log('HTTPS Listening on port 443...')
})
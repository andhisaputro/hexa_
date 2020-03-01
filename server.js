require('dotenv').config()
var compression = require('compression')
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cors = require('cors') 
const server = express()
const bodyParser = require('body-parser') 
const multer = require('multer');
const upload = multer();
 
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://192.168.99.100:8080/hexa");

server.use(compression())
server.use(cors()) 
server.use([bodyParser.json(),bodyParser.raw(),bodyParser.text(),bodyParser.urlencoded({
  extended: false
}) , upload.array()])  
 
require('./routes')({server,app});
app.prepare()
.then(() => {

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.SERVER_PORT, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+process.env.SERVER_PORT)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

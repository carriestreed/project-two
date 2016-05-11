require( 'dotenv' ).config()
var dotenv = require('dotenv')

var express    = require('express')
var PORT       = process.env.PORT || 3000
var app        = express()

app.use(express.static('./'))

app.listen(PORT, function () {
  console.log('server is listening on port ' + PORT + "!")
});

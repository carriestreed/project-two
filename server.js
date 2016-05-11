var express = require('express'),
    PORT    = process.env.PORT || 3000,
    app     = express();

app.use(express.static('./'));

app.get('/', function(req, res){
  res.sendFile('/index.html');
});
​
app.listen(PORT, function () {
  console.log('server is listening on port ' + PORT + "!");
});

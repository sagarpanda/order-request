var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// config
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// middleware
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  //res.send('Hello ExpressJs');
  res.render('login', { title: 'Order Request', message: 'Hello there!' });
});


app.post('/', function(req, res){
  res.redirect('/home');
});


app.get('/home', function(req, res){
  res.send('Hello Home');
});

app.listen(3000);
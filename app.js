var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var session 	= require('express-session')
var MongoStore 	= require('connect-mongo')(session);


var Constant 	= require('./helpers/Constant');
var User 		= require('./models/UserModel');
var Product 	= require('./models/ProductModel');

mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/'+Constant.DB_NAME);

// config
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.multipart());
app.use(express.static(__dirname + '/public'));
app.use(session({ 
	secret: 'keyboard cat', 
	resave: false, 
	saveUninitialized: true, 
	cookie: { maxAge: 600000000 },
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use('/api/v1', require('./controllers/api/v1/MyOrdersCtrlr'));


app.get('/', function(req, res){
  //res.send('Hello ExpressJs');
  	res.redirect('/login');
	//var user = new User({username:"user3",password:"pass3",fname:"User",lname:"Three",role:3});
	//user.save();
});

app.get('/login', function(req, res){
	if(req.session.info){
  		res.redirect('/home/'+req.session.info.role);
  	}
	res.render('login', { title: 'Order Request', message: '' });
});
app.get('/logout', function(req, res){
	//res.send('Hello ExpressJs');
	req.session.info = null;
  	res.redirect('/login');
});


app.post('/login', function(req, res){
	//res.redirect('/home');
	console.log('username: '+req.body.username);
	User.findByUsername(req.body.username, function(err, user) {
	  if (err) throw err;
	  //console.log(user, user.length);
	  if((user.length === 1) && (req.body.password === user[0].password)){
	  	req.session.info = {
	  		username: user[0].username,
	  		role 	: user[0].role,
	  		fname 	: user[0].fname,
	  		lname 	: user[0].lname
	  	};
	  	//console.log(req.session);
	  	res.redirect('/home/'+req.session.info.role);
	  }else{
	  	req.session.info = null;
	  	res.render('login', { title: 'Order Request', message: 'Invalid username or password.' });
	  }
	});
});


app.get('/home/:role', function(req, res){
	if(!req.session.info){
  		res.redirect('/login');
  	}else if(req.session.info.role != req.params.role){
		res.redirect('/home/'+req.session.info.role);
  	}
  	//console.log(req.params);
	res.render('home', { title: 'Order Request', mainSrc: "/js/l"+req.params.role+".bundle.js", info: req.session.info });
});


app.get('/place-order', function(req, res){

	res.render('home', { title: 'Order Request', mainSrc: "/js/l3.bundle.js" });
});

app.listen(3000);
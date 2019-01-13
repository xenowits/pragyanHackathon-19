const mocha = require('mocha')

const assert = require('assert')

const express = require('express')
const app = express()

const path = require('path')

const flash = require('connect-flash')

var bcrypt = require('bcryptjs') 

const session = require('express-session');

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

mongoose.promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(flash())

app.use(passport.initialize())

const Farmer = require('./models/farmer')

mongoose.connect('mongodb://abhi1:123456a@ds255784.mlab.com:55784/pragyanhackathon',{ useNewUrlParser: true })

mongoose.connection.once('open',function(){

console.log("Connection is established successfully")

}).on('error',function(error){

	console.log('Connection error',error)

})

app.get('/', (req,res) => {

	res.sendFile(path.join(__dirname +'/frontend/signin.html'));

	console.log("wooww")

	Farmer.findOne({name: 'abh'}).then(function(result){
			console.log(result)
			// result = ''' + result + '''
			// var obj = JSON.parse(result)
			// console.log(obj.state)
	})

})


passport.use(new LocalStrategy(

  function(username, password, done) {
    Farmer.findOne({ name: username }, function(err, user) {
      if (err) { 
      	console.log()
      	return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if (!user.validPassword(user,password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);

      bcrypt.compare(password, user.password, function(err, res) {

      		console.log('ye wala bcrypt ka h ' + res)

    		if (err)
    		{
    			throw err
    			console.log('err wala h')
    		}

    		else{

    			console.log('else wala block h ' + res)
    			if (res){
    				return done(null,user)
    				console.log('res wala true h')
    			}
    			else{
    				console.log('res wala false h')
    				return done(null, false, { message: 'Incorrect password.' });
    				
    			}

    		}
		});
    });
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Farmer.findById(id, function(err, user) {
    done(err, user);
  });
});


app.post('/signin',

  passport.authenticate('local', { 
  								failureRedirect: '/',
                                failureFlash: true }),
 	

 	 function(req,res){

 	 	// console.log(req.body)

 	 	// console.log(req.body.password)

 	 	Farmer.findOne({name: req.body.username}).then(function(result){

 	 		res.send(req.body)

 	 	})

 	 	// res.send(req.body)

 		console.log('ho gya')

  });

app.get('/welcome' , (req,res) => {

	res.send("you are logged in successfully")


})
app.post('/signup', (req,res) => {

	console.log(req.body);

	bcrypt.genSalt(10, function(err, salt) {

    bcrypt.hash(req.body.password, salt, function(err, hash) {

        // Store hash in your password DB.

        	const Farmer = require('./models/farmer')

				var newfarmer = new Farmer({

					name: req.body.name,
					aadhar: req.body.aadhar,
					state: req.body.state,
					district: req.body.district,
					password: hash,
					pincode: req.body.pincode,

					})

					newfarmer.save(function(err){

						if (err){
						console.log(err)
						}
						else
							console.log("saved successfully")

					})
		    });

	})

					

					// 	Farmer.findOne({district:'patna'}).then(function(result,done){

					// 	console.log('patna wale' + result)

					// 	if (result.state === 'fldfk')
					// 	{
					// 		console.log(result.name)
					// 	}


					// mongoose.connection.collections.farmers.drop(function(){

					// 	console.log("dropped collection")

					// })

					// 	done()

					// })

					// done()
				


					res.send('Toh tera naam h ' + req.body.name + ' to ab se tera naam h tatti ' )

});


app.listen(3000, (err) => {
	if (err)
		throw err;
	else {
		console.log("your server running on port 3000 on 127.0.0.1 known as the localhost")}
})


					// mongoose.connection.collections.farmers.drop(function(){

					// 	console.log("dropped collection")

					// })
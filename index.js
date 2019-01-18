const mocha = require('mocha')

const assert = require('assert')

const express = require('express')
const app = express()

const path = require('path')

const flash = require('connect-flash')

var bcrypt = require('bcryptjs') 

const faker = require('faker')

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  console.log('listening on :' + port);
});

app.set('view engine', 'ejs');

/// socket.io block starts




var io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {

	console.log('user connected')
	

  
	socket.on('trytest' , function(arg){
		io.sockets.emit('trytest' , arg)	
	})
	

	socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

 		socket.broadcast.emit('userjoinedthechat',userNickname +" : has   joined the chat ");
    })


	socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //log the message in console 

		    console.log(senderNickname+" : " +messageContent)

      //create a message object 
      
     		 let  message = {"message":messageContent, 
                      "senderNickname":senderNickname}
        
// send the message to all users including the sender  using io.emit  
       
     		 io.emit('message', message )
     
      })

     socket.on('disconnect', function() {

        // console.log(userNickname +' has left ')

        socket.broadcast.emit( "userdisconnect" ,' user has left')

    })

})

/// socket.io block ends

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

/// models imported here


const Farmer = require('./models/farmer')

const State = require('./models/state')

const Crop = require('./models/crop')

const Godown = require('./models/godown')

const Customer = require('./models/customer')

const Ration = require('./models/ration')

const Complaint = require('./models/complaint')

const Student = require('./models/student')

/// connection to database done here


/////// TESTING AND DATA GENERATION BLOCK
		



	const states = [
   "Andhra Pradesh",
   "Arunachal Pradesh",
   "Assam",
   "Bihar",
   "Chhattisgarh",
   "Chandigarh",
   "Dadra and Nagar Haveli",
   "Daman and Diu",
   "Delhi",
   "Goa",
   "Gujarat",
   "Haryana",
   "Himachal Pradesh",
   "Jammu and Kashmir",
   "Jharkhand",
   "Karnataka",
   "Kerala",
   "Madhya Pradesh",
   "Maharashtra",
   "Manipur",
   "Meghalaya",
   "Mizoram",
   "Nagaland",
   "Orissa",
   "Punjab",
   "Pondicherry",
   "Rajasthan",
   	"Sikkim",
   "Tamil Nadu",
   "Tripura",
   "Uttar Pradesh",
  	"Uttarakhand",
   "West Bengal"
]

	/// generating state data for crop msps

	// const crops = ['wheat' , 'paddy' , 'dal', 'bajra', 'maize' , 'gram', 'moong', 'urad', 'soyabean']
	
	// for (var j =0 ; j < states.length ; j++){

	// 	var x = []

	// 	for (var i = 0 ; i < crops.length ; i++)
	// 	{
	// 		var obj = {
	// 			"name" : crops[i],
	// 			"rate" : faker.random.number({'min':10,'max':30})
	// 		}
	// 		x.push(obj)
	// 	}
	// 	var newState = new State({
	// 		name : states[j],
	// 		crops : x
	// 	})
	// 	console.log(x)
	// 	newState.save(function(err){
	// 		if (err)
	// 			throw err
	// 		else 
	// 			console.log( states[j] )
	// 	})
	// }

		/// generating state data finished 

		/// generating crop rates

		// for (var i =0 ; i< crops.length; i++)
		// {
		// 	var newCrop = new Crop({

		// 		"name" : crops[i],
		// 		"rate" : faker.random.number({'min':10,'max':30})

		// 	})
		// 	console.log(newCrop)
		// 	newCrop.save(function(err){

		// 		if (err)
		// 			throw err
		// 		else
		// 			console.log("successfully saved crops")
		// 	})
		// }

		/// generating crop rates successfully done 

		//// generating complaint segment

		// var newComplaint = new Complaint({
		// 		role : 1,
		// 		aadhar: 234532345,
		// 		content: "content h",
		// 		type : "badmashi"
		// })
		// newComplaint.save(function(err){

		// 	if (err)
		// 		throw err
		// 	else
		// 		console.log("complaint successfully registered")

		// })

		//// generated complaint segment over






///// testing area ends


//// connection to database section

mongoose.connect('mongodb://admin:123456a@ds129593.mlab.com:29593/pragyanhackathon',{ useNewUrlParser: true },)

// mongoose.connect('mongodb://localhost/pragyanhackathon1',{ useNewUrlParser: true })

mongoose.connection.once('open',function(){

console.log("Connection is established successfully")

}).on('error',function(error){

	console.log('Connection error',error)

})

//// connection to database done ok 200


app.get('/', (req,res) => {

	res.sendFile(path.join(__dirname +'/landing-folder/index.html'));

})

app.post('/aman' , (req,res) => {
	
	console.log("aman post ka ho gya")
	if (req.body)
	{
	const obj = { "status" : "ok" }
	const newStudent = new Student({

		studentName : req.body.studentName,
		id : req.body.id

	})

	newStudent.save(function(err){

		if (err)
			throw err
		else
			console.log("saved student")
	})

	res.writeHead(404);
	res.end();
	}

	res.send(404).end();
})

app.get('/amans' , (req,res) => {

	res.sendFile(path.join(__dirname + '/xyz.html'))

})
// app.get('/ejs' , (req,res) => {

// 	// res.render('pages/indexo', {user : 'abhishek'})
// 	State.find({}).then()
// 	var t = {"users" : [
//             { "name": 'John' },
//             { name: 'Mike' },
//             { name: 'Samantha' }
//   	]}

// 	res.render('pages/index', t);
// })

///// sign in or sign up pages according to consumer type

app.get('/sign_farmer' , (req,res) => {

	res.sendFile(path.join(__dirname +'/frontend/sign_farmer.html'));

})


app.get('/sign_consumer' , (req,res) => {

	res.sendFile(path.join(__dirname +'/frontend/sign_customer.html'));

})


app.get('/sign_godown' , (req,res) => {

	res.sendFile(path.join(__dirname +'/frontend/sign_godown.html'));

})



app.get('/sign_vendor' , (req,res) => {

	res.sendFile(path.join(__dirname +'/frontend/sign_ration.html'));

})

///// end of sign in sign up block

//// passport authentication using local strategy starts

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

      		// console.log('ye wala bcrypt ka h ' + res)

    		if (err)
    		{
    			throw err
    			// console.log('err wala h')
    		}

    		else{

    			// console.log('else wala block h ' + res)
    			if (res){
    				return done(null,user)
    				// console.log('res wala true h')
    			}
    			else{
    				// console.log('res wala false h')
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

/// paasport js block ends here 


app.post('/signin', function(req,res){

  // passport.authenticate('local', { 
  // 								failureRedirect: '/',
  //                               failureFlash: true }),
 	

 	//  function(req,res){

 	//  	// console.log(req.body)

 	//  	// console.log(req.body.password)

 	//  	Farmer.findOne({name: req.body.username}).then(function(result){
 	//  		// Farmer.find({"aadhar": { $gt: 11234565} } ).then(function(result){

 	//  		res.send('Hey there...'+req.body.username + '!!! U know Abhishek loves u..Thanks for signing in')

 	//  		res.send(result);
 	//  	})

 	//  	// res.send(req.body)

 	// 	// console.log('ho gya')
 	console.log(req.body)
 	res.send(req.body)

});


// app.get('/' , (req,res) => {

// 	// res.send("fdfd")
// 	res.sendFile(path.join(__dirname + '/frontend/sign_farmer.html'))

// })


app.get('/welcome' , (req,res) => {



	// res.sendFile(path.join(__dirname +'/frontend/xx.html'));
	// var newfarmer = new Farmer({

	// 	name: "abhishek",
	// 	aadhar: 12234567,
	// 	state: [ "tn" , "bihar" , "up"]
	// })

	// newfarmer.save(function(err){
	// 	if (err)
	// 		throw err
	// 	else
	// 		console.log("saved successfully")
	// })
	// Farmer.find({}).then(function(result){

	// 	var x = []
	// 	for (var i = 0 ; i < result.length ; i++)
	// 	{
	// 		console.log(result[i].state)
	// 		x.push(result[i].name)
	// 		// console.log()
	// 	}
	// 	// res.send(x)		
	// })

	var newState = new State({

		name : "bihar",
		crops : [ { name : "wheat" , rate : 120}, 

					{ name : "rice" , rate : 130 }
					]

	})

	// var newCrop = new Crop({
	// 	name : "wheat",
	// 	rate : 15
	// })

	newState.save(function(err){

		if (err)
			throw err
		else
			console.log("successfully saved")

	})


	State.find({name:"bihar"}).then(function(result){

		var x = []

		for (var i = 0 ; i < result.length ; i++)
		{
			for (var j = 0 ; j < result[i].crops.length ; j++)
			{
					x.push(result[i].crops[j].rate)
			}
		}
		res.send(x)


	// })
	// mongoose.connection.collections.states.drop().then(function(){

	// 	console.log("successfully dropped states table")
	// })
	// res.download('./mozilla.pdf')
})
})


/// download section


app.get('/downloads/download' , (req,res) => {

	res.download('./mozilla.pdf')

})

/// download section ends here

//// signup 

app.post('/signup', (req,res) => {

	// console.log(req.body);

		bcrypt.genSalt(10, function(err, salt) {

    		bcrypt.hash(req.body.password, salt, function(err, hash) {
    			console.log(req.body.role)
    			if (req.body.role === 'customer'){

    				console.log(req.body)
    				console.log(hash)

	    			var newCustomer = new Customer({

							name : req.body.name,
							aadhar: req.body.aadhar,
							contact: req.body.contact,
							district : req.body.district,
							state : req.body.state,
							rationno: req.body.rationno,
							annualincome : req.body.annualincome,
							password : req.body.password,
							pincode: req.body.pincode
						   
						   })

	    				newCustomer.save(function(error){

	    					if (error)
	    						throw error
	    					else
	    						console.log("customer saved successfully")

	    				})
	    				res.send(req.body)
	    			}

	    		else if (req.body.role === 'farmer')
	    		{
	    			var newFarmer = new Farmer({


									name: req.body.name,
									aadhar: req.body.aadhar,
									contact: req.body.contact,
									district: req.body.district,
									state: req.body.state,
									password: req.body.password,
									pincode: req.body.pincode,
									typeofcrop : req.body.typeofcrop
							})

						newFarmer.save(function(error){


	    					if (error)
	    						throw error
	    					else
	    						console.log("farmer saved successfully")
						})
	    			res.send(req.body)
	    		}	

	    		else if (req.body.role === 'godown')
	    		{
	    			var newGodown = new Godown({
							
							name : req.body.name,
							aadhar: req.body.aadhar,
							contact: req.body.contact,
							district : req.body.district,
							state : req.body.state,
							password : req.body.password,
							pincode: req.body.pincode,
							location : req.body.location,
							capacity : req.body.capacity

							})

						newGodown.save(function(error){

	    					if (error)
	    						throw error
	    					else
	    						console.log("godown saved successfully")
						})
	    			res.send(req.body)
	    		}

	    		else if (req.body.role === 'ration')
	    		{
	    			var newRation = new Ration({
														
								name : req.body.name,
								aadhar: req.body.aadhar,
								contact: req.body.contact,
								district : req.body.district,
								state : req.body.contact,
								password : req.body.password,
								pincode: req.body.pincode,
								location : req.body.location,
								houses : req.body.houses

							})

						newRation.save(function(error){

	    					if (error)
	    						throw error
	    					else
	    						console.log("ration saved successfully")
						})
	    			res.send(req.body)
	    		}


		    });

		})

		// res.send('Bhai/Behen,\n' + req.body.name + 'You have signed up for abhishek')

});

/// admin

app.get('/admin', (req,res) => {

	res.sendFile(path.join(__dirname + '/Login_v9/index.html'))


})

// app.listen(process.env.PORT || 3000, (err) => {
// 	if (err)
// 		throw err;
// 	else {
// 		console.log("your server running on port 3000 on 127.0.0.1 known as the localhost")}
// })


					// mongoose.connection.collections.farmers.drop(function(){

					// 	console.log("dropped collection")

					// })
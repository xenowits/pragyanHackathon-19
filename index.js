const mocha = require('mocha')

// const assert = require('assert')

const express = require('express')
const app = express()

const path = require('path')

const flash = require('connect-flash')

var bcrypt = require('bcryptjs') 

const faker = require('faker')

const helmet = require('helmet')

const async = require('async')

const Promise = require('promise')

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
  console.log('listening on :' + port);
});

app.set('view engine', 'ejs');

app.use(helmet())

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

// var myLocalStrategy1 = require('passport-local').Strategy;
// var myLocalStrategy2 = require('passport-local').Strategy;
// var myLocalStrategy3 = require('passport-local').Strategy;
// var myLocalStrategy4 = require('passport-local').Strategy;

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

	const crops = ['wheat' , 'paddy' , 'dal', 'bajra', 'maize' , 'gram', 'moong', 'urad', 'soyabean']
	
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


// passport.use('local.one', myLocalStrategy1);
// passport.use('local.two', myLocalStrategy2);
// passport.use('local.three', myLocalStrategy3);
// passport.use('local.four', myLocalStrategy4);


passport.use('local.one', new LocalStrategy(

  function(username, password, done) {

    console.log("local strategy 1 m ho tm sb")

      Customer.findOne({ name: username }, function(err, user) {

      if (err) { 
        console.log("err wala h")
        return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if (!user.validPassword(user,password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
      console.log(password === user.password)

      bcrypt.compare(password, user.password, function(err, res) {

          console.log(password === user.password)

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

function isCustomer(user)
{
    Customer.find({name : user.name }).then(function(results){
      console.log("dones")
      if (results.length > 0)
        return true;
      else
        return false
    })
}



passport.serializeUser(function(user, done) {
    
    done(null, user.id)

});

passport.deserializeUser(function(id, done) {

    if (isCustomer(user))
    {
        // done(null,user.id)
        Customer.findById(id, function(err,user){
          done(err,user)
        })
    }
    if (isFarmer(user))
      {
          Farmer.findById(id, function(err,user){
          done(err,user)
        })
      }
      if (isGodown(user))
      {
          Godown.findById(id, function(err,user){
          done(err,user)
        })
      }
      else if (isRation(user))
      {
          Ration.findById(id, function(err,user){
          done(err,user)
        })
      }
  // Farmer.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

/// paasport js block ends here 

// app.post('/signin/customer',

//   passport.authenticate('local.one', { 
//   								failureRedirect: '/',
//                                 failureFlash: true }), function(req,res){

//     res.send(req.body);

// });

app.post('/signin/customer', function(req,res){

            var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Customer.find({name : req.body.name}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();

});

app.post('/signin/farmer', function(req,res){

                var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Farmer.find({name : req.body.name}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();




})


app.post('/signin/godown', function(req,res){

              var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Godown.find({name : req.body.name}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();

});

app.post('/signin/ration', function(req,res){

              var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Ration.find({name : req.body.name}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();

});

app.get('/signin' , (req,res) => {

  if (req.body.role == 1)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Farmer.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }
  
    if (req.body.role == 2)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Godown.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }
          if (req.body.role == 3)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Ration.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }

          if (req.body.role == 4)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Customer.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }

})

app.get('/profile' , (req,res) => {

  console.log(typeof req.query.role)

  if (req.query.role == 1)
  {
    console.log(req.query)
            let result;
            let ob;

            async function kk(result)
            {
                console.log("yeha aw" + result)
            }
            async function jh()
            {
              // console.log(req.query.aadhar)
               result = await Farmer.find({ aadhar : req.query.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
              let hyr = await kk(result)
            }
            async function ko()
            {

                let p = await jh();
                ob = { "name" : result[0].name , "aadhar" : result[0].aadhar , "contact" : result[0].contact , "district" : result[0].district , "state" : result[0].state}
                console.log("fdf" + result)
            }
            async function main()
            {
                
                await ko();
                console.log(result[0].state)
                res.send(ob)
            }
            main();
  }    
    if (req.query.role == 2)
  {
    console.log(req.query)
            let result;
            let ob;

            async function kk(result)
            {
                console.log("yeha aw" + result)
            }
            async function jh()
            {
              // console.log(req.query.aadhar)
               result = await Godown.find({ aadhar : req.query.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
              let hyr = await kk(result)
            }
            async function ko()
            {

                let p = await jh();
                ob = { "name" : result[0].name , "aadhar" : result[0].aadhar , "contact" : result[0].contact , "district" : result[0].district , "state" : result[0].state}
                console.log("fdf" + result)
            }
            async function main()
            {
                
                await ko();
                console.log(result[0].state)
                res.send(ob)
            }
            main();
  }
    if (req.query.role == 3)
  {
    console.log(req.query)
            let result;
            let ob;

            async function kk(result)
            {
                console.log("yeha aw" + result)
            }
            async function jh()
            {
              // console.log(req.query.aadhar)
               result = await Vendor.find({ aadhar : req.query.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
              let hyr = await kk(result)
            }
            async function ko()
            {

                let p = await jh();
                ob = { "name" : result[0].name , "aadhar" : result[0].aadhar , "contact" : result[0].contact , "district" : result[0].district , "state" : result[0].state}
                console.log("fdf" + result)
            }
            async function main()
            {
                
                await ko();
                console.log(result[0].state)
                res.send(ob)
            }
            main();
  }

    if (req.query.role == 4)
  {
    console.log(req.query)
            let result;
            let ob;

            async function kk(result)
            {
                console.log("yeha aw" + result)
            }
            async function jh()
            {
              // console.log(req.query.aadhar)
               result = await Customer.find({ aadhar : req.query.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
              let hyr = await kk(result)
            }
            async function ko()
            {

                let p = await jh();
                ob = { "name" : result[0].name , "aadhar" : result[0].aadhar , "contact" : result[0].contact , "district" : result[0].district , "state" : result[0].state}
                console.log("fdf" + result)
            }
            async function main()
            {
                
                await ko();
                console.log(result[0].state)
                res.send(ob)
            }
            main();
  }
})


app.post('/welcome' , (req,res) => {

  console.log(req.body);

})


/// download section


app.get('/downloads/download' , (req,res) => {

	res.download('./mozilla.pdf')

})

/// download section ends here

//// SIGNUP BLOCK 

// var x = "fdfdf";

app.post('/signup', (req,res) => {

	// console.log(req.body);

		bcrypt.genSalt(10, function(err, salt) {

    		bcrypt.hash(req.body.password, salt, function(err, hash) {

    			console.log(req.body.role)

    			if (req.body.role === 'customer' || req.body.role  == 4){

    				// console.log(req.body)
    				// console.log(hash)
            var x ;
            var newCustomer;
            async function kk(result){
              x = result._id.toString();
            }
            async function jh()
            {
               let result = await Ration.findOne({state : req.body.state , district : req.body.district}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(result)
               return x;
            }

	    				async function s(){
                let p = await jh()
                // console.log(newCustomer)
                console.log("g m h" + x + p)
                newCustomer = new Customer({

                      name : req.body.name,
                      aadhar: req.body.aadhar,
                      contact: req.body.contact,
                      district : req.body.district,
                      state : req.body.state,
                      rationno: req.body.rationno,
                      annualincome : req.body.annualincome,
                      password : hash,
                      pincode: req.body.pincode,
                      // rationid : x,
                      nearestrationshop : x

               })

                newCustomer.save(function(error){

	    					if (error)
	    						throw error
	    					else
	    						console.log("customer saved successfully")

	    				})

              }
              s().then(function(result){
                res.send("true")
              })
	    				
              // res.redirect('/sign_customer')
	    			}

	    		else if (req.body.role === 'farmer' || req.body.role == 1)
	    		{
            var x
            async function k(results){
                console.log('kya hua' + results[0])
                    for (var i = 0 ; i < 1 ; i++)
                    {

                        // x.push({"id" : results[i]._id.toString()})
                        if (results[i]){
                            x = results[i]._id.toString();
                            console.log(results[i]._id.toString())
                          }
                          else
                          {
                            x = ""
                          }
                        
                    }
            }
               async function g(){ 

                 let results = await Godown.find({state : req.body.state , district : req.body.district})
                 console.log('length ' + results.length)
                  let hyr = await k(results);
                  // console.log(x);
                  return x;
               }
            
           function main(){ 

            var promise = g();

            promise.then(function(result){

                // console.log(typeof x[0])
                // console.log(Array.isArray(x))
                var newFarmer = new Farmer({

                  name: req.body.name,
                  aadhar: req.body.aadhar,
                  contact: req.body.contact,
                  district: req.body.district,
                  state: req.body.state,
                  password: hash,
                  pincode: req.body.pincode,
                  typeofcrop : req.body.typeofcrop,
                  nearestgodownid : x
              })

                newFarmer.save(function(error){

                if (error)
                  throw error
                else
                  console.log("farmer saved successfully " + newFarmer )
            })
                // return newFarmer
                res.send(x)
            })
          }

          main();

	    		}	

	    		else if (req.body.role === 'godown'  || req.body.role == 2)
	    		{

            let arr1 = {"wheat" : 1000, "paddy" : 1000 , "dal" : 1000, "bajra" : 1000, "maize" : 1000, "gram" : 1000, "moong": 1000, "urad": 1000, "soyabean" : 1000}
            let arr2 = {"wheat" : 100, "paddy" : 100 , "dal" : 100, "bajra" : 100, "maize" : 100, "gram" : 100, "moong": 100, "urad": 100, "soyabean" : 100}

            async function main(){

	    			var newGodown = new Godown({
							
							name : req.body.name,
							aadhar: req.body.aadhar,
							contact: req.body.contact,
							district : req.body.district,
							state : req.body.state,
							password : hash,
							pincode: req.body.pincode,
							location : req.body.location,
							capacity : req.body.capacity,
              listofvendors : [],
              listofcustomers : [],
              stockofcrops : arr1,
              cropstogiveeachtime : arr2,
              farmerrequests : []

							})

						newGodown.save(function(error){

	    					if (error)
	    						throw error
	    					else
	    						console.log("godown saved successfully")
						})
	    			res.send(req.body)
	    		}

}
	    		else if (req.body.role === 'ration' || req.body.role == 3)
	    		{

          var x = [];
          var y;

          async function k(result){
            console.log(result)
              if (result)
                  y = result.name

            // async function r(result){

            //       y = result.

            // }
            return y;
            }
            let removalarray = {"wheat" : 10, "paddy" : 8 , "dal" : 5, "bajra" : 6, "maize" : 7, "gram" : 5, "moong": 9, "urad": 8, "soyabean" : 10}
            let initialstockarray = {"wheat" : 100, "paddy" : 100 , "dal" : 100, "bajra" : 100, "maize" : 100, "gram" : 100, "moong": 100, "urad": 100, "soyabean" : 100}
            async function g(){

              // let results = await Customer.find({state : req.body.state , district : req.body.district})
              let result = await Godown.findOne({state : req.body.state , district : req.body.district})
              let hyr = await k(result)
              // let pro = await r(result)
              return hyr;
            }
            async function main(){

                await g()

                var newRation = new Ration({
                            
                name : req.body.name,
                aadhar: req.body.aadhar,
                contact: req.body.contact,
                district : req.body.district,
                state : req.body.state,
                password : hash,
                pincode: req.body.pincode,
                location : req.body.location,
                houses : req.body.houses,
                assignedgodownid : y,
                listofcustomers : x,
                stockofcrops : initialstockarray,
                cropstogiveeachtime : removalarray
              })

            newRation.save(function(error){

                if (error)
                  throw error
                else
                  console.log("ration saved successfully")
            })

            res.send(req.body)

            }
	         main();
	    			
	    		}


		    });

		})

		// res.send('Bhai/Behen,\n' + req.body.name + 'You have signed up for abhishek')

});

/// admin

app.get('/getmsp' , (req,res) => {

    let x = []
    let rate;
    async function k(result){
      
        for (var i = 0 ; i < result.crops.length ;i++)
        {
          console.log(result.crops[i])
          if (result.crops[i].name == req.query.crop)
          {

            rate = result.crops[i].rate;
            break;
          }
        }
      
    }
    async function g(){

      let result = await State.findOne({name: req.query.name})
      
      let jfj = await k(result)
    
      return jfj
    
    }
    async function ghy()
    {
      let sfd = await g()
    }
    ghy().then(function(result)
    {
      res.send(rate.toString());
    })

})

app.get('/admin', (req,res) => {

	res.sendFile(path.join(__dirname + '/Login_v9/index.html'))

})

app.get('/loadgrainlistforvendor' , (req,res) => {

    /// vendor 

    let resultu;

    async function k(result)
    {
      resultu = result[0].stockofcrops
      console.log(result)
    }
    async function f()
    {

        let result = await Ration.find({aadhar : req.query.aadhar})

        let fdf = await k(result)

        return fdf

    }

    async function main()
    {
      let dfdf = await f()
      
    }

    main().then(function(result){
      res.send(resultu)
    });

})

app.get('/loadcustomerlistforvendor' , (req,res) => {

        let resultu;

    async function k(result)
    {
      resultu = result[0].listofcustomers
      console.log(result)
    }
    async function f()
    {

        let result = await Ration.find({aadhar : req.query.aadhar})

        let fdf = await k(result)

        return fdf

    }

    async function main()
    {
      let dfdf = await f()
      
    }

    main().then(function(result){
      res.send(resultu)
 });


})


app.get('/loadfarmerlistforgodown' , (req,res) => {

          let resultu;

    async function k(result)
    {
      resultu = result[0].listoffarmers
      console.log(result)
    }
    async function f()
    {

        let result = await Godown.find({aadhar : req.query.aadhar})

        let fdf = await k(result)

        return fdf

    }

    async function main()
    {
      let dfdf = await f()
      
    }

    main().then(function(result){
      res.send(resultu)
 });

})


app.get('/loadvendorlistforgodown' ,(req,res) => {

    let resultu;

    async function k(result)
    {
      resultu = result[0].listofvendors
      console.log(result)
    }
    async function f()
    {

        let result = await Godown.find({aadhar : req.query.aadhar})

        let fdf = await k(result)

        return fdf

    }

    async function main()
    {
      let dfdf = await f()
      
    }

    main().then(function(result){
      res.send(resultu)
 });

})

app.get('/nearestvendor' ,(req,res) => {


    let resultu;

    async function k(result)
    {
      resultu = result[0].nearestrationshop
      console.log(result)
    }
    async function f()
    {

        let result = await Customer.find({aadhar : req.query.aadhar})

        let fdf = await k(result)

        return fdf

    }

    async function main()
    {
      let dfdf = await f()
      
    }

    main().then(function(result){
      res.send(resultu)
   });


})

app.get('/nearestgodown' , (req,res) => {

    let resultu;

    async function k(result)
    {
      resultu = result[0].nearestgodownid
      console.log(result)
    }
    async function f()
    {

        let result = await Farmer.find({aadhar : req.query.aadhar})

        let fdf = await k(result)

        return fdf

    }

    async function main()
    {
      let dfdf = await f()
      
    }

    main().then(function(result){
      res.send(resultu)
 });


})


app.get('/loadrationforgodown' , (req,res) => {

    


})
////// bht kaam h 

// app.post('/requestfromfarmertogodown' ,(req,res) => {

//       // farmer ki trf se 

//     let resultu;
//     async function tr(result)
//     {
//         let xx = 
//     }
//     async function k(result)
//     {
//       resultu = result[0].nearestgodownid
//       let afd = await tr(resultu)
//       console.log(resultu)
//     }
//     async function f()
//     {

//         let result = await Farmer.find({aadhar : req.query.aadhar})

//         let fdf = await k(result)

//         return fdf

//     }

//     async function main()
//     {
//       let dfdf = await f()
      
//     }

//     main().then(function(result){
//       res.send(resultu)
//  });

// })
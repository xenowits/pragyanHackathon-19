const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema banega neeche

// const BookSchema = new Schema({
// 	title: String,
// 	pages: Number,
// })

const GodownSchema = new Schema({

	id : String

})

const FarmerSchema = new Schema({

	name: String,
	aadhar: String,
	contact: String,
	district: String,
	state: String,
	password: String,
	pincode: Number,
	typeofcrop : String,
	nearestgodownid : String
})

// const AuthorSchema = new Schema({
// 	name: String,
// 	age: Number,
// 	books: [BookSchema]
// })

//ab model bnega

const Farmer = mongoose.model('farmer',FarmerSchema)

FarmerSchema.methods.validPassword = function(user,password){

	Farmer.findOne({name : user}).then(function(result){

		return (result.password === password)

	})

}

module.exports = Farmer;


  //      if (req.body.role === 2)
  // {
  //                 var x = []

  //           async function kk(results){
  //                 for(var i = 0 ; i < results.length ; i++)
  //                 {
  //                   x.push(results[i].password)
  //                 }
  //           }
  //           async function jh()
  //           {
  //              let results = await Farmer.find({ aadhar : req.body.aadhar}, function(err,vendor){
  //                     if (err)
  //                       throw err;
  //               })
  //              let hyr = await kk(results)
  //              return x;
  //           }
  //           let ggg = false; 
  //           async function df(){
  //             for (var i = 0 ; i < x.length ;i++)
  //               {
  //                 const match = await bcrypt.compare(req.body.password,x[i])
  //                 if (match)
  //                 {
  //                   res.send("OK")
  //                   ggg = true
  //                   break;
  //                 }
  //               }
  //           }

  //           async function main()
  //           {
                
  //               let p = await jh();
  //               console.log(x.length)
  //               await df()
  //               if (!ggg)
  //                 res.redirect('/');
  //           }
  //           main();
  // } 
  


  //   if (req.body.role === 2)
  // {
  //                 var x = []

  //           async function kk(results){
  //                 for(var i = 0 ; i < results.length ; i++)
  //                 {
  //                   x.push(results[i].password)
  //                 }
  //           }
  //           async function jh()
  //           {
  //              let results = await Godown.find({ aadhar : req.body.aadhar}, function(err,vendor){
  //                     if (err)
  //                       throw err;
  //               })
  //              let hyr = await kk(results)
  //              return x;
  //           }
  //           let ggg = false; 
  //           async function df(){
  //             for (var i = 0 ; i < x.length ;i++)
  //               {
  //                 const match = await bcrypt.compare(req.body.password,x[i])
  //                 if (match)
  //                 {
  //                   res.send("OK")
  //                   ggg = true
  //                   break;
  //                 }
  //               }
  //           }

  //           async function main()
  //           {
                
  //               let p = await jh();
  //               console.log(x.length)
  //               await df()
  //               if (!ggg)
  //                 res.redirect('/');
  //           }
  //           main();
  // }

  //   if (req.body.role === 3)
  // {
  //                 var x = []

  //           async function kk(results){
  //                 for(var i = 0 ; i < results.length ; i++)
  //                 {
  //                   x.push(results[i].password)
  //                 }
  //           }
  //           async function jh()
  //           {
  //              let results = await Ration.find({ aadhar : req.body.aadhar}, function(err,vendor){
  //                     if (err)
  //                       throw err;
  //               })
  //              let hyr = await kk(results)
  //              return x;
  //           }
  //           let ggg = false; 
  //           async function df(){
  //             for (var i = 0 ; i < x.length ;i++)
  //               {
  //                 const match = await bcrypt.compare(req.body.password,x[i])
  //                 if (match)
  //                 {
  //                   res.send("OK")
  //                   ggg = true
  //                   break;
  //                 }
  //               }
  //           }

  //           async function main()
  //           {
                
  //               let p = await jh();
  //               console.log(x.length)
  //               await df()
  //               if (!ggg)
  //                 res.redirect('/');
  //           }
  //           main();
  // }

  // if (req.body.role === 4)
  // {
  //                 var x = []

  //           async function kk(results){
  //                 for(var i = 0 ; i < results.length ; i++)
  //                 {
  //                   x.push(results[i].password)
  //                 }
  //           }
  //           async function jh()
  //           {
  //              let results = await Customer.find({ aadhar : req.body.aadhar}, function(err,vendor){
  //                     if (err)
  //                       throw err;
  //               })
  //              let hyr = await kk(results)
  //              return x;
  //           }
  //           let ggg = false; 
  //           async function df(){
  //             for (var i = 0 ; i < x.length ;i++)
  //               {
  //                 const match = await bcrypt.compare(req.body.password,x[i])
  //                 if (match)
  //                 {
  //                   res.send("OK")
  //                   ggg = true
  //                   break;
  //                 }
  //               }
  //           }

  //           async function main()
  //           {
                
  //               let p = await jh();
  //               console.log(x.length)
  //               await df()
  //               if (!ggg)
  //                 res.redirect('/');
  //           }
  //           main();
  // }
  //   res.send("fdfd");   
  

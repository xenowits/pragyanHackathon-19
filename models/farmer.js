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
	aadhar: Number,
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

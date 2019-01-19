const mongoose = require('mongoose')
const Schema = mongoose.Schema


const GodownSchema = new Schema({

	name : String,
	aadhar: String,
	contact: String,
	district : String,
	state : String,
	password : String,
	pincode: Number,
	location : String,
	capacity : Number

})


const Godown = mongoose.model('godown', GodownSchema)

module.exports = Godown


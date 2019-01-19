const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RationSchema = new Schema({

	name : String,
	aadhar: String,
	contact: String,
	district : String,
	state : String,
	password : String,
	pincode: Number,
	location : String,
	houses : Number

})


const Ration = mongoose.model('ration', RationSchema)

module.exports = Ration


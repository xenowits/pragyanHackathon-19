const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({

	id : String


})

const RationSchema = new Schema({

	name : String,
	aadhar: String,
	contact: String,
	district : String,
	state : String,
	password : String,
	pincode: Number,
	location : String,
	houses : Number,
	assignedgodownid : String,
	listofcustomers : [CustomerSchema]
})


const Ration = mongoose.model('ration', RationSchema)

module.exports = Ration


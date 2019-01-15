const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CustomerSchema = new Schema({

	name : String,
	aadhar: Number,
	contact: Number,
	district : String,
	state : String,
	rationno: Number,
	annualincome : Number,
	password : String,
	pincode: Number

})


const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer


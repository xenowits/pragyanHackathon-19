const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CustomerSchema = new Schema({

	name : String,
	aadhar: String,
	contact: String,
	district : String,
	state : String,
	rationno: String,
	annualincome : Number,
	password : String,
	pincode: Number,
	vendor : String

})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer


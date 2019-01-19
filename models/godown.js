const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorSchema = new Schema({

	id : String

})

const CropSchema = new Schema({

	"wheat" : Number,
	 "paddy" : Number,
	 "dal" : Number,
	 "bajra": Number,
	  "maize": Number,
	  "gram": Number,
	  "moong": Number,
	   "urad": Number,
	  "soyabean": Number,

}) 

const RequestSchema = new Schema({

	"crop" : String,
	"quantity" : Number,
	"price" : Number

})

const GodownSchema = new Schema({

	name : String,
	aadhar: String,
	contact: String,
	district : String,
	state : String,
	password : String,
	pincode: Number,
	location : String,
	capacity : Number,
	listofvendors : [VendorSchema],
	listoffarmers : [VendorSchema],
	stockofcrops : CropSchema,
	cropstogiveeachtime : CropSchema,
	farmerrequests : RequestSchema

})


const Godown = mongoose.model('godown', GodownSchema)

module.exports = Godown


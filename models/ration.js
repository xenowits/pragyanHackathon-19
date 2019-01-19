const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({

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
	listofcustomers : [CustomerSchema],
	stockofcrops : CropSchema,
	cropstogiveeachtime : CropSchema
})


const Ration = mongoose.model('ration', RationSchema)

module.exports = Ration


const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ComplaintSchema = new Schema({

	role : {
		type : 'Mixed'},
	aadhar: Number,
	content: String,
	type : String

})


const Complaint = mongoose.model('Complaint', ComplaintSchema)

module.exports = Complaint


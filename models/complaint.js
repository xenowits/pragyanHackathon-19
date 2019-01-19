const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ComplaintSchema = new Schema({

	role : {
		type : 'Mixed'},
	aadhar: String,
	content: String,
	typeofcomplaint : String

})


const Complaint = mongoose.model('Complaint', ComplaintSchema)

module.exports = Complaint


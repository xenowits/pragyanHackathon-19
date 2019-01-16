const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({

	studentName: String,
	id: String

})

const Student = mongoose.model('student', StudentSchema)

module.exports = Student
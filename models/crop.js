const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CropSchema = new Schema({

	name: String,
	rate : Number
})

const Crop = mongoose.model('crop', CropSchema)

module.exports = Crop
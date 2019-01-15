const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CropSchema = new Schema({

	name: String,
	rate : Number
})

const StateSchema = new Schema({

	name : String,
	crops : [CropSchema]

})

const State = mongoose.model('state', StateSchema)

module.exports = State

// module.exports = Crop
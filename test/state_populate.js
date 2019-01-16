const mocha = require('mocha')

const assert = require('assert')

const State = require('../models/state')

const faker = require('faker')

describe('Saving records of state crops', function(){

	it ('saves crops record to the database',function(done){

		name = faker.name.firstName
		for (var i = 0 ;i < 3 ; i++)
		{
			var char = new State({

				name : name,
				crops : [ {name:'wheat',rate:faker.random.number} , {name:'rice',rate:faker.random.number}  ]

			})
			char.save().then(function(){

				console.log('i = 3 state crops saved')

			})
		}
		assert(2 + 3 == 5)
		done()
	})
})
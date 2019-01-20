const express = require('express')
const app = express()

app.set('view engine','ejs')

// app.get('/', function(req,res){

// 	// app.render('ejs')
// 	// res.send('Never Give Up!!!')
// 	res.render('pages/index');
// })


app.get('/', function(req, res) {

    var crops = [{crop: "Wheat", quantity: 12 },
    {crop: "Sugarcane", quantity: 15},
    {crop: "Rice", quantity: 20},
    {crop: "Paddy", quantity: 16}
    ]

    res.render('pages/index', {
        crops: crops
    });
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(6969, function(err){

if (err)
	throw err;
else
	console.log("your app listening on port 6969 of localhost")


})
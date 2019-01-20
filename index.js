const express = require('express')
const app = express()

app.set('view engine','ejs')

// app.get('/', function(req,res){

// 	// app.render('ejs')
// 	// res.send('Never Give Up!!!')
// 	res.render('pages/index');
// })


app.get('/', function(req, res) {

    var customers = [{customer: "Abhishek", aadhaar: 251456369874, district: "gaya"},
    {customer: "Aman", aadhaar: 458796484521, district: "bhimani"},
    {customer: "Anoop", aadhaar: 659843656454, district: "rohtak"},
    {customer: "Dhruv", aadhaar: 784463656354, district: "kanpur nagar"}
    ]

    var crops = [{crop: "Wheat", quantity: 87 },
    {crop: "sugar", quantity: 45},
    {crop: "Rice", quantity: 150}
    ]

    res.render('pages/index', {
        customers: customers,
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
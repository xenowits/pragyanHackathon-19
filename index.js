var express = require('express')
 
var app = express()
 
app.get('/amanchutiya', function(req, res) {
  res.json({notes: "Hi aman....do u have any randi contact number??"})
})
 app.get('/katti', (req,res) => {
 	res.send("tatti... aman tu to muh m le")
 })
app.listen(3000, () => {"Your app is listening on port 3000!!!yay"})
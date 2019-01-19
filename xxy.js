module.exports.foo = function()
{
	      if (req.body.role === 1)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Farmer.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }


  if (req.body.role === 3)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Ration.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }

  if (req.body.role === 4)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Customer.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
 
    	    }
    	          if (req.body.role === 1)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Farmer.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }


  if (req.body.role === 3)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Ration.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
  }

  if (req.body.role === 4)
  {
                  var x = []

            async function kk(results){
                  for(var i = 0 ; i < results.length ; i++)
                  {
                    x.push(results[i].password)
                  }
            }
            async function jh()
            {
               let results = await Customer.find({ aadhar : req.body.aadhar}, function(err,vendor){
                      if (err)
                        throw err;
                })
               let hyr = await kk(results)
               return x;
            }
            let ggg = false; 
            async function df(){
              for (var i = 0 ; i < x.length ;i++)
                {
                  const match = await bcrypt.compare(req.body.password,x[i])
                  if (match)
                  {
                    res.send("OK")
                    ggg = true
                    break;
                  }
                }
            }

            async function main()
            {
                
                let p = await jh();
                console.log(x.length)
                await df()
                if (!ggg)
                  res.redirect('/');
            }
            main();
 }
    }

    
// app.listen(process.env.PORT || 3000, (err) => {
//  if (err)
//    throw err;
//  else {
//    console.log("your server running on port 3000 on 127.0.0.1 known as the localhost")}
// })


          // mongoose.connection.collections.farmers.drop(function(){

          //  console.log("dropped collection")

          // })




//   passport.use(new LocalStrategy(function(username, password, done) {
//   Model1.findOne({ username : username }, function(err, user) {
//     // first method succeeded?
//     if (!err && user && passwordMatches(...)) {
//       return done(null, user);
//     }
//     // no, try second method:
//     Model2.findOne({ name : username }, function(err, user) {
//       // second method succeeded?
//       if (! err && user && passwordMatches(...)) {
//         return done(null, user);
//       }
//       // fail! 
//       done(new Error('invalid user or password'));
//     });
//   }); 
// }));
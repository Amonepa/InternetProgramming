const express = require('express')
const app = express()
console.log('App started successfully')
app.get('/test', function (req, res) {
    console.log('get testGet')
	res.send('ok')
   
})
 

app.listen(3000)

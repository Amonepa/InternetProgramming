const express = require('express')
const app = express()
 
app.post('/newChatPush', function (req, res) {
  res.send('Hello World')
})
 
app.listen(1913)
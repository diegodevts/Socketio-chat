const express = require('express')
const path = require('path')
const port = 3333
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req,res)=>{
  res.render('index.html')
})

let m = []
io.on('connection', socket => {
  console.log("socket conectado ")

  socket.on('sendMessage', msg =>{

    m.push(msg)
    socket.broadcast.emit('receivedMessage', msg)
  })
  
})

server.listen(port)
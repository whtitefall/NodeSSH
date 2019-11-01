const express = require('express')
var readline = require('readline')
var Client = require('ssh2').Client;
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

require('dotenv').config()

const port = process.env.PORT || 3000 


app.set('view engine','html')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/',(req,res)=>{

    res.render('index')
})




var conn = new Client();
conn.connect({
  host: process.env.HOST, 
  port:process.env.APPPORT,
  username: process.env.APPNAME, 
  password: process.env.PASSWORD
});


conn.on('ready',()=>{
    
  console.log('Client :: ready');


  //var rl = readline.createInterface(process.stdin, process.stdout)
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('OUTPUT: ' + data);
    })


  io.on('connection',(socket)=>{


    console.log("Connection success !")

    socket.on('command',(text,callback)=>{
 
      callback('Server received command')
      stream.write(text.command + '\n')

    })


    socket.on('disconnect',()=>{
      console.log('Socket disconnect !')
    })

  })
  

  })

})








// rl.on('line', function (command) {
//   // send data to through the client to the host

//   stream.write(command.trim() + '\n')


// });



// app.listen(port, ()=>{

//     console.log(`server runnning on ${port}`)
// })


server.listen(port,()=>{
  console.log(`Server is up on port ${port}`)
})


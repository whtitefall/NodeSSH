var Client = require('ssh2').Client;
var path = require('path')
require('dotenv').config()

var conn = new Client();
conn.connect({
  host: process.env.HOST, 
  port:process.env.APPPORT,
  username: process.env.APPNAME, 
  password: process.env.PASSWORD
});


conn.on('ready', ()=>{
    console.log('Client :: ready');

    conn.sftp((err,stream) => {
        if(err) throw err 
        
        stream.fastGet('/root/txt.231',path.join(__dirname,'test.txt') ,(err)=>{
            if(err) throw err 
            console.log('success')
        })

        stream.fastPut(path.join(__dirname,'test.txt'),'/root/test.txt', (err)=>{
            if(err) throw err 
            console.log('success')
            conn.end()
        })


    })

})
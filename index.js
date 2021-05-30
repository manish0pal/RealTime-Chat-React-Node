// const app = require('express')()
// const http = require('http').createServer(app)
// const io = require('socket.io')((http,{cors:"*"}))


// // {
// //     cors:{
// //         origin:"http://192.168.56.1:3000/",
// //         methods: ["GET", "POST"],
// //         allowedHeaders: ["my-custom-header"],
// //         credentials: true
// //     }
// // }
// io.on('connection',socket => {
//     console.log('new User')
//     socket.on('message',({name,message})=>{
//         io.emit('message',{name,message})
//     })
// })

// http.listen(4000,() => {
// console.log('listening on port 4000')
// })

const app = require('express')();
// const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server,{cors:"*"});

server.listen(4000,()=>{
    console.log(4000)
})
io.on('connection',(socket)=>{
    console.log("user-ID: "+socket.id)
    socket.on('message',({name,message})=>{
         io.emit('message',{name,message})
     })
})
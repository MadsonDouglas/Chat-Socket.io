const express = require('express');
const path = require('path');

const app = express();  
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var Log = require('log'), log = new Log('debug');


app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/',(req, res)=>{
    res.render('index.html');
});


var clients = {}; 


io.on("connection", function (client) {  
    client.on("join", function(name){
    	console.log(name+" entrou!");
        clients[client.id] = name;
        client.emit("update", "Você está conectado ao bate-papo.");
        client.broadcast.emit("update", name + " juntou-se ao bate-papo.")
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("gravando",(id, cont, img)=>{
        if(cont%2 != 0){
            console.log(clients[id]+" está gravando!");
            client.broadcast.emit("gravando", img);
        }else{
            console.log(clients[id]+" não está gravando");
        }
    })

    client.on("disconnect", function(){
    	console.log(clients[client.id]+": Disconectado");
        io.emit("update", clients[client.id] + " saiu do bate-papo.");
        delete clients[client.id];
    });
});

server.listen(3000, function(){
  console.log('acesse: "http://localhost:3000"');
});

// let msgs = [];
// let usersON = [];
// let id;
// io.on('connection', socket => {
    
//     console.log(`Socket conectado: `+socket.id);

//     socket.emit('msgAnteriores', msgs);

//     socket.on('enviarMensagem', data => {
//         console.log(data);
//         msgs.push(data);
//         socket.broadcast.emit('msgRecebida', data);
//     });
//     socket.on('msg', function(msg) {
//         usersON.push(msg);
//         socket.broadcast.emit('newUser', msg);
//     });

//     socket.on('disconnect', function () {
//         usersON.forEach(element => {
//             if (element.cod == socket.id) {
//                 usersON.splice(element);
//             }
//         });
//         socket.broadcast.emit('usersON', usersON);
        
//         console.log("user disconected: "+socket.id);
//         // socket.broadcast.emit('userDisconect', msg);
//     });
// });

// server.listen(3000);
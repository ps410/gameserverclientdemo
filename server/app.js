var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//how often the server updates the client in milliseconds
var tickrate = 200;

var objectsstate = null;

var obj1 =
    {
        position_x: 0,
        position_y: 0,
    };

var obj2 =
    {
        position_x: 0,
        position_y: 300,
    };

var obj3 =
    {
        position_x: 0,
        position_y: 600,
    };

function randomizePos()
{
    obj1.position_x = Math.floor(Math.random() * 1000);
    obj1.position_y = Math.floor(Math.random() * 1000);

    obj2.position_x = Math.floor(Math.random() * 1000);
    obj2.position_y = Math.floor(Math.random() * 1000);

    obj3.position_x = Math.floor(Math.random() * 1000);
    obj3.position_y = Math.floor(Math.random() * 1000);
}

function tick()
{
    randomizePos();
    objectsstate = {obj1 : obj1, 'obj2' : obj2, 'obj3' : obj3};
}


app.use('/', express.static('html/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
    setInterval(

            function(){
                socket.emit('updatepos', objectsstate);
            }
        ,
        tickrate);
});

setInterval(function(){tick()}, tickrate);
http.listen(port, function(){
    console.log('listening on *:' + port);
});
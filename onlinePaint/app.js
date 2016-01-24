var express = require('express');
var app = express();
var path = require('path');
var server = app.listen(3000);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.sendfile(__dirname+'/index.html');
});

var roomList = {};
var socketMap = {};

io.on('connection',function(socket){

  socket.on('createRoom', function(data){
    var roomid = data.room;
    var user = {
        id: socket.id,
        ip:socket.handshake.address,
        cname: ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)
   }

    console.log(user);

    //把socket 加入房间
    socket.join(roomid);
    socket['roomid'] = roomid;
    socketMap[socket.id] = socket;

    //假如room已经存在，则添加，不存在，则创建
    if(inArray(roomList, roomid)){
        roomList[roomid][user.id] = user;
    }else {
        roomList[roomid] = {};
        roomList[roomid][user.id] = user;
    }

    console.log('^^^^^^^^^^^^^^^^^^')
    console.log(roomList)

    var data_userin = {
        'room':roomList[roomid],
        'user':user
    }
    //给群里所有人广播
    setTimeout(function () {
        socket.broadcast.in(roomid).emit('userIn', data_userin);
        socket.emit('userIn', data_userin);
        console.log('shit    .....')
    }, 500);
  });

  socket.on('drawClick', function(data){
    console.log('draw lick .....')
    console.log(data.brush);
      socket.broadcast.in(socket.roomid).emit('draw', {'brush':data.brush});
  });

  socket.on('say msgs', function(data){
      console.log('say msg..............')
      console.log(data)

      var msg = {
          id: socket.id,
          txt:data.say
      }
      socket.broadcast.in(socket.roomid).emit('say msg', msg);
  })

  socket.on('disconnect', function(){
    var user = {
        id: socket.id,
        ip:socket.handshake.address,
        cname: roomList[roomid][socket.id]['cname']
    }

    var roomid = socket['roomid'];
    delete roomList[roomid][socket.id];

    socket.broadcast.to(socket.roomid).emit('userOut', user);
  });

});

app.listen(app.get('port'), function() {
  console.log('Express started in:'+app.get('env')+' Server started: http://localhost:3000/');
});


function inArray(arr, str){
    for(var index in arr){
        if(index == str){
            return true;
        }
    }
    return false;
}

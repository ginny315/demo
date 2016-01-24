var express = require('express');
var app = express();
var path = require('path');
//var server = require('http').Server(app);
var server = app.listen(3000);
var io = require('socket.io')(server);

//app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.sendfile(__dirname+'/index.html');
});

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

io.on('connection',function(socket){
  socket.emit('news',{hello:'world'});
  socket.on('my other event',function(data){
  	console.log(data);	
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

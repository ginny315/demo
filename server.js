var express = require('express');
var app = express();
var path = require('path');


app.set('port', (process.env.PORT || 4000));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express started in:'+app.get('env')+' Server started: http://localhost:' + app.get('port') + '/');
});

var express =require('express');
var path =  require('path');
var bodyparser= require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app= express();

var port = 3000;
//view Engine 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


//set Static folder
app.use(express.static(path.join(__dirname,'client')));

//Body Parser 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port, function(){
	console.log('server started on port ' + port);
});
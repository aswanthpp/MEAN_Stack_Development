var express=require('express');

var router = express.Router();

var mongojs = require('mongojs');
var db= mongojs('mongoDb url',[{required Collection }])  // Edit then only comiple error 

router.get('/tasks',function(req,res,next){
	//res.send('API are here');

	db.tasks.find(function(err ,tasks){
		if(err){
			res.send(err);
		}
		else{
			res.json(tasks);
		}
	});
});

router.get('/tasks/:id',function(req,res,next){
	

	db.tasks.findOne({_id : mongojs.ObjectId(req.params.id)},function(err ,task){
		if(err){
			res.send(err);
		}
		else{
			res.json(task);
		}
	});
});


// save a task
router.post('/task',function(req,res,next){
	var task = req.body;
	if(!task.title || (task.isDone + '')){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.tasks.save(task, function(err,task){
			if(err){
			res.send(err);
		}
		else{
			res.json(task);
		}
	});
	}
});

// Delete a task 
router.delete('/tasks/:id',function(req,res,next){
	

	db.tasks.remove({_id : mongojs.ObjectId(req.params.id)},function(err ,task){
		if(err){
			res.send(err);
		}
		else{
			res.json(task);
		}
	});
});

//update task
router.put('/tasks/:id',function(req,res,next){
	
var task=req.body;
var updtask={};
if(task.isDone){
	updtask.isDone=task.isDone;
}
if(task.title){
	updtask.title=task.title;
}
if(!updtask){
	res.status(400);
	res.json({
		"error" : "Bad Data"
	});
}
else{
	db.tasks.update({_id : mongojs.ObjectId(req.params.id)},updtask,{}, function(err ,task){
		if(err){
			res.send(err);
		}
		else{
			res.json(task);
		}
	});
}
	
});

 module.exports =router;
const express = require('express');
const router = express.Router();
const mongojs = require("mongojs");
const User = require('../models/user');

router.post('/', (req, res, next) =>
{	
	 
	var newUser = User(req.body);
	console.log(newUser);
	newUser.save(function(err){
		 	if(err) throw err;

		 	console.log(req.body);
		 	res.status(200).send("User Created!");
			
	});
});
router.get('/', (req, res, next) =>
{
	User.find({}, function(err,user){
		if(err) throw err;

		console.log(user);
		res.status(200).send(user);
	});
});
router.get('/checkToAdd/:state', (req, res, next) =>
{ 	var form = {};
	form.state = parseInt(req.params.state); 
	var data = form.state; 
	User.find(form, function(err,result){
		if(err) throw err;

		console.log(result);
		if((Object.keys(result).length)===0){
			res.status(200).send("ok");
		}
		else{
			data = data +""+ result[0].fingerID;
		res.status(200).send(data);
		}
		
	});
});
router.get('/checkIsThere/:fingerID', (req, res, next) =>
{ 	var form = {};
	form.fingerID = parseInt(req.params.fingerID); 
	var data; 
	User.find(form, function(err,result){
		if(err) throw err;

		console.log(result);
		if((Object.keys(result).length)===0){
			res.status(200).send("ok");
		}
		else{

			data=result[0].state;
			data = data +""+ result[0].name;
		res.status(200).send(data);
		var Use ={};
		if(result[0].state===-1){
			Use.state=2;
		}
		else{
			Use.state=1;
		}
		User.findOneAndUpdate(form,Use,function(err,user){
		if(err) throw err;

		console.log("ok");
		
		
	});
		}
		
	});
});
router.patch('/confirmAdding/:state', (req,res,next) =>

{	
	var form = {};
	console.log("arduino");
	console.log(JSON.stringify(req.body));
	form.state = parseInt(req.params.state);
	req.body.state = parseInt(req.body.state);
	var Use =req.body;
	User.findOneAndUpdate(form,Use,function(err,user){
		if(err) throw err;

		console.log("ok");
		res.status(200).send(user);
		
	});
});
router.get('/checkToDelete/:status', (req, res, next) =>
{	var form={};
		form.status = ("true"==req.params.status);
	User.find(form, function(err,user){
		if(err) throw err;

		if((Object.keys(user).length)===0){
			res.status(200).send("no one to delete");
		}
		else{console.log(user);
		res.status(200).send("-1"+user[0].fingerID);}
	});
	User.remove({status:true},(err,user)=>{
		if(err) throw err;
	});
});
router.patch('/deleteUser/:Ssn', (req,res,next) =>

{	
	var form = {};
	form.Ssn = parseInt(req.params.Ssn);
	var Use =req.body;
	Use = {status:true};
	console.log(form.Ssn);
	console.log(Use.status);
	User.findOneAndUpdate(form,Use,function(err,user){
		if(err) throw err;

		console.log("ok");
		res.status(200).send(user);
		
	});
});

module.exports = router;
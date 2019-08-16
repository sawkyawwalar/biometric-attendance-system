const express = require('express');
const router = express.Router();
const mongojs = require("mongojs");
const User = require('../models/userLog');
var json2xls = require('json2xls');
var fs 		= require('fs');
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
router.get('/:status', (req, res, next) =>
{	var form={};
		form.status = ("true"===req.params.status);
	User.find(form, function(err,user){
		if(err) throw err;


		res.status(200).send(user);
		
	
	});
});
router.get('/', (req, res, next) =>
{	var form={};
	User.find(form, function(err,user){
		if(err) throw err;


		res.status(200).send(user);
		
	
	});
});
	router.get('/excel/:status', (req, res, next) =>
{	var form={};
		form.status = ("true"===req.params.status);
	User.find(form, function(err,user){
		if(err) throw err;

		var dat=[{}];
		var loop = (Object.keys(user).length)-1;
		console.log(loop);
		while(loop>-1){
			dat[loop] = {
				name:user[loop].name,
				time_in:user[loop].time_in,
				time_out:user[loop].time_out
			}
			loop--;
		}
		var xls = json2xls(dat);

		fs.writeFileSync('data.xlsx', xls, 'binary');
	res.status(200).send("ok");
	});
});
router.get('/checkInOut/:fingerID', (req, res, next) =>
{	var form={};
		form.fingerID = parseInt(req.params.fingerID);
	User.find(form, function(err,user){
		if(err) throw err;

		if((Object.keys(user).length)>0){
		console.log(user[0].status);
		if((true===user[0].status)){
			res.status(200).send("in"+user[0].name);
		}
		else{
			res.status(200).send("ou"+user[0].name);
		}
		
	}
	});
});
router.patch('/checkInOut/:fingerID', (req,res,next) =>

{	
	var form = {};
	form.fingerID=parseInt(req.params.fingerID);
	req.body.status = ("true"===req.body.status);
	var Use =req.body;
	console.log(Use.status);
	if(Use.status){
		Use.status = false;
		Use.time_in = Date.now();
		Use.time_out = null;
		 console.log("false set");
	}
	else{
		Use.time_out = Date.now();
		Use.status = true;
		console.log("true set");
	}
	console.log(Use.status);
	User.findOneAndUpdate(form,Use,function(err,user){
		if(err) throw err;

		console.log("ok");
		res.status(200).send(user);
		
	});
});
module.exports = router;
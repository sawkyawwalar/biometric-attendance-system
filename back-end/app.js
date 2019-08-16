const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/attendance', (err) =>
	{
		if(err) throw err;
		console.log('Successfully connected to .');
	});
const userRouter = require('./api/routes/user');
const userModel = require('./api/models/user');
const userLogRouter = require('./api/routes/userLog');
const userLogModel = require('./api/models/userLog');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/userLog',userLogRouter);
app.use((error, req, res, next)=>
{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});
app.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
		return
		res.status(200).json({});
	}
	return next();
});
module.exports = app;
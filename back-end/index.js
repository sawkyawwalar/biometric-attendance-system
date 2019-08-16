const express = require("express");
const router = express.Router();
const app=express();
router.get("/index", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
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
module.exports = router;
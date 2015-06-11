var express = require('express');
var router = express.Router();
var Profile = require('../model').Profile;

/* GET home page. */
router.get('/', function(req, res, next) {
	Profile.find()
		   .sort({
		   		likes: -1
		   })
		   .exec(function(err, profiles) {
		   		if(err) console.log(err);

		   		res.render('index', {
		   			profiles: profiles
		   		});
		   });
});


module.exports = router;

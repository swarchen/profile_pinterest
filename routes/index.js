var express = require('express');
var router = express.Router();
var Profile = require('../model').Profile;
var count = 1;
/* GET home page. */
router.get('/', function(req, res, next) {
	Profile.find()
		   .sort({
		   		likes: -1
		   })
		   .limit(10)
		   .exec(function(err, profiles) {
		   		if(err) console.log(err);

		   		res.render('index', {
		   			profiles: profiles
		   		});
		   });
});

router.get('/getmore', function(req, res, next) {
	Profile.find()
		   .sort({
		   		likes: -1
		   })
		   .skip( count * 5 )
		   .limit(5)
		   .exec(function(err, profiles) {
		   		if(err) console.log(err);
		   		count += 1;
		   		console.log(count);
		   		res.json(profiles);
		   });
});

router.post('/:id/like', function(req, res, next){
	var id = req.params.id;

	Profile.update({
		_id: id
	}, {
		$inc: { likes: 1 }
	}, function(err, profile){
		if (err) console.log(err);
		res.json(true);
	});
});

router.post('/:id/dislike', function(req, res, next){
	var id = req.params.id;

	Profile.update({
		_id: id
	}, {
		$inc: { likes: -1 }
	}, function(err, profile){
		if (err) console.log(err);
		res.json(true);
	});
});

module.exports = router;

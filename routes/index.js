var express = require('express');
var router = express.Router();
var Profile = require('../model').Profile;
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

router.post('/getmore', function(req, res, next) {
	var count = req.body.count;
	Profile.find()
		   .sort({
		   		likes: -1
		   })
		   .skip( 10 + count * 5 )
		   .limit(5)
		   .exec(function(err, profiles) {
		   		if(err) console.log(err);
		   		count += 1;
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

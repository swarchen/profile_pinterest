var mongoose = require('mongoose');


//default setting
var config = require('../config/local');

//require schema
var itemSchema = require('./profile').itemSchema(mongoose);


//define model
var Profile = mongoose.model('Profile', itemSchema);


//Exports
exports.Profile = Profile;


//connect to mongoDB
mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.database);
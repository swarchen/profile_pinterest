function itemSchema(mongoose){
	var Schema = mongoose.Schema;

	return new Schema({
		pic: String,
		title: String,
		paragraph: String, 
		likes: {type : Number, default : 0}
	});
}

exports.itemSchema = itemSchema;
var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId;
var suid = require('rand-token').suid;

var userSchema = new Schema({
	user_id : { type: String, default: function() { return suid(16); } , unique: true, index:true },
	email_id :  { type: String, unique: true, index:true },
 	first_name : String,
 	last_name : String,
    date: { type: String, default: new Date().getTime() },
    address:  String 
});
module.exports = mongoose.model('User', userSchema);
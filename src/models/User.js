const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	name:String,
	email:String,
	passwordHash:String,
	likes:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Anime"
		}
	],
	comments:[
		{
			anime:{
				type:mongoose.Schema.Types.ObjectId,
				ref:"Anime"
			},
			comment:"String"
		}
	]
})

module.exports = new mongoose.model("User", UserSchema)
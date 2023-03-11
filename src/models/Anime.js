const mongoose = require("mongoose")

const animeSchema = new mongoose.Schema({
	title:{
		type:String,
		unique:true,
		required:true
	},
	description:String,
	chapters:[
		{
			name:String
		},
	],
	likes:{
		type:Number,
		default:0,
	},
	comments:[
		{
			author: String,
			comment:String
		},
	],
	category:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Category"
	}
})

module.exports = mongoose.model("Anime", animeSchema)
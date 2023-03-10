const mongoose = require("mongoose")

const animeSchema = new mongoose.Schema({
	title:String,
	description:String,
	chapters:[
		{
			name:String
		},
	],
	rating: Number,
	comments:[
		{
			author: String,
			comment:String
		},
	],
	category:String /*:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Anime"
	} */
})

module.exports = mongoose.model("Anime", animeSchema)
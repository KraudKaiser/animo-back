const mongoose = require("mongoose")

const animeSchema = new mongoose.Schema({
	name:String,
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
	category:String
})

module.exports = mongoose.model("Anime", animeSchema)
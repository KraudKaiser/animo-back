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
			name:{
				type:String
			}
		}	
	],
	likes:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		default:[]
}],
	comments:[
		{
			author: String,
			rating:Number,
			comment:String
		},
	],
	category:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Category"
	},
	thumbnail:{
		type:String
	}
})

module.exports = mongoose.model("Anime", animeSchema)
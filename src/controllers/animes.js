const animesRouter = require("express").Router()
const {addAnime, fetchAnimes, fetchAnimesPaginated, addLikeToAnime, deleteLikeOfAnime, addCommentary, searchAnimeResults} = require("../services/animesService")
const {addAnimeInCategory} = require("../services/categoryService")
const multer = require("multer")
const path = require("path")



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + '-' + file.originalname)
	}
  });
  
  const upload = multer({ storage: storage });
  


animesRouter.get("/", (req, res) =>{
	fetchAnimes(req.body).then((response) =>{
		res.json(response)
	})
})

animesRouter.get("/query", (req, res) =>{
	
	const query = req.query.q
	searchAnimeResults(query).then((response) =>{
		res.status(200).json(response)
	})
})

animesRouter.post("/", upload.single("thumbnail"), (req, res) =>{
	const anime = req.body
	const file = req.file
	const baseUrl = 'http://localhost:8081/';
	const thumbnailUrl = baseUrl + req.file.path.replace('\\', '/');
	
	addAnime(anime, file, thumbnailUrl).then((response) =>{
		if(response.message){
			res.status(400).json({error: response.message})
		}
		addAnimeInCategory(response.id, anime.category)
		res.status(200).json(response)
	})

})
animesRouter.post("/like", (req, res) =>{
	const {like, userId, animeId} = req.body
	if(like){
		addLikeToAnime(userId, animeId).then((response) =>{
			res.status(200).json("liked")
		})
	}else{
		deleteLikeOfAnime(userId, animeId).then((response) =>{
			res.status(200).json("disliked")
		})
	}

})

animesRouter.post("/createComment", (req, res) =>{
	const {author, animeId, comment, rating} = req.body
	const commentary = {
		author,
		rating,
		comment
	}
	addCommentary(commentary, animeId).then((response) =>{
		if(response.message){
			res.status(response.status).json({error: response.error})
		}else{
			res.status(200).json(response)
		}
	})


})

module.exports = animesRouter
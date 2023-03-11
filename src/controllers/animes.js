const animesRouter = require("express").Router()
const {addAnime, fetchAnimes, fetchAnimesPaginated} = require("../services/animesService")
const {addAnimeInCategory} = require("../services/categoryService")
animesRouter.get("/", (req, res) =>{
	fetchAnimes(req.body).then((response) =>{
		res.json(response)
	})
})
	animesRouter.get("/:pagination", (req, res) =>{
	const {pagination} = req.params.pagination
	fetchAnimesPaginated(pagination)
})

animesRouter.post("/", (req, res) =>{
	const anime = req.body
	addAnime(anime).then((response) =>{
		if(response.message){
			res.status(400).json({error: response.message})
		}
		addAnimeInCategory(response.id, anime.category)
		res.status(200).json(response)
	})

})

module.exports = animesRouter
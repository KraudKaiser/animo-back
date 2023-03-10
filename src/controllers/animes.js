const animesRouter = require("express").Router()
const {addAnime, fetchAnimes, fetchAnimesPaginated} = require("../services/animesService")

animesRouter.get("/", (req, res) =>{
	fetchAnimes(req.body)
})
animesRouter.get("/:pagination", (req, res) =>{
	const {pagination} = req.params.pagination
	fetchAnimesPaginated(pagination)
})

animesRouter.post("/", (req, res) =>{
	const anime = req.body
	console.log(anime)
	addAnime(anime).then((response) =>{
		res.json(response)
	})

})

module.exports = animesRouter
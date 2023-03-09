const animesRouter = require("express").Router()
const {fetchAnimes, fetchAnimesPaginated} = require("../services/animesService")

animesRouter.get("/", (req, res) =>{
	fetchAnimes(req.body)
})
animesRouter.get("/:pagination", (req, res) =>{
	const {pagination} = req.params.pagination
	fetchAnimesPaginated(pagination)
})

export default animesRouter
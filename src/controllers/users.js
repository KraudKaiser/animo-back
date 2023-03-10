const usersRouter = require("express").Router()
const {findUserByID, addUser} = require("../services/userServices")

usersRouter.get("/:userID", (req, res) =>{
	findUserByID(req.params.userID)
})

usersRouter.post("/addUser", (req, res) =>{
	const user = req.body

	addUser(user).then((response) =>{
		res.json(response)
	})

})

module.exports = usersRouter
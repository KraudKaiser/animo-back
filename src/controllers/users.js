const usersRouter = require("express").Router()
const {findUserByID} = require("../services/userServices")

usersRouter.get("/:userID", (req, res) =>{
	findUserByID(req.params.userID)
})

export default usersRouter
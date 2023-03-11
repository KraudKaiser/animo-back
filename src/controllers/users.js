const usersRouter = require("express").Router()
const {findUserByID, addUser, loginUser} = require("../services/userServices")

usersRouter.get("/:userID", (req, res) =>{
	findUserByID(req.params.userID)
})

usersRouter.post("/login", (req, res) =>{
	const { email, password } = req.body

	loginUser(email, password).then((response) =>{
		if(response.error){
		
			res.status(response.status).json({error: response.error})
		}else{
			res.status(response.status).json({token:response.token, user:response.user})
		}
	})
})


usersRouter.post("/register", (req, res) =>{
	const user = req.body.form
	addUser(user).then((response) =>{
		res.status(response.status).json({token: response.token, user:response.user})
	})

})

module.exports = usersRouter
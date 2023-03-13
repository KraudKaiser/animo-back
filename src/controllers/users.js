const usersRouter = require("express").Router()
const {findUserByID, addUser, loginUser, loginTokenUser} = require("../services/userServices")

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

usersRouter.get("/login/token", (req, res)=>{
	const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'No Hay Token' });
	  }
	  loginTokenUser(token).then((response) =>{
		  if(response.message){
			  res.status(response.status).json({error: response.message});
			}else{
				res.json(response)
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
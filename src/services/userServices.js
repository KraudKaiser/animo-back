const User = require("../models/User")
const bcrypt = require("bcryptjs")
const findUserByID =  () => {
    // Agregar lógica para buscar usuario por ID aquí
  }

  const addUser = async(user) =>{
	const saltyRounds = 10
	const passwordHash = await bcrypt.hash(user.password, saltyRounds )
	
	const objUser = new User({
		name:user.name,
	email:user.email,
	passwordHash,
	likes:[],
	comments:[]
})

return objUser.save()

  }

  module.exports = {
	findUserByID,
	addUser
  }
  
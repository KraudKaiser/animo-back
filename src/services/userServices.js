const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateAuthToken = require("../handlers/authTokenGenerate")
const findUserByID =  () => {
    // Agregar lógica para buscar usuario por ID aquí
  }

const loginUser = async(email, password) =>{
	try {
		const user = await User.findOne({ email });
	
		if (!user) {
		  return {status:401, error: 'Correo electrónico o contraseña inválidos' };
		}
		const match = await bcrypt.compare(password, user.passwordHash);
	
		if (!match) {
		  return {status:401, error: 'Correo electrónico o contraseña inválidos' };
		}
		const token = generateAuthToken(user._id);
		return {status:200, token: token , user: user};
		
	  } catch (error) {
		
		return {status:500, error: 'Internal Server Error' };
	  }
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
	const  info = await objUser.save()
	const token = generateAuthToken(info._id)
	return {status: 200, token:token, user: info}
  }

  module.exports = {
	loginUser,
	findUserByID,
	addUser
  }
  
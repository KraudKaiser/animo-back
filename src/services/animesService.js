const Anime = require("../models/Anime")
const User = require("../models/User")
const Category = require("../models/Category")
const path = require("path")




const addAnime = async(anime, file, thumbnailUrl) =>{
  const categoryFind = await Category.findOne({name:anime.category})
  if(categoryFind === null){
     return {message: "La categoria no existe"}
  }
  const parsedChapters = JSON.parse(anime.chapters)
  const id = categoryFind._id
   const obj = new Anime({
    title:anime.title,
	  description:anime.description,
	  chapters: parsedChapters.map((chapter) =>({name:chapter.name}))
    ,
	  likes:[],
	  comments:{
      type:Array,
      default:[]
    },
    category:id,
    thumbnail: thumbnailUrl
  })
  return obj.save()
}

const fetchAnimes =  () => {
  const result = Anime.find({}).populate("category").then((response) =>{
    return response
  })
  return result
}
const addLikeToAnime = async (userId, animeId) =>{
try {
    const anime = await Anime.findById(animeId);
    const user = await User.findById(userId)
    anime.likes.push(userId);
    user.likes.push(animeId)
    await anime.save();
    await user.save()
    return anime;
  } catch (error) {
    throw new Error('Unable to add like to anime');
  }
}

// Obtener la cantidad de likes de un anime
const getLikesForAnime = async(animeId) =>{
try {
    const anime = await Anime.findById(animeId);
    return anime.likes.length;
  } catch (error) {
    throw new Error('Unable to get likes for anime');
  }
}

const deleteLikeOfAnime = async(userId, animeId) =>{
try {
    const user = await User.findById(userId);
    const anime = await Anime.findById(animeId)
    const indexUser = user.likes.indexOf(animeId);
    const indexAnime = anime.likes.indexOf(userId);
    if (indexUser !== -1) {
      user.likes.splice(indexUser, 1);
      anime.likes.splice(indexAnime, 1)

      await user.save();
      await anime.save()
    }
    return user;
  } catch (error) {
    throw new Error('Unable to remove liked anime from user');
  }
}

const addCommentary = async(commentary, animeId) =>{
  const anime = await Anime.findById(animeId)
  const user = await User.findOne({name: commentary.author})
  console.log(user)
  if(!anime){
    return {status:400, error:"No se encontro anime"}
  }
    anime.comments.push(commentary)
    user.comments.push({anime: animeId, comment:commentary.comment})
    await anime.save()
    await user.save()
    return anime
    
  
}

const searchAnimeResults = async(query) =>{
  try {
    const results = await Anime.find({
      title: { $regex: query, $options: 'i' } //regex que pone todo en minusculas
    })
    return results
  } catch (error) {
    return {status:400, message:"Hubo un error en el servidor" + error}
  }

}

module.exports = {addAnime, fetchAnimes, getLikesForAnime, addLikeToAnime,deleteLikeOfAnime, addCommentary, searchAnimeResults}
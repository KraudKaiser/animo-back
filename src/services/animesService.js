const Anime = require("../models/Anime")
const Category = require("../models/Category")
const addAnime = async(anime) =>{
  const categoryFind = await Category.findOne({name:anime.category})
  
  if(categoryFind === null){
     return {message: "La categoria no existe"}
  }

  const id = categoryFind._id

  const obj = new Anime({
    title:anime.title,
	  description:anime.description,
	  chapters:[
		  anime.chapters.map((chapter) =>(
        {
          name: chapter.name
        }
      ))
	  ],
	  likes: 0,
	  comments:{
      type:Array,
      default:[]
    },
    category:id
  })

  return obj.save()
}

const fetchAnimes =  () => {
  const result = Anime.find({}).populate("category").then((response) =>{
    return response
  })
  return result
}
  const fetchAnimesPaginated = () => {
    // Agregar lógica para obtener animes paginados aquí
  }

module.exports = {addAnime, fetchAnimes, fetchAnimesPaginated}
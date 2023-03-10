const Anime = require("../models/Anime")

const addAnime = (anime) =>{
  console.log(anime)
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
	  rating: anime.rating,
	  comments:[
      anime.comments.map((comment) =>(
        {
          author:comment.author,
          comment:comment.comment
        }
      ))
    ],
    category:anime.category
  })

  return obj.save()
}


const fetchAnimes =  () => {
    // Agregar lógica para obtener animes aquí
  }
  const fetchAnimesPaginated = () => {
    // Agregar lógica para obtener animes paginados aquí
  }

module.exports = {addAnime, fetchAnimes, fetchAnimesPaginated}
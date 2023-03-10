const mongoose = require("mongoose")
const Category = require("../models/Category");

const addCategory = (category) =>{
    const obj = new Category({
        name: category.name,
        description: category.description
    })

    return obj.save()
}
const addAnimeInCategory = (anime, category) =>{
     return Category.findOneAndUpdate({name: category}, {animes:[
        anime
    ]})

    
   
}

module.exports =  {addCategory, addAnimeInCategory}
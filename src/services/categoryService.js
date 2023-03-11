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
     const categoryUpdate =  Category.findOneAndUpdate(
        {name: category},
         { $push: { animes: anime } },
          {new:true})
          .then((response) =>{
            return response
          })
          return categoryUpdate
   
}

module.exports =  {addCategory, addAnimeInCategory}
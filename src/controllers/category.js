const categoryRouter = require("express").Router()
const {addCategory, addAnimeInCategory, getCategories} = require("../services/categoryService")
const Category = require("../models/Category")


categoryRouter.get("/", (req, res) =>{
   getCategories().then((response) =>{
    res.json(response)
   })
})

categoryRouter.get("/:category", (req,res) =>{
    Category.find({name:req.params}).populate("animes")
    .then((response) =>{
        res.json(response)
    })
})

categoryRouter.post("/", (req, res)=>{
    const {name, description} = req.body

    const category = {
        name,
        description,
    }
     addCategory(category).then((response) =>{
        res.status(200).json(response)
     })
})

categoryRouter.post("/animeUpload", (req, res) =>{
    const {anime, category} = req.body
    addAnimeInCategory(anime, category).then((response) =>{
        res.json(response)
    })
})

module.exports = categoryRouter
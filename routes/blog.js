const {Router} = require("express")
const Blog = require("../models/blog")
const router = Router()


router.get("/",async(req,res) => {
   const blogs = await Blog.find({})
   return res.json(blogs)
})

router.get("/add-new",(req,res) => {

})

router.get("/:id",async (req,res) => {
    const id = req.params.id
    const blogId = await Blog.findById(id)
    return res.json(blogId)
})

router.post("/add-new",async(req,res) => {
  const {author,title,content,image,published_date,comment,description} = req.body
  const blog = await Blog.create({
    author,title,content,image,published_date,comment,description
  })
  console.log(author,title,content)
  return res.redirect(`blogs/${blog._id}`)
})

router.delete("/:id",async (req,res) => {
  const id = req.params.id
  const blogId = await Blog.findByIdAndDelete(id)
  return res.json({message:'Blog Deleted'})
})



module.exports = router
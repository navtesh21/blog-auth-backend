const {Schema,model} = require("mongoose")

const blogSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    published_date:{
        type:Date,
        default:Date.now
    },
    comment:[String,String],
    description:{
        type:String,
        required:true
    }

},{timestamps:true})

const blog = model("blog",blogSchema)

module.exports = blog
const mongoose=require('mongoose')

const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:40,
        required:[true,'请输入文章标题']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请输入文章作者']
    },
    publishData:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String,
        required:[true,'请输入文章内容']
    }
})

const Article=mongoose.model('Article',articleSchema)

module.exports={Article}
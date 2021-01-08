const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article',
        required:true
    },
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String,
        default:''
    }
})

const Comment=mongoose.model('Comment',CommentSchema)

module.exports={
    Comment
}
const {User}=require('../../../model/user')

module.exports=async(req,res)=>{
    let user=await User.findOne({_id:req.query.id})

    if(user){
        res.render('/admin/userEdit',{
            msg:req.query.msg,
            link:'/admin/'
        })
    }


}
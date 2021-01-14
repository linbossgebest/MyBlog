const {User}=require('../../model/user')

module.exports=async(req,res)=>{
    const id=req.query.id
    const body=req.body
    const result=await User.updateOne({_id:id},body)
    //修改成功
    if (result.nModified>=1){
        console.log ("用户信息修改成功"); 
    }
    res.redirect('/admin/user');
}
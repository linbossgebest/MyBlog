const {User}=require('../../../model/user')

module.exports=async (req,res)=>{
    //当前页
    let page=req.query.page||1
    //每页条数
    let size=10
    //总条数
    let count=await User.countDocuments()
    //总页数
    let total=Math.ceil(count/size)

    const users=await User.find().limit(size).skip((page-1)*size)
    
    let totalArr=[]
    for(let i=0;i<total;i++){
        totalArr[i]=i+1
    }

    res.render('admin/user',{
        users,
        page,
        totalArr,
        total,
        count,
        currentLink:'user'
    })
}
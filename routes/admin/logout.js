module.exports=(req,res)=>{
    //清除session
    req.session.destroy(()=>{
        //清除公共数据
        req.app.locals.userInfo=null
        //清除cookie
        res.clearCookie('connect.sid')
        res.redirect('/admin/login')
    })
}
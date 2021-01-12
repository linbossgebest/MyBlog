const { User } = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const { email, password } = req.body

    if (email.trim().length === 0 || password.trim().length === 0) {
        console.log('邮箱或者密码为空')
        // console.log(req)
        req.flash('error','邮箱或者密码为空')
        return res.redirect('back')
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        req.flash('error','该邮箱尚未被注册，用户不存在')
        return res.redirect('back')
    }

    //对比用户输入密码是否正确
    const isSuccess = await bcrypt.compare(password, user.password)
    if (isSuccess) {
        req.flash('success','登录成功')
        //添加公共数据
        req.app.locals.userInfo = user
        //添加session
        req.session.user = user.username
        //管理员用户 进入管理后台
        if (user.role === 'admin') {
            res.redirect('/admin/user')
        } else {
            //普通用户
            res.redirect('/home')
        }
    } else {
        req.flash('error','密码输入错误')
        return res.redirect('back')
    }
}
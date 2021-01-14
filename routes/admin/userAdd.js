const { User, createUser, validateUser } = require('../../model/user')

module.exports = async (req, res) => {
    try {
        await validateUser(req.body);
    }
    catch (err) {
        return res.redirect('/admin/userEdit?msg=' + err.message);
    }
    //验证邮箱是否有人注册
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        //如果用户已将存在说明被占用了
        return res.redirect('/admin/userEdit?msg=邮箱已被占用');
    }

    //添加到数据库中
    try {
        await createUser(req.body);
    }
    catch (err) {
        return res.redirect('/admin/userEdit?msg=' + err.message);
    }
    res.redirect('/admin/user');
}
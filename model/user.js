const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const Joi = require('joi')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:2,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,//字段值唯一
    },
    password:{
        type:String,
        required:true
    },
    //admin=>管理员 normal=>普通用户
    role:{
        type:String,
        required:true
    },
    //0启用 1禁用
    state:{
        type:Number,
        default:0
    }
})

const User=mongoose.model('User',userSchema)

//异步方法创建用户
async function createUser(user) {
    //随机生成salt,迭代次数10次
    const salt=await bcrypt.genSalt(10)
    let pass=await bcrypt.hash(user.password,salt)
    user.password=pass

    User.create(user)
}

//验证用户数据是否符合指定规则
async function validateUser(user) {
    //自定义验证规则
    const schema=Joi.object({
        username:Joi.string().required().min(2).max(20).error(new Error('用户名不合法')),
        password:Joi.string().required().error(new Error('密码不合法')),
        email:Joi.string().email().required().error(new Error('邮箱不合法')),
        role:Joi.string().valid('admin','normal').required().error(new Error('身份信息不合法')),
        state:Joi.number().valid(0,1).required().error(new Error('状态不合法'))
    })

    return schema.validateAsync(user)
}

module.exports={
    User,
    createUser,
    validateUser
}





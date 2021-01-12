const express=require('express')
const router=express.Router()

//post请求
router.post('/login', require('./admin/login'));

module.exports=router
const { Router } = require('express')
const express = require('express')
const router = express.Router()

//get请求
router.get('/admin/logout', require('./admin/logout'))
router.get('/admin/login', function (req, res, next) {
    res.render('admin/login')
})
router.get('/admin/user',require('./admin/getPage/userPage'))

//post请求
router.post('/admin/login', require('./admin/login'));
//删除用户信息
router.post('/admin/userDelete',require('./admin/userDelete'))
//编辑用户信息
router.post('/admin/userEdit',require('./admin/userEdit'))
//新增用户信息
router.post('/admin/userAdd',require('./admin/userAdd'))
//编辑用户信息
router.post('/admin/userEdit',require('./admin/userEdit'))

module.exports = router
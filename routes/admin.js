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

module.exports = router
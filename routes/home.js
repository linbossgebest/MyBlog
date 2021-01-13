const express=require('express')
const router=express.Router()

router.get('/',require('./home/home'))
router.get('/home',require('./home/home'))

module.exports=router
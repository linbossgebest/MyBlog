//创建mongodb的连接

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node_blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))

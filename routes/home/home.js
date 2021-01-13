const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res, next) => {
    if (req.session && req.session.user) {//判断session.user是否存在
        let page = req.query.page || 1

        let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec()
        result = JSON.stringify(result);
        result = JSON.parse(result);
        console.log(result)
        res.render('home/default', { result: result, session: req.session })
    } else {
        res.render('admin/login')
    }
}
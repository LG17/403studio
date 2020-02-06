

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({
            code: 200,
            msg: '测试首页成功。'
        })
    })
}
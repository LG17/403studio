const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({
            code: 200,
            msg: '测试首页成功。'
        })
    })

    app.post('/users/register', UserController.register)  //  用户注册

    app.post('/users/login', UserController.login)  //  用户登录

    app.put('/users/updatePassword', UserController.updatePassword)  //  重置密码

    app.get('/users/:id', AuthenticatePolicy.isValidToken, UserController.getUserById)  // 根据id查询用户 

    app.delete('/users/:id', UserController.delete)  //  根据id删除对应用户

    app.post('/movies',
        AuthenticatePolicy.isValidToken,
        MovieController.create) // 创建电影
    
    app.put('/movies/:id',
        AuthenticatePolicy.isValidToken,
        MovieController.updateMovie) // 更新电影

    app.get('/movies/:id',
        MovieController.getMovieById)  // 获取某部电影详情

    app.get('/movies',
        MovieController.getAll) // 获取所有电影
}
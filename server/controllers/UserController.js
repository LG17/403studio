const { User } = require('../models')
const config = require('../config')
const Jwt = require('jsonwebtoken')
const MD5 = require('crypto-js/md5')

function tokenSign({ id, email }) {
    // eslint-disable-next-line no-useless-catch
    try {
        return Jwt.sign({ id, email }, config.token.secretOrPrivateKey, config.token.options)
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    // 用户注册  
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            console.log(req.body)
            res.status(200).send({
                code: 200,
                msg: '恭喜，注册成功',
                user: {
                    email: user.email,
                    id: user.id
                },
                token: tokenSign(user)
            })
        } catch (error) {
            // console.log(error.errors)
            let err = []
            if (error.errors) {
                error.errors.forEach(validateError => {
                    err.push(validateError.message)
                })
            }
            res.status(400).send({
                code: 40001,
                error: err.join(',')
            })
        }
    },
    //  用户登录
    async login (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            let isValidPassword = user.comparePassword(req.body.password)
            if (isValidPassword) {
                res.status(200).send({
                    code: 200,
                    msg: '登录成功',
                    user: {
                        email: user.email,
                        id: user.id
                    },
                    token: tokenSign(user),
                })
            } else {
                res.status(403).send({
                    code: 40002,
                    error: '登录失败，用户名或密码错误'
                })
            }
        } catch (error) {
            // console.log(error)
            res.status(403).send({
                code: 40003,
                error: '登录失败，用户名或密码错误'
            })
        }
    },
    //  用户密码重置
    async updatePassword (req, res) {
        try {
            let resUpdate = await User.update({
                password: req.body.newPassword
            },{
                where: {
                    email: req.body.email,
                    password: MD5(req.body.oldPassword).toString()
                }
            })
            // console.log(resUpdate)
            if (resUpdate[0]) {
                res.status(200).send({
                    code: 200,
                    msg: '重置成功'
                })
            } else {
                res.status(400).send({
                    code: 40004,
                    msg: '密码重置失败（用户名与密码不匹配）'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(403).send({
                code: 40005,
                error: '密码重置失败（用户名或原密码填写错误）'
            })
        }
    },
    async getUserById (req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            if (user) {
                res.status(200).send({
                    code: 200,
                    msg: '查询成功',
                    user
                })
            } else {
                res.status(400).send({
                    code: 40012,
                    error: '没有找到对应数据'
                })
            }
        } catch (error) {
            res.status(500).send({
                code: 40011,
                error: '数据查询失败'
            })
        }
    },
    async delete (req, res) {
        try {
            await User.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.status(200).send({
                msg: '数据删除成功'
            })
        } catch (error) {
            res.status(500).send({
                code: 500,
                error: '数据删除失败'
            })
        }
    }

}
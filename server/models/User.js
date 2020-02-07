const Sequelize = require('sequelize')
const MD5 = require('crypto-js/md5')

// 对密码进行哈希加密，用户创建、更改密码时
// eslint-disable-next-line no-unused-vars
function hashPassword(user, options ) {
    if (user.changed('password')) {
        user.password = MD5(user.password).toString()
    }
}

module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model {
        comparePassword (password) {
            return this.password === MD5(password).toString()
        }
    }

    Model.init({
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: '该邮箱已被注册'
            },
            allowNull: false,
            validate: {
                isEmail: {
                    msg: '邮箱格式不正确'
                },
                notNull: {
                    msg: '注册必须提供一个邮箱地址'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 5,
                    max: 20,
                    msg: '密码长度必须不少于5不超过20个字符'
                },
                notNull: {
                    msg: '注册必须提供密码'
                }
            }
        }
    },
    {
        hooks: {
            afterValidate: hashPassword
        },
        sequelize,
        modelName: 'User'
    })
    return Model
}

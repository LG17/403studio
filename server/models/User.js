const Sequelize = require('sequelize')
const MD5 = require('crypto-js/md5')

// 对密码进行哈希加密，用户创建、更改密码时
function hashPassword(user) {
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
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [5, 40]
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

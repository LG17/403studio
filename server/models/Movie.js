const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model { }

    Model.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: '注册必须提供电影名称'
                }
            }
        },
        gener: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: '电影分类'
                }
            }
        },
        director: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
        },
        poster: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.FLOAT,
        },
        imdb_id: {
            type: DataTypes.STRING,
        },
        film_length: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        }
    },
    {
        sequelize,
        modelName: 'Movie'
    })
    return Model
}

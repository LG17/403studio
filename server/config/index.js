//  配置文件，主要有：
//  database
//  token

const path = require('path')

module.exports = {
    db: {
        database: process.env.DATABASE || 'movie',
        username: 'movie',
        password: 'movie',
        options: {
            host: 'localhost',
            dialect: 'sqlite',
            storage: path.resolve(__dirname,  '../db/movie.sqlit'),
            define: {
                underscored: true,
                paranoid: true
            }
        }
    }
}
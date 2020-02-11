const { Movie } = require('../models')


module.exports = {
    // 新增电影
    async create (req, res) {
        try {
            const movie = await Movie.create(req.body)
            // console.log(req.body)
            res.status(200).send({
                code: 200,
                msg: '电影新增成功',
                movie: movie.toJSON()
            })
        } catch (error) {
            // console.log(error.errors)
            let err = []
            if (error.errors) {
                error.errors.forEach(validateError => {
                    err.push(validateError.message)
                })
            } else {
                err.push('数据保存失败，请稍后再试')
            }
            res.status(400).send({
                code: 50001,
                error: err.join(',')
            })
        }
    },

    async updateMovie (req, res) {
        try {
            await Movie.update(
                req.body,
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.status(200).send({
                message: '数据更新成功'
            })
        } catch (error) {
            res.status(500).send({
                code: 50002,
                message: '数据更新失败'
            })
        }
    },

    async getMovieById (req, res) {
        try {
            const movie = await Movie.findByPk(req.params.id)
            if (movie) {
                res.status(200).send({
                    code: 200,
                    msg: '查询成功',
                    movie
                })
            } else {
                res.status(400).send({
                    code: 50003,
                    error: '没有找到对应数据'
                })
            }
        } catch (error) {
            res.status(500).send({
                code: 50004,
                error: '数据查询失败'
            })
        }
    },

    async getAll (req, res) {
        try {
            const movies = await Movie.findAll()
            res.send({
                code: 200,
                movies: movies
            })
        } catch (error) {
            res.status(500).send({
                code: 50005,
                message: '数据获取失败'
            })
        }
    },

    async delete (req, res) {
        try {
            await Movie.destroy(
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
                code: 50006,
                error: '数据删除失败'
            })
        }
    }

}
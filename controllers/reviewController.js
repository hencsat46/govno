const {Review} = require('../models/models')
const ApiError = require('../error/ApiError')


class ReviewController {
    async create(req, res) {
        const {mail, age, description} = req.body
        const review = await Review.create({email: mail, age, description})
        return res.json(review)
    }

    async getAll(req, res) {
        const review = await Review.findAll()
        return res.json(review)
    }

}

module.exports = new ReviewController()
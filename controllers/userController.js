const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { json } = require('sequelize')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}     
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        let role;
        
        email.includes('admin') ? role = 'ADMIN' : role = 'USER'

        if (!email || !password) {
            return next(ApiError.badRequest('Некоректный email или пароль'))
        } 
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь уже зарегестрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, user_id: user.dataValues.id, role: user.dataValues.role})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        console.log(user)
        if (!user) {
            return next(ApiError.internal('Такого пользователя не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, user_id: user.dataValues.id, role: user.dataValues.role})
        


    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()
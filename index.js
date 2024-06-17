require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const {Brand, Type, Device, DeviceInfo, Basket, BasketDevice} = require('./models/models')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/public', express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

app.get('/', async (req, res) => {
    const brands = await Brand.findAll()
    const types = await Type.findAll()
    const devices = await Device.findAll({
        include: [Type, Brand],
    })
    const data = {
        brands: brands,
        types: types,
        products: devices,
    }
    console.log(devices)
    devices.forEach(function (device) {
        console.log(device.type)
    })

    return res.render('index', data)
})

app.get('/login', (req, res) => {
    return res.render('login')
})

app.get('/admin', async (req, res) => {
    const brands = await Brand.findAll()
    const types = await Type.findAll()
    const data = {
        brands: brands,
        types: types,
    }
    return res.render('admin', data)
})
app.get('/product/:id', async (req, res) => {
    const id = req.params['id']
    const result = await Device.findOne({where: {id: id}, include: [{model: DeviceInfo, as: 'info'}]})
    console.log(result.dataValues.info)
    res.render('product', result.dataValues)
})

app.get('/cart/:id', async (req, res) => {
    const result = await Basket.findOne({where: {id: req.params['id']}})
    const data = await BasketDevice.findAll({where: {basketId: result.dataValues.id}})
    const products = await Device.findAll({where: {id: data.map(item => item.dataValues.deviceId)}})
    console.log(products)
    return res.render('cart', {products: products})
})

app.post('/cart', async (req, res) => {
    const {userId, deviceId} = req.body
    const basketId = await Basket.findOne({where: {id: userId}})
    const result = await BasketDevice.create({basketId: basketId.dataValues.id, deviceId})
    return res.json(result)
})

app.get('/hui/:id', async (req, res) => {
    const id = req.params['id']
    const result = await Device.findOne({where: {id: id}, include: [{model: DeviceInfo, as: 'info'}]})
    console.log(result)
    return res.send(req.params['id'])
})



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


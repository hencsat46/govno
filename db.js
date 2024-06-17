const {Sequelize} = require('sequelize')
const mysql = require('mysql')

module.exports =  new Sequelize('shop', 'root', 'forstudy', {
    dialect:'mysql',
    port: 3306,
    }
)

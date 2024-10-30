const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subscribe = sequelize.define('Subscribe', {
    subscribeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bikeid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    borrow: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accessory: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'subscribe',
    timestamps: false
});

Subscribe.findByBorrow = async function(blocation){
    return await this.findAll({
        where: { 
            borrow: true,
            blocation: blocation
         },
        raw: true
    });
};

module.exports = Subscribe;
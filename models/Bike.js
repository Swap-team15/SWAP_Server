const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bike = sequelize.define('Bike', {
    bikeid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bikename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biketype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    information: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'bike',
    timestamps: false
});
  
module.exports = Bike;

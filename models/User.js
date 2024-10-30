const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phonenumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});
  
module.exports = User;

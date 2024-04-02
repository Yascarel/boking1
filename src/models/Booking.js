const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Booking = sequelize.define('booking', {
    checkIn: {
        type: DataTypes.DATEONLY, // Para almacenar solo la fecha
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATEONLY, // Para almacenar solo la fecha
        allowNull: false
    },
});

module.exports = Booking;
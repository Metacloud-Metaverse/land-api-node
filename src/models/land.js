'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Land extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Land.init({
        coord_x: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true,
        },
        coord_y: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_state_use: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_on_sale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_empty: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        size_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
    }, {
        sequelize,
        modelName: 'Land',
        timestamps: false
    });
    return Land;
};
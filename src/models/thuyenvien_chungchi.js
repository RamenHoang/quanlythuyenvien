'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ThuyenvienChungchi extends Model {
        static associate(models) {
            // Định nghĩa quan hệ với bảng thuyenvien
            ThuyenvienChungchi.belongsTo(models.Thuyenvien, {
                foreignKey: 'id_thuyenvien',
                as: 'thuyenvien'
            });

            ThuyenvienChungchi.belongsTo(models.Chungchi, {
                foreignKey: 'id_chungchi',
                as: 'chungchi'
            });
            
            // Removed belongsTo relationship with Chungchi since we're using tenchungchi directly
        }
    }

    ThuyenvienChungchi.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_thuyenvien: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_chungchi: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tenchungchi: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sohieuchungchi: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        ngaycap: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ngayhethan: {
            type: DataTypes.DATE,
            allowNull: true
        },
        noicap: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        xeploai: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        file: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'ThuyenvienChungchi',
        freezeTableName: true,
        tableName: 'thuyenvien_chungchi'
    });

    return ThuyenvienChungchi;
};

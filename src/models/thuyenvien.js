'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Thuyenvien extends Model {
        static associate(models) {
            // Change from hasMany to hasOne for one-to-one relationship
            Thuyenvien.hasOne(models.ThuyenvienHocvan, {
                foreignKey: 'id_thuyenvien',
                as: 'hocvan'
            });
            
            // Add relationship with ThuyenvienNgoaingu
            Thuyenvien.hasMany(models.ThuyenvienNgoaingu, {
                foreignKey: 'id_thuyenvien',
                as: 'ngoaingu'
            });
            
            // Add relationship with ThuyenvienChungchi
            Thuyenvien.hasMany(models.ThuyenvienChungchi, {
                foreignKey: 'id_thuyenvien',
                as: 'chungchi'
            });
            
            // Add relationship with ThuyenvienTailieu
            Thuyenvien.hasOne(models.ThuyenvienTailieu, {
                foreignKey: 'id_thuyenvien',
                as: 'tailieu'
            });
        }
    }

    Thuyenvien.init({
        id_thuyenvien: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        anh: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        hoten: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cccd: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        sodienthoai: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        chieucao: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cannang: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        nhommau: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        sizegiay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tinhtranghonnhan: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        ngaysinh: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sizegiaybaoho: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trangthai: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'Đang chờ tàu',
            validate: {
                isIn: [['Đang chờ tàu', 'Đang trên tàu', 'Đang trên bờ']]
            }
        },
        thoigian_lenTauDuKien: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Thuyenvien',
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        tableName: 'thuyenvien'
    });

    return Thuyenvien;
};

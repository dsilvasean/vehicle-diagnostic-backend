const { DataTypes } = require("sequelize");
const { sequelize } = require("@config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {   
        type: DataTypes.STRING,
        defaultValue:"default.png",
        get() {
            const rawValue = this.getDataValue("avatar");
            return `${process.env.BASE_URL}/content/uploads/avatar/${rawValue}`;
        }
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

module.exports = User;

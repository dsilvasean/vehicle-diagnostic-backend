const { sequelize } = require("@config/database");
const User = require("./userModel");

const syncDatabase = async () => {
    try {
        await sequelize.sync(); 
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Database synchronization failed:", error);
    }
};

module.exports = { syncDatabase, User };

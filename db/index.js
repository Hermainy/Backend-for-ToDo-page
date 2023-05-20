const { Sequelize } = require("sequelize");

const sequelizeInstance = new Sequelize({
     dialect: "postgres", 
     host: "localhost",
     port: "5432", 
     database: "JS",
     username: "postgres",
     password: "1q2w3e4r5t",
});

const initDB = async () => {
  try {
    await sequelizeInstance.authenticate(); 
    await sequelizeInstance.sync();
    console.log("Sequelize was initialized");
  } catch (error) {
    console.log("Sequelize ERROR (initDB)", error);
    process.exit();
  }
};

module.exports = {
  sequelizeInstance,
  initDB,
};
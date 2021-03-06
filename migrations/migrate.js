export default (sequelize) => {
    sequelize.sync({ alter: true }).then(async () => {
        console.log("All models were synchronized successfully.");
    }).catch((e) => {
        console.error("Failed to synchronize all models.");
    });
};

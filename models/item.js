module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Item', {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
};
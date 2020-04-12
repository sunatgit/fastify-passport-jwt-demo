module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    })
};

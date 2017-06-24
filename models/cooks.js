module.exports = function(sequelize , DataTypes) {
    var Cooks = sequelize.define('Cook', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false
        }        
    });
    return Cooks;
};
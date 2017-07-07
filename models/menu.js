module.exports = function(sequelize , DataTypes) {
    var Menu = sequelize.define('Menu', {
        menu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Menu;
};
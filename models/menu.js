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
            type: DataTypes.FLOAT(4, 2),
            allowNull: false
        },
        picture: {
            type: DataTypes.BLOB(medium),
            allowNull: true
        }
    });
    return Menu;
};
module.exports = function(sequelize , DataTypes) {
    var Menu = sequelize.define('Menu', {
        menu: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        menu_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Menu;
};
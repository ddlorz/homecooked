module.exports = function(sequelize , DataTypes) {
    var Chef = sequelize.define('Chef', {
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
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
<<<<<<< HEAD
        picture_url: {
=======
        picture: {
>>>>>>> ddf2bc4e17e26124aac1616160b7e3cc02a6b82d
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Chef;
};
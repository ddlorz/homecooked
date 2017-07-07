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
>>>>>>> updated models and package.json
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Chef;
};
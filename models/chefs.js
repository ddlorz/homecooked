module.exports = function(sequelize , DataTypes) {
    var Chef = sequelize.define('Chef', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Chef;
};
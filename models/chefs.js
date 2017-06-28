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
        picture: {
            type: DataTypes.BLOB(medium),
            allowNull: true
        }
    });
    return Chef;
};
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
        }        
    });
    return Chef;
};
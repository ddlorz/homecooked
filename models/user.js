module.exports = function(sequelize , DataTypes) {
    var User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //password: {
        //    type: DataTypes.STRING,
        //    allowNull: false
        //},
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        classification: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'eater' 
        },
    });
    return User;
};
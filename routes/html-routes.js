var db = require('../models');
var User = db.User;
var Chef = db.Chef
var sequelize = db.sequelize;

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {});
    });
    app.get('/chef_page', function(req, res) {        
        res.render('chef-form', {});
    });
    app.get('/chef_gallery', function(req, res) {        
        User.hasOne(Chef);
        Chef.belongsTo(User, {foreignKey: 'userId'});

        Chef.findAll({  
            include: {
                model: User,
                required: false
            }
        }).then(function(result) {
            console.log(result[1].dataValues.email);
            res.render('chef-gallery', {chefs: result});
        });
        
    });
    app.get('/chef_profile', function(req, res) {
        res.render('chef-profile', {});
    });
}
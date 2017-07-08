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
            for (var i in result) {
                result[i].dataValues.User.dataValues.first_name = result[i].dataValues.User.dataValues.first_name.replace(/\b[a-z]/g, function(letter) {                
                    return letter.toUpperCase();
                });
                result[i].dataValues.User.dataValues.last_name = result[i].dataValues.User.dataValues.last_name.slice(0 , 1).toUpperCase();   
            };
            res.render('chef-gallery', {chefs: result});
        });
        
    });
    app.get('/chef_profile/:chef_id', function(req, res) {
        var chef_id = req.params.chef_id + '@gmail.com';

        User.hasOne(Chef);
        Chef.belongsTo(User, {foreignKey: 'userId'});

        Chef.findOne({  
            where: {
                 email: chef_id   
            },
            include: {
                model: User,
                required: false
            }
        }).then(function(result) {
            console.log(result);
            res.render('chef-profile', {chef: result});
        });
        
        
    });
}
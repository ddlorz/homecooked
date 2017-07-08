var db = require('../models');
var User = db.User;
var Chef = db.Chef
var sequelize = db.sequelize;

module.exports = function(app) {
    app.post('/api/new_user', function(req, res) {

        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            zip: req.body.zip,
            phone: req.body.phone,
            classification: req.body.class
        }).then(function(result) {
            if (req.body.class === 'Chef') {
                Chef.create({
                    userId: result.dataValues.id,
                    email: req.body.email
                }).then(function() {
                    res.end();
                });
            }
            else { res.end(); }
        });   
    });

    app.post('/api/sign_in', function(req, res) {
        User.findOne({
            where: {
                email: req.body.email,
            }
        }).then(function(result) {
            res.json(result.dataValues);      
        });
    });

    app.post('/api/chef_profile', function(req, res) {
        Chef.update({
            picture_url: req.body.photo,
            biography: req.body.biography,
            price: req.body.price
        }, {
            where: {
                email: req.body.email
            }
        }).then(function(result) {
            res.end();
        });
    });

    app.post('/api/getChef', function(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(result) {
            res.json(result);
        });
    });
}
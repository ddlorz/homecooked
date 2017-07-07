var db = require('../models');
var User = db.User;
var Chef = db.Chef
var sequelize = db.sequelize;

var user_data = {};

module.exports = function(app) {
    app.post('/api/new_user', function(req, res) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            //password: req.body.password,
            zip: req.body.zip,
            phone: req.body.phone,
            classification: req.body.class
        }).then(function() {
            res.end();
        });
    });

    /*app.post('/api/test_email', function(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(result) {
            if (result !== null) {
                res.json('taken')
            }
            else { res.end(); }
        });
    });*/

    app.post('/api/sign_in', function(req, res) {
        User.findOne({
            where: {
                email: req.body.email,
            }
        }).then(function(result) {
            user_data = result;
            res.end();
            //res.json(result.dataValues);            
        });
    });

    app.post('/api/chef_profile', function(req, res) {
        Chef.create({
            email: user_data.email,
            biography: req.body.biography,
            specialty: req.body.specialty
        }).then(function(result) {
            res.end();
        });
    });
}
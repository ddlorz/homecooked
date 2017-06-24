var db = require('../models');
var User = db.User;
var sequelize = db.sequelize;

module.exports = function(app) {
    app.post('/api/new_user', function(req, res) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            zip: req.body.zip,
            phone: req.body.phone,
            classification: req.body.class
        }).then(function() {
            res.end();
        });
    });

    app.post('/api/sign_in', function(req, res) {
        User.findAll({
            where: {
                email: req.body.email,
                password: req.body.email
            }
        }).then(function() {
            red.end();
        });
    });
}
var db = require('../models');
var User = db.User;
var Chef = db.Chef;
var Menu = db.Menu;
var sequelize = db.sequelize;
var nodemailer = require('nodemailer');

module.exports = function(app) {
    app.post('/api/new_user', function(req, res) {
        req.session.user = req.body;

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
                    for (var i = 0; i < 3; i++) {
                        Menu.create({
                            number: i + 1,
                            email: req.body.email
                        }).then(function() {});
                    }
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
            req.session.user = result.dataValues; 
            console.log(req.session.user);
            res.end();
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
                email: req.session.user.email
            }
        }).then(function(result) {
            res.json(result);
        });
    });

    app.post('/api/send_mail', function(req, res) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 25,
            secure: false,
            auth: {
                user: 'homecookeddummy@gmail.com',
                pass: 'homecooked'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: '"Hola Man" <homecookeddummy@gmail.com>',
            to: 'djrloria@gmail.com',
            subject: 'HI',
            text: 'what',
            html: 'hello'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.end();
        });
    });       

    app.post('/api/save_url', function(req, res) {
        console.log(req.body);
        User.update({
            [req.body.col]: req.body.url
        }, {
            where: {
                email: req.session.user.email
            }
        }).then(function(result) {
            res.end();
        });
    });

    app.post('/api/save_menu', function(req, res) {
        console.log(req.body);
        Menu.update({            
            picture_url: req.body.url
        }, {
            where: {
                menu_id: req.body.menu_id,
                email: req.session.user.email
            }
        }).then(function(result) {
            res.end();
        });
    });
}
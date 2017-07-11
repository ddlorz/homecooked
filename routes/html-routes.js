var db = require('../models');
var User = db.User;
var Chef = db.Chef
var sequelize = db.sequelize;
var aws = require('aws-sdk');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {});
    });

    app.get('/chef_form', function(req, res) {   
        console.log(req.session.user);
        var user = req.session.user;
        user.first_name = user.first_name.replace(/\b[a-z]/g, function(letter) {                
                    return letter.toUpperCase();
                });
        user.last_name = user.last_name.slice(0 , 1).toUpperCase();  
        res.render('chef-form', {user: req.session.user});
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

        console.log(chef_id);

        Chef.findOne({  
            where: {
                 email: chef_id   
            },
            include: {
                model: User,
                required: false
            }
        }).then(function(result) {
            result.dataValues.User.dataValues.first_name = result.dataValues.User.dataValues.first_name.toUpperCase();
            result.dataValues.User.dataValues.last_name = result.dataValues.User.dataValues.last_name.slice(0 , 1).toUpperCase(); 
            res.render('chef-profile', {result});
        });   
    });

    app.get('/user_page', function(req, res) {
        res.render('customer-form', {});
    });

    app.get('/sign-s3', (req, res) => {
        const S3_BUCKET = 'homecooked';
        const s3 = new aws.S3({
            accessKeyId: 'AKIAJG7REFQAE4LCR4EA',
            secretAccessKey: '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',
            signatureVersion: 'v4',
            region: 'us-east-2'
        });
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
            console.log(err);
            return res.end();
            }
            const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };
            res.write(JSON.stringify(returnData));
            res.end();
        });
    });
}
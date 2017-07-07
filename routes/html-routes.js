module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {});
    });
    app.get('/chef_page', function(req, res) {
        res.render('chef-form', {});
    });
    app.get('/chef_gallery', function(req, res) {
        res.render('chef-gallery', {});
    });
    app.get('/chef_profile', function(req, res) {
        res.render('chef-profile', {});
    });
}
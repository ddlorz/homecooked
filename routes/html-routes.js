module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {});
    });
    app.get('/chef_page', function(req, res) {
        res.render('chef_page', {});
    });
}
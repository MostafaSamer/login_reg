const data = require('../model/data');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('login');
    })

    app.get('/reg', function(req, res) {
        res.render('register');
    })

    app.post('/user/add', function(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const pass = req.body.pass;
        const phone = req.body.phone;
        const add = req.body.address;
        // Valided the data
        data.insert_data(req.body);
        res.redirect('/');
    })

    app.post('/user/add', function(req, res) {
        const email = req.body.email;
        const pass = req.body.pass;
        // Valided data
    })

}

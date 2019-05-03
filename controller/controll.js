const data = require('../model/data');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('login');
    })

    app.get('/reg', function(req, res) {
        res.render('register');
    })

    app.get('/user/profile/:id&&:rev&&:name&&:email&&:phone&&:address', function(req, res) {
        console.log(req.params.rev);
        res.render('profile', {
            id: req.params.id,
            rev: req.params.rev,
            name: req.params.name,
            email: req.params.email,
            phone: req.params.phone,
            address: req.params.address
        });
    })

    app.post('/user/delete/:id&&:rev', function(req, res) {
        data.delete_data(req.params.id, req.params.rev, function(callback) {
            if (callback) {
                console.log("Deleted!");
                res.redirect('/');
            }
        })
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

    app.post('/user/login', function(req, res) {
        const email = req.body.email;
        const pass = req.body.pass;
        // Valided data && send the rest of it
        data.check_data(req.body, function(id, callback) {
            if (callback) {
                // Go to profile and send the data
                /*res.render('profile', {
                    name: callback.name,
                    email: callback.email,
                    phone: callback.phone,
                    address: callback.address
                })*/
                res.redirect('/user/profile/' + id
                                      + "&&" + callback._rev
                                      + "&&" + callback.name
                                      + "&&" + callback.email
                                      + "&&" + callback.phone
                                      + "&&" + callback.address);
            } else {
                res.redirect('/');
            }
        });
    })

}

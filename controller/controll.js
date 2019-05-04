const data = require('../model/data');

module.exports = function(app) {

    /////////////////////
    // Getter of the url
    /////////////////////
    // render the home(login.ejs) when he try to enter the root
    app.get('/', function(req, res) {
        res.render('login');
    })

    // render the (register.ejs)
    app.get('/reg', function(req, res) {
        res.render('register');
    })

    // render the profile.ejs
    // check the session for logining
    // get the data from the url
    app.get('/user/profile/:id&&:rev&&:name&&:email&&:pass&&:phone&&:address', function(req, res) {
        sess = req.session;

        if (sess.email && sess.pass) {
            res.render('profile', {
                id: req.params.id,
                rev: req.params.rev,
                name: req.params.name,
                email: req.params.email,
                pass: req.params.pass,
                phone: req.params.phone,
                address: req.params.address
            });
        }
    })

    // handling the logout req,
    // by destroing the sessions,
    // then redirect it to the root "/"
    app.post('/logout', function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log("Error in destroying the session");
            }
            console.log("Session destroyed!");
            res.redirect('/');
        })
    })

    // handling the delete get the id & rev from the form and send to data.js
    app.post('/user/delete', function(req, res) {
        data.delete_data(req.body.id, req.body.rev, function(callback) {
            if (callback) {
                console.log("Deleted!");
                res.redirect('/');
            }
        })
    })

    // handling the add of new user get all needed data from register.ejs
    // and valid it then send it to data.js
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

    app.post('/user/update', function(req, res) {
        data.update_user(req.body);
        res.redirect("/logout");
    })

    // handling the login
    // get the data from login.ejs
    // and make a session with it
    // then send it to the data.js
    // at last get the data from the callback() and redirect it to /user/profile
    // if there is no callback() redirect to the root "/"
    app.post('/user/login', function(req, res) {
        const email = req.body.email;
        const pass = req.body.pass;
        sess = req.session
        sess.email = email;
        sess.pass = pass;
        // Valided data && send the rest of it
        data.check_data(req.body, function(id, callback) {
            if (callback) {
                res.redirect('/user/profile/' + id
                                      + "&&" + callback._rev
                                      + "&&" + callback.name
                                      + "&&" + callback.email
                                      + "&&" + callback.pass
                                      + "&&" + callback.phone
                                      + "&&" + callback.address);
            } else {
                res.redirect('/');
            }
        });
    })

    // handling wrong request from the user
    // to enter a not valid url, redirect him to the root "/"
    app.get('*', function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log("Error in destroying the session");
            }
            console.log("Session destroyed!");
            res.redirect('/');
        })
    })

}

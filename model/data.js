const nodeCouchdb = require('node-couchdb');
const path = require('path');

const couch = new nodeCouchdb({
    auth:{
        user: 'admin',
        pass: 'root'
    }

});
const dbName = 'login_reg';
const viewUrl = '_design/view-all/_view/all-index';

var insert_data = function(data) {
    //console.log("Data: " + data.name);
    couch.uniqid().then(function(ids) {
        const id = ids[0];
        couch.insert(dbName, {
            name: data.name,
            email: data.email,
            pass: data.pass,
            phone: data.phone,
            address: data.address
        }).then(
            function(data, header, status) {
                console.log("Data Saved!");
            },
            function(err) {
                console.log("Error!");
            }
        )
    })
}

var check_data = function(data, callback) {
    const email = data.email;
    const pass = data.pass;
    //console.log("Enterd Email = " + email);
    //console.log("Enterd Pass = " + pass);
    couch.get(dbName, viewUrl + "?key=\"" + email + "\"").then(
        function(data, headers, status) {
            //data.data.rows[0].key     **email**
            //console.log("email form database " + data.data.rows[0].key);
            //data.data.rows[0].value   **pass**
            //console.log("Pass from database " + data.data.rows[0].value);
            if (data.data.rows[0]
                && email == data.data.rows[0].key
                && pass == data.data.rows[0].value) {
                    var id = data.data.rows[0].id;
                    couch.get(dbName, id).then(
                        function(data, header, status) {
                            callback(id, data.data);
                        },
                        function(err) {
                            console.log("Error: getting data by id");
                        }
                    )
            } else {
                console.log("Error email or pass");
                callback(false);
            }
        },
        function(err) {
            console.log("Error: email and pass");
        }
    )
}

var delete_data = function(id, rev, callback) {
    console.log("_rev form data: " + rev);
    couch.del(dbName, id, rev).then(
        function(data, header, status) {
            callback(true);
        },
        function(err) {
            callback(false);
        }
    )
}

module.exports = {
    insert_data: insert_data,
    check_data: check_data,
    delete_data: delete_data
}

const md5 = require('md5');
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

// to insert new user
// data{name: "", .....}
var insert_data = function(data) {
    //console.log("Data: " + data.name);
    couch.uniqid().then(function(ids) {
        const id = ids[0];
        couch.insert(dbName, {
            name: data.name,
            email: data.email,
            pass: md5(data.pass),
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

// check if the user is exits
// if though return his data in callback()
// if not return false in callback()
var check_data = function(data, callback) {
    const email = data.email;
    const pass = md5(data.pass);
    couch.get(dbName, viewUrl + "?key=\"" + email + "\"").then(
        function(data, headers, status) {
            //data.data.rows[0].key     **email**
            //data.data.rows[0].value   **pass**
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

// to delete a data of a user
// getting an id & rev
// if it deleted return true, false otherwise
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

// to update a data of user
// getting an id & rev
// getting the rest of the data in one var (data)
var update_user = function(data) {
    couch.update(dbName, {
        _id: data.id,
        _rev: data.rev,
        name: data.name,
        email: data.email,
        pass: data.pass,
        phone: data.phone,
        address: data.address
    }).then(
        function(data, headers, status) {

        },
        function(err) {
            console.log("Error in updating the data of: " + id);
        }
    )
}

module.exports = {
    insert_data: insert_data,
    check_data: check_data,
    delete_data: delete_data,
    update_user: update_user
}

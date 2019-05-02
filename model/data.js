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
    couch.get(dbName, viewUrl + "?key=\"" + email + "\"").then(
        function(data, headers, status) {
            //data.data.rows[0].key     **email**
            //data.data.rows[0].value   **pass**
            if (email == data.data.rows[0].key
                && pass == data.data.rows[0].value) {
                    console.log("Correct");
            } else {
                console.log("Wrong");
            }
        },
        function(err) {
            console.log("Error");
        }
    )
}

module.exports = {
    insert_data: insert_data,
    check_data: check_data
}

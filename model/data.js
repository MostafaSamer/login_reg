const nodeCouchdb = require('node-couchdb');

const couch = new nodeCouchdb({
    auth:{
        user: 'admin',
        pass: 'root'
    }

});
const dbName = 'login_reg';
const viewUrl = '_design/all_data/_view/new-view';

const insert_data = function(data) {
    //console.log("Data: " + data.name);
    couch.uniqid().then(function(ids) {
        const id = ids[0];
        couch.insert(dbName, {
            name: data.name,
            email: data.email,
            password: data.pass,
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

const check_data = function(data) {
    const email = data.email;
    const pass = data.pass;
}

module.exports = {
    insert_data: insert_data
}

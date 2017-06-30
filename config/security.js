'use strict';

const node_acl = require('acl')
const mongoose  = require('mongoose')
const configDB = require('./database.js')

const dbConn = mongoose.connect(configDB.url); // connect to our database
const acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, 'acl_'));
set_roles();

function set_roles () {

    acl.allow([{
        roles: 'admin',
        allows: [{
                resources: '/api/conf',
                permissions: '*'
            }
        ]
    }, {
        roles: 'user',
        allows: [{
            resources: 'photos',
            permissions: ['view', 'edit', 'delete']
        }]
    }, {
        roles: 'guest',
        allows: []
    }]);

    acl.addUserRoles('594a984a9815beb8219dca22', 'admin').then(function (res){
        console.log('Added myself ' + res);
    }).catch(function (err){
        console.log('Didnt worked m8' + err);
    });

}

module.exports = acl;

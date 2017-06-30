let acl = require('acl');
const mongoose = require('mongoose');
const config = require('./config/database');

acl = new acl(new acl.mongodbBackend(mongoose.connection.db, config.aclCollectionPrefix), { debug: function(string) { console.log(string); } });

module.exports = {
	init: function() {
		//acl.addUserRoles('5955606225e9c855594157f6', 'user', function(err){ console.log("Added USER role for webcomm")})
		acl.addRoleParents('superAdmin', 'admin');
		acl.addRoleParents('admin', 'user');

		acl.allow([
			{
				roles: ['superAdmin'],
				allows: [
					{ resources: ['/admin'], permissions: ['*'] },
					//{ resources: ['admin/users'], permissions: ['view', 'get', 'edit', 'put', 'post'] }
				]
			},
			{
				roles: ['admin'],
				allows: [
					{ resources: ['/admin'], permissions: ['view', 'get', 'edit', 'put', 'post'] },
					//{ resources: ['admin/users'], permissions: ['view', 'get', 'edit', 'put', 'post'] }
				]
			},
			{
				roles: ['user'],
				allows: [
					{ resources: ['/api'], permissions: ['get', 'edit', 'put', 'post', 'patch'] },
				]
			}
		]);
	},

	getAcl: function() {
		return acl;
	}
};

// load the things we need
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

import * as validator from './validate'

// define the schema for our user model
const userSchema = mongoose.Schema({
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        active       : Boolean
    }
}, {timestamps: true});

/*
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema)
module.exports = User

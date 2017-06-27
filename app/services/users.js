//service

import User from '../models/User'
module.exports = {
    getAllUsers: function(){
        return User.find({}).exec() //returns a promise
    }
}

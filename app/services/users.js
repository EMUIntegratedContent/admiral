//service

import User from '../models/User'

export function getAllUsers(){
    return User.find({}).exec() //returns a promise
}

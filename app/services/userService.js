//service
import User from '../models/User'
const acl = require('../../authorization').getAcl()

export function getAllUsers(){
  return User.find({}).exec().then( (users) => {
    if(!users)
      throw new Error('No users found.')

    return users
  }) //returns a promise
}

export function getUserByName(userName){
  return User.findOne({'google.name' : userName}).exec().then( (user) => {
    if(!user)
      throw new Error('No user found with that name.')

    return user
  }) //returns a promise
}

export function deactivateUser(userId){
    const currentRoles = acl.userRoles(userId, (err, roles) =>{
      console.log("BEFORE ERROR")
      if(err)
        return err
      console.log("AFTER ERROR")
      roles.forEach((role, index, roles) =>{
        console.log("IN FOREACH!")
        acl.removeUserRoles(userId, role, (err)=>{
          if(err)
            return err
        })
      })

      return "All roles for user " + userId + " have been removed.";
    })
}

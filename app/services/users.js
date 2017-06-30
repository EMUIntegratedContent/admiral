//service
import User from '../models/User'
const acl = require('../../authorization').getAcl()

export function getAllUsers(){
    return User.find({}).exec() //returns a promise
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

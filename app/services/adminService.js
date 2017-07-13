//service
import User from '../models/User'
const acl = require('../../authorization').getAcl()

// Returns a promise
export function loggedUserHasRole(userId, role){
    const isAllowed = acl.isAllowed(userId, '/admin', role, (err, allowed) => {
      if(err)
        throw err

      if(allowed){
        return true
      }

      return false
    })

    return isAllowed
}

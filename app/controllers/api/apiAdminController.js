//API controller
var adminService = require('../../services/adminService')

export async function loggedUserHasRole(userId, role){
    const hasRole = await adminService.loggedUserHasRole(userId, role)
    return hasRole
}

//controller
var userservice = require('../services/users.js')

export async function getAllUsers() {
  return await userservice.getAllUsers();
}

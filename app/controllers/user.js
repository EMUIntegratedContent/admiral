//controller
var userservice = require('../services/users.js')

export async function getAllUsers() {
  return await userservice.getAllUsers();
}

export async function deactivateUser(userId) {
  return await userservice.deactivateUser(userId);
}

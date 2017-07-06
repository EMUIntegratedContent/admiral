//controller
var userService = require('../services/userService')

export async function getAllUsers(){
  const users = await userService.getAllUsers();
  return users
}

export async function getUserByName(userName){
  const user = await userService.getUserByName(userName)
  return user
}

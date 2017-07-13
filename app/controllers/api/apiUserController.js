//API controller
var userService = require('../../services/userService')

export async function getAllUsers(){
  const users = await userService.getAllUsers();
  return users
}

export async function deactivateUser(){
  /*
  try {
    const result = await userService.deactivateUser(req.body.userId)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
  */
}

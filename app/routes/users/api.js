const userservice = require('../../services/users')

export async function getAllUsers(req, res){
  const users = await userservice.getAllUsers();

  res.status(200).json({ users });
}

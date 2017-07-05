const userservice = require('../../services/users')

export async function getAllUsers(req, res){
  const users = await userservice.getAllUsers();

  res.status(200).json({ users });
}

export async function deactivateUser(req, res){
  try {
    const result = await userservice.deactivateUser(req.body.userId)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}

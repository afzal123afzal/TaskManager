const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requireAdminAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById({ _id }).select('-password')
    if (req.user.role === "admin") {
       next()
    }else{
      throw Error("Not valid")
    }


  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = requireAdminAuth
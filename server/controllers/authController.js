const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config/keys')

const createToken = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.signin = (req, res) => {

  res.json({token: createToken(req.user)})
}

exports.logout = (req, res) => {
  req.logout();
  res.send(req.user)
}

exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
   return res.status(422).json({error: 'Please provide an email and password'})
  }

  User.findOne({email:email}).then(existingUser => {
    if (existingUser) {
      return res.status(422).json({msg: 'A user with the same email already exists'})
    }

    const user = new User();
      user.email = email;
      user.password = password;
      user.photo = user.gravatar();


    user.save().then(user => {

      res.json({token: createToken(user)})
    }).catch(err => {
      if (err) {
        res.status(422).send({error: 'Error saving record'})
      }
    })
    // user.save(function(err){
    //   if (err) {
    //     return next(err)
    //   }
    //
    //   res.json({token: createToken(user)})
    //
    // })


  }).catch(err => next(err))

}

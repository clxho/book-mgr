const mongoose = require('mongoose')
const {getMate} = require('../common')

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMate()
})

mongoose.model('User', UserSchema)
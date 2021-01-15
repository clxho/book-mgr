const mongoose = require('mongoose')
const { getMate } = require('../common')

const InitCodeSchema = new mongoose.Schema({
  code: String,
  user: String,
  meta: getMate()
})

mongoose.model('InviteCode', InitCodeSchema)
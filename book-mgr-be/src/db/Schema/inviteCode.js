const mongoose = require('mongoose')
const { getMate } = require('../helpers')

const InitCodeSchema = new mongoose.Schema({
  code: String,
  user: String,
  meta: getMate()
})

mongoose.model('InviteCode', InitCodeSchema)
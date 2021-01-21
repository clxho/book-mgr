require('./Schema/users')
require('./Schema/inviteCode')
require('./Schema/Book')
const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr1');

    mongoose.connection.on('open', () => {
      console.log('连接成功');

      resolve()
    })
  })
}

module.exports = connect
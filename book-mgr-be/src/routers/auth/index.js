// 注册和登入功能中间件
const Router = require('@koa/router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')
const InviteCode = mongoose.model('InviteCode')

const router = new Router({
  prefix: '/auth'
})

// 注册功能
router.post('/register', async (ctx) => {
  // 获取请求信息
  const {
    account,
    password,
    inviteCode
  } = ctx.request.body

  // 表单验证
  if (account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }
    // 寻找数据库中对应的邀请码
    const findCode = await InviteCode.findOne({
      code: inviteCode
    }).exec()

    if (!findCode || findCode.user) {
      ctx.body = {
        code: 0,
        msg: '邀请码不正确',
        data: null
      }
      return
    }

  // 查找是否已经注册
  const findUser = await User.findOne({
    account
  }).exec()


  // 如用户已经注册
  if (findUser) {
    ctx.body = {
      code: 0,
      msg: '注册失败，用户已存在',
      data: null
    }
    return
  }
  // 创建用户
  const user = new User({
    account,
    password
  })

  const res = await user.save()

  //将用户ID保留到邀请码数据中
  findCode.user = res._id
  findCode.mate.updatadAt = new Date().getTime()

  await findCode.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }


})
// 登入功能
router.post('/login', async (ctx) => {
  const {
    account,
    password
  } = ctx.request.body
  // 是否存在用户
  const findUser = await User.findOne({
    account
  }).exec()

  // 如果用户名错误，数据库中查不到该用户
  if (!findUser) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null
    }
    return
  }
  // 提取数据库中用户的账户和ID信息
  const user = {
    account: findUser.account,
    _id: findUser._id
  }
  // 密码正确
  if (findUser.password === password) {
    ctx.body = {
      code: 1,
      msg: '登入成功',
      data: {
        user,
        token: jwt.sign(user, 'book-mgr')
      }
    }
  } else {
    // 密码错误
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null
    }
    return
  }




})

module.exports = router
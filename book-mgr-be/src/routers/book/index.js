const Router = require('@koa/router')
const mongoose = require('mongoose')


const BOOK_CONST = {
  IN: 'IN_COUNT',
  ON: 'OUT_COUNT'
}

const Book = mongoose.model('Book')

const router = new Router({
  prefix: '/book'
})

router.post('/add', async (ctx) => {
  const {
    name,
    price,
    author,
    publishDate,
    classify,
    count
  } = ctx.request.body

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count
  })

  const res = await book.save()

  ctx.body = {
    code: 1,
    data: res,
    msg: '添加成功'
  }
})

router.get('/list', async (ctx) => {
  const {
    page,
    size,
    keyword
  } = ctx.query // 注意： 这里拿到的page和size都是字符串

  const query = {}

  if (keyword) {
    query.name = keyword
  }
  const list = await Book
    .find(query)
    .skip((page - 1) * size)
    .limit(size - 0)
    .exec()

  const total = await Book.countDocuments()

  ctx.body = {
    code: 1,
    data: {
      list,
      total
    },
    msg: '获取列表成功'
  }
})

router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params
  const res = await Book.deleteOne({
    _id: id
  })

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }

})



router.post('/update/count', async (ctx) => {
  const {
    id,
    type
  } = ctx.request.body

  let {
    num
  } = ctx.request.body

  num = Number(num)

  const book = await Book.findOne({
    _id: id
  }).exec()

  if (!book) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍'
    }

    return
  }

  if (type === BOOK_CONST.IN) {
    // 入库
    num = Math.abs(num)
  } else {
    //出库
    num = -Math.abs(num)
  }

  book.count = book.count + num

  if (book.count < 0) {
    ctx.body = {
      code: 0,
      msg: '剩下的量不足以出库'
    }
    return
  }

  const res = await book.save()

  ctx.body = {
    code: 1,
    msg: '操作成功',
    data: res
  }
})

router.post('/update', async (ctx) => {
  const {
    id,
    // name,
    // price,
    // author,
    // publishDate,
    // classify
    ...others
  } = ctx.request.body



  const one = await Book.findOne({
    _id: id
  }).exec()

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍'
    }
    return
  }

  const newQuery = {}

  Object.entries(others).forEach((item) => {
    newQuery[item[0]] = item[1]
  })

  Object.assign(one, newQuery)



  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  }
})

module.exports = router
import {
  message
} from 'axios'

export const result = (response, authShowErrorMsg = true) => {
  const {
    data
  } = response

  if ((data.code === 0) && authShowErrorMsg) {
    message.error(data.msg)
  }

  return {
    success(cb) {
      if (data.code !== 0) {
        cb(data, response)
      }
    },
    fail(cb) {
      if (data.code === 0) {
        cb(data, response)
      }
    },
    finally(cb) {
      cb(data, response)
    }
  }
}
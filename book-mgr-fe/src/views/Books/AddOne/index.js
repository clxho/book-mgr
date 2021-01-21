import {
  defineComponent,
  reactive,

} from 'vue';
import {book} from '@/service'
import {result, clone} from '@/helpers/utils/index.js'
import { message } from 'ant-design-vue';

const defaultFprmData = {
  name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: '',
      count: ''
}

export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFprmData))

    const submit = async () => {
      const form = clone(addForm)
      form.publishDate = addForm.publishDate.valueOf()
      const res = await book.add(form) 

      result(res)
        .success((data) => {
          // 提交后重置表单
          Object.assign(addForm, defaultFprmData)
          message.success(data.msg)
        })
    }

    const close = () => {
      context.emit('update:show', false)

    }


    return {
      addForm,
      submit,
      props,
      close


    }
  }
})
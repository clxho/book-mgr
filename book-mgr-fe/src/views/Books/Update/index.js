import {
  defineComponent,
  reactive,
  watch

} from 'vue';
import {
  book
} from '@/service'
import {
  result,
  
} from '@/helpers/utils/index.js'
import {
  message
} from 'ant-design-vue';


export default defineComponent({
  props: {
    show: Boolean,
    book: Object
  },
  setup(props, context) {
    const editForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: '',
    })



    const close = () => {
      context.emit('update:show', false)

    }

    watch(() => props.book, (current) => {
      Object.assign(editForm, current)
    })

    const submit = async () => {
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        publishDate: editForm.publishDate.valueOf(),
        classify: editForm.classify,
      })

      result(res)
        .success(data => {
          message.success(data.msg)
          close()
        })
    }

    return {
      editForm,
      submit,
      props,
      close


    }
  }
})
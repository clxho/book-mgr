import {
  defineComponent,
  ref,
  onMounted,
} from 'vue'
import { message, Modal, Input } from 'ant-design-vue';
import AddOne from './AddOne/index.vue'
import Update from './Update/index.vue'
import {
  book
} from '@/service'
import {
  result,
  formatTimestamp,
  clone
} from '@/helpers/utils/index.js'

export default defineComponent({
  components: {
    AddOne,
    Update
  },
  setup() {
    const columns = [{
      title: '书名',
      dataIndex: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '库存',
      slots: {
        customRender: 'count'
      }
    },
    {
      title: '出版日期',
      dataIndex: 'publishDate',
    },
    {
      title: '分类',
      dataIndex: 'classify',
    },
    {
      title: '操作',
      slots: {
        customRender: 'actions'
      }
    }

    ]
    // 定义添加书籍弹框是否显示数据
    const show = ref(false)
    const showUpdateModal = ref(false)

    // 定义书籍列表数据
    const list = ref([])
    const total = ref(0)
    // 定义当前页
    const curPage = ref(1)
    // 定义每页显示的数据条数
    const pageSize = ref(5)
    // 搜索书名
    const keyword = ref('')
    // 返回是否显示
    const backisShow = ref(false)
    const curEditBook = ref({})

    // 获取书籍列表
    const getList = async () => {
      const res = await book.list({
        page: curPage.value,
        size: pageSize.value,
        keyword: keyword.value
      })
      result(res)
        .success(({
          data
        }) => {
          // 深拷贝书籍数据
          const newData = clone(data.list)
          // 对拷贝的数据数据的出版日期做格式化
          for (var i = 0; i < newData.length; i++) {
            newData[i].publishDate = formatTimestamp(newData[i].publishDate)
          }
          list.value = newData

          total.value = data.total
        })
    }

    onMounted(async () => {
      getList()
    }

    )
    // 切换当前页
    const setPage = (page) => {
      curPage.value = page;
      getList()
    }

    // 搜索书籍
    const searchBook = () => {
      getList()
      backisShow.value = Boolean(keyword.value)

    }
    // 返回
    const back = () => {
      keyword.value = ''
      backisShow.value = false
      getList()
    }
    // 删除书籍
    const removeBook = async ({ _id }) => {

      const res = await book.remove(_id)
      result(res)
        .success((data) => {
          message.success(data.msg)

          getList()
        })

    }
    // 入库与出库
    const updateCount = async (type, record) => {
      let word = '增加'

      if (type === 'OUT_COUNT') {
        word = '减少'
      }

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="__book_input_count" />
          </div>
        ),
        async onOk() {
          const el = document.querySelector('.__book_input_count')

          const res = await book.updateCount({
            id: record._id,
            num: el.value,
            type: type
          })

          result(res)
            .success(data => {
              message.success(data.msg)
              getList()
            })
        },
      })
    }
    // 编辑书籍
    const update = async ({record}) => {
      showUpdateModal.value = true
      curEditBook.value = record

    }
  


    return {
      columns,
      show,
      list,
      curPage,
      total,
      setPage,
      pageSize,
      keyword,
      searchBook,
      back,
      backisShow,
      removeBook,
      updateCount,
      showUpdateModal,
      update,
      curEditBook



    };
  }
})
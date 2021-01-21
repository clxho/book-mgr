import {
  defineComponent,
  reactive
} from 'vue';
import {
  auth
} from '@/service/index';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined
} from '@ant-design/icons-vue';
import {
  message
} from "ant-design-vue"
import { result } from '@/helpers/utils';
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
    // 注册用的表单数据
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: ''
    });
    // 注册功能
    const register = async () => {
      // 表单验证
      if (regForm.account === '') {
        message.info('请输入账户')
        return
      }
      if (regForm.password === '') {
        message.info('请输入密码')
        return
      }
      if (regForm.inviteCode === '') {
        message.info('请输入邀请码')
        return
      }

      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode)
      // 注册结果放映到前端
      result(res).
        success(data => {
          message.success(data.msg)
        })
      
      


    }

    // 登入用的表单数据
    const loginForm = reactive({
      account: '',
      password: '',

    });
    // 登入功能
    const login = async () => {
      // 表单验证
      if (loginForm.account === '') {
        message.info('请输入账户')
        return
      }
      if (loginForm.password === '') {
        message.info('请输入密码')
        return
      }

      const res = await auth.login(loginForm.account, loginForm.password)
      // 注册结果放映到前端
      result(res)
          .success(data => {
            message.success(data.msg)
          })


    }

    return {
      regForm,
      register,
      loginForm,
      login,
    }
  }
})
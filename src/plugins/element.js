import Vue from 'vue'
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Button,
  Container,
  Header,
  Aside,
  Main,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 挂载element Message组件到Vue中
Vue.prototype.$message = Message

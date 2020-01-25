/**
 * 按需引入element组件
 */
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
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn

} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
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

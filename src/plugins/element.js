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
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
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
Vue.use(Tag)
Vue.use(Tree)
// 挂载element Message组件到Vue中
Vue.prototype.$message = Message
// 挂载MessageBox.confirm到Vue原型
Vue.prototype.$confirm = MessageBox.confirm

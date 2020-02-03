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
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  TabPane,
  Tabs
} from 'element-ui'

// 引入外部js使用elementUi的时间线组件
import TimeLine from './timeline/index'
import TimeLineItem from './timeline-item/index'

Vue.use(Alert)
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
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(TimeLine)
Vue.use(TimeLineItem)
Vue.use(TabPane)
Vue.use(Tabs)
// 挂载element Message组件到Vue中
Vue.prototype.$message = Message
// 挂载MessageBox.confirm到Vue原型
Vue.prototype.$confirm = MessageBox.confirm

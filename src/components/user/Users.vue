<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片视图区域-->
    <el-card class="box-card">
      <!--     搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" @clear="getUserList" clearable>
            <el-button slot="append" @click="getUserList" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible =true">添加用户</el-button>
        </el-col>
      </el-row>

      <!--      添加用户弹窗-->
      <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="30%" @close="addDialogClosed"
      >
        <!--        主体区域-->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
          <!--          el-form-item中的prop是校验规则-->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <!--        底部操作区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
         </span>
      </el-dialog>

      <!--      用户列表-->
      <el-table
        :data="userlist" border stripe>
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态" width="180px">
          <!--          使用插槽获取当前行数据-->
          <template slot-scope="scope">
            <el-switch @change="userStateChange(scope.row)"
                       v-model="scope.row.mg_state">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--            修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!--            删除按钮-->
            <el-button type="danger" icon="el-icon-edit" size="mini"></el-button>
            <!--            分配角色按钮-->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页导航-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totoal">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
  export default {
    data() {
      // 验证邮箱的规则，使用箭头函数
      let checkEmail = (rule, value, callback) => {
        // 验证邮箱的正则表达式
        const regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        if (regEmail.test(value)) {
          // 合法邮箱
          return callback()
        } else {
          callback(new Error('请输入合法的邮箱'))
        }
      }
      // 验证手机的规则，使用箭头函数
      let checkPhone = (rule, value, callback) => {
        // 验证邮箱的正则表达式
        const regPhone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/

        if (regPhone.test(value)) {
          // 合法手机
          return callback()
        } else {
          callback(new Error('请输入合法的手机'))
        }
      }
      return {
        // 获取用户列表的请求参数对象
        queryInfo: {
          query: '',
          // 当前的页数
          pagenum: 1,
          // 当前每页显示多少条数据
          pagesize: 2
        },
        userlist: [],
        totoal: 0,
        // 控制添加用户弹窗显示的布尔值
        addUserDialogVisible: false,
        // 添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          email: '',
          phone: ''
        },
        // 添加用户的表单验证规则
        addFormRules: {
          // 验证用户名是否合法
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          // 验证密码是否合法
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          // 校验邮箱
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          // 校验手机
          phone: [
            { required: true, message: '请输入手机', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ]
        }

      }
    },
    created() {
      this.getUserList(this.queryInfo)
    },
    methods: {
      /**
       * 请求后台获取用户列表
       */
      async getUserList() {
        const { data: res } = await this.$http.get('users', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败')
        }
        this.userlist = res.data.users
        this.totoal = res.data.total
        console.log(res)
      },
      /**
       * 监听 页码值 改变的事件
       */
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },

      /**
       * 监听 pageSize 变化的事件
       */
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getUserList()
      },

      /**
       * 监听用户状态变化事件
       */
      async userStateChange(user) {
        console.log(user)
        const { data: res } = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        if (res.meta.status !== 200) {
          // 请求修改不成功则重置原值
          user.mg_state = !user.mg_state
          return this.$message.error('更新用户状态失败')
        }
        this.$message.success('更新用户状态成功')
      },
      /**
       * 监听添加用户对话框关闭事件
       */
      addDialogClosed() {
        // 获取添加用户表单的引用ref,重置表单
        this.$refs.addFormRef.resetFields()
      },
      /**
       * 添加用户操作
       */
      addUser() {
        // 获取添加用户表单的引用ref进行表单预校验
        this.$refs.addFormRef.validate(async valid => {
          console.log(valid)
          if (!valid) return
          // 发起网络请求添加用户到数据库
          const { data: res } = await this.$http.post('users', this.addForm)
          if (res.meta.status !== 201) {
            this.$message.error('添加用户失败')
          }
          this.$message.success('添加用户成功')
          // 隐藏添加用户的对话框
          this.addUserDialogVisible = false
          // 重新获取用户列表
          this.getUserList()
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>

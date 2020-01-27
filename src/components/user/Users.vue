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
            <el-button slot="append" @click="getUserList"  icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

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
        totoal: 0
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

      }
    }
  }
</script>

<style lang="less" scoped>

</style>

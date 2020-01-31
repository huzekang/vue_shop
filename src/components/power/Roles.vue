<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片视图-->
    <el-card class="box-card">
      123
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      // 获取权限列表
      async getRightsList() {
        const { data: res } = await this.$http.get('rights/list')
        this.rightsList = res.data
      }
    }
  }
</script>
<style lang="less" scoped>
</style>

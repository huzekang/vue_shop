<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片视图区域-->
    <el-card class="box-card">
      <!--      警告区域-->
      <el-alert title="注意：只允许为第三极分类设置相关参数！" :closable="false" type="warning" show-icon></el-alert>

      <!--      选择商品分类区域-->
      <el-row>
        <el-col class="cat_opt">
          <span>选择商品分类</span>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-card>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        cateList: []
      }
    },
    created() {
      this._getCateList()
    },
    methods: {
      async _getCateList() {
        const { data: res } = await this.$http.get('categories')
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类列表失败！')
        }
        this.cateList = res.data
        console.log(this.cateList)
      }
    }
  }
</script>
<style lang="less" scoped>
  .cat_opt {
    margin: 15px;
  }
</style>

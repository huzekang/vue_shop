<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片视图-->
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>

      <!--      表格-->

      <!--      分页区域-->
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 商品分类列表数据
        cateList: [],
        // 查询商品分类列表接口的请求参数
        queryInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        },
        // 总条数
        totoal: 0
      }
    },
    created() {
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品列表失败！')
        }
        // 把数据列表赋值给cateList
        this.cateList = res.data
        // 为总条数赋值
        this.total = res.data.totoal
      }
    }
  }
</script>
<style lang="less" scoped>
</style>

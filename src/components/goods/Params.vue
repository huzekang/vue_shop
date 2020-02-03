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
          <!--          选择商品分类的级联选择框-->
          <!--          option用来指定数据源-->
          <!--          props用来指定配置对象-->
          <!--          v-model用来指定选中选中的父级分类的Id数组-->
          <el-cascader
            v-model="selectedKeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange" clearable change-on-select></el-cascader>
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
        // 商品分类列表
        cateList: [],
        // 级联选择框的配置对象
        cateProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 级联选择框选中的key数组
        selectedKeys: []
      }
    },
    created() {
      this._getCateList()
    },
    methods: {
      // 获取商品分类列表
      async _getCateList() {
        const { data: res } = await this.$http.get('categories')
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类列表失败！')
        }
        this.cateList = res.data
        console.log(this.cateList)
      },

      // 级联选择框选中项变化，会触发
      handleChange() {
        console.log(this.selectedKeys)
      }
    }
  }
</script>
<style lang="less" scoped>
  .cat_opt {
    margin: 15px;
  }
</style>

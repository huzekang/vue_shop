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

      <!--      tab页签区域-->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!--        动态参数的面板-->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <!--        静态属性的面板-->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!--      json编辑器-->
    <my-json-editor></my-json-editor>

  </div>
</template>
<script>
  // 引入自定义组件
  import MyJsonEditor from '../editor/MyJsonEditor'

  export default {
    // 绑定标签名和组件
    components: {
      'my-json-editor': MyJsonEditor
    },

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
        selectedKeys: [],
        // tab页签激活的数据
        activeName: 'many',
        // 动态参数列表
        manyTableData: [],
        // 静态参数列表
        onlyTableData: []
      }
    },
    created() {
      this.getCateList()
    },
    methods: {
      // 获取商品分类列表
      async getCateList() {
        const { data: res } = await this.$http.get('categories')
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类列表失败！')
        }
        this.cateList = res.data
        console.log(this.cateList)
      },

      // 级联选择框选中项变化，会触发
      async handleChange() {
        this.getParamsData()
      },

      async getParamsData() {
        // 证明不是选中三级分类
        if (this.selectedKeys.length !== 3) {
          this.selectedKeys = []
          return
        }
        // 证明是选中三级分类
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: this.activeName } })
        if (res.meta.status !== 200) {
          return this.$message.error('获商品参数列表失败！')
        }

        console.log(res.data)
        if (this.activeName === 'many') {
          // 如果获取的数据是动态参数列表
          this.manyTableData = res.data
        } else {
          // 如果获取的数据是静态参数列表
          this.onlyTableData = res.data
        }
      },

      // tab页签点击变化监听事件
      handleTabClick() {
        this.getParamsData()
        console.log(this.activeName)
      }
    },
    computed: {
      // 如果按你需要被禁用，则返回true
      isBtnDisabled() {
        if (this.selectedKeys.length !== 3) {
          return true
        }
        return false
      },
      // 计算选择的分类id
      cateId() {
        if (this.selectedKeys.length === 3) {
          return this.selectedKeys[2]
        }
        return null
      }
    }
  }
</script>
<style lang="less" scoped>
  .cat_opt {
    margin: 15px;
  }
</style>

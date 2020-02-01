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
      <tree-table :data="cateList" :columns="columns"
                  :selection-type="false" :expand-type="false" show-index
                  index-text="#" border :show-row-hover="false"
      >
        <!--        是否有效-->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" style="color: lightgreen" v-if="scope.row.cat_deleted === false"></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>

        <!--        排序-->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <!--        操作-->
        <template slot="opt" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>

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
        totoal: 0,
        // 为tree table指定列的定义
        columns: [
          {
            label: '分类名称',
            prop: 'cat_name'
          },
          {
            label: '是否有效',
            type: 'template',
            // 表示当前这一列使用模板名称
            template: 'isok'
          },
          {
            label: '排序',
            type: 'template',
            // 表示当前这一列使用模板名称
            template: 'order'
          },
          {
            label: '操作',
            type: 'template',
            // 表示当前这一列使用模板名称
            template: 'opt'
          }
        ]
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
        this.cateList = res.data.result
        console.log(this.cateList)
        // 为总条数赋值
        this.total = res.data.totoal
      }
    }
  }
</script>
<style lang="less" scoped>
</style>

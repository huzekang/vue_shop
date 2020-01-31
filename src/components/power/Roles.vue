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
      <el-row>
        <el-row>
          <el-button type="primary">添加角色</el-button>
        </el-row>
      </el-row>

      <!--      角色列表区域-->
      <el-table
        :data="roleList" border stripe>
        <!--        展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!--         使用v-for循环一级权限，并为第一行加bdtop样式-->
            <el-row :class="['bdbottom',index1 ===0 ?'bdtop':'','vcenter']" v-for="(item1,index1) in scope.row.children"
                    :key="item1.id">
              <!--              渲染一级权限-->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--              渲染二、三级权限-->
              <el-col :span="19">
                <!--                通过v-for循环 嵌套渲染二级权限-->
                <el-row :class="[index2 ===0 ?'':'bdtop','vcenter']" v-for="(item2 , index2) in item1.children" :key="item2.id">
                  <el-col :span="5">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--                  通过v-for循环 嵌套渲染三级权限 放在一行中-->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3,index3) in item2.children">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--        索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column width="300px" prop="level" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        roleList: []
      }
    },
    created() {
      this.getRolesList()
    },
    methods: {
      // 获取权限列表
      async getRolesList() {
        console.log('xxxxx')
        const { data: res } = await this.$http.get('roles')
        if (res.meta.status !== 200) {
          return this.$message.error('获角色列表失败！')
        }
        this.roleList = res.data
        console.log(this.roleList)
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eeeeee;
  }

  .bdbottom {
    border-bottom: 1px solid #eeeeee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }
</style>

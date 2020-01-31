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

      <!--      分配角色权限对话框-->
      <el-dialog
        title="分配角色权限"
        :visible.sync="setRightDialogVisible"
        width="50%">
        <!--        主体区域-->
        <el-tree :data="rightList" :props="treeProps"></el-tree>
        <!--        底部操作区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
         </span>
      </el-dialog>

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
                <el-tag @close="removeRightById(scope.row,item1.id)"
                        :closable=true>{{item1.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--              渲染二、三级权限-->
              <el-col :span="19">
                <!--                通过v-for循环 嵌套渲染二级权限-->
                <el-row :class="[index2 ===0 ?'':'bdtop','vcenter']" v-for="(item2 , index2) in item1.children"
                        :key="item2.id">
                  <el-col :span="5">
                    <el-tag type="success" @close="removeRightById(scope.row,item2.id)"
                            :closable=true>{{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--                  通过v-for循环 嵌套渲染三级权限 放在一行中-->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3,index3) in item2.children"
                            @close="removeRightById(scope.row,item3.id)"
                            :closable=true>
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
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog">分配</el-button>
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
        // 所有角色列表数据
        roleList: [],
        // 控制分配权限的对话框展示与隐藏
        setRightDialogVisible: false,
        // 权限列表数据
        rightList: [],
        // 树形控件的属性绑定对象
        treeProps: {
          // 控件展示的属性名
          label: 'authName',
          // 递归的属性名
          children: 'children'
        }
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
      },
      // 根据id删除对应的权限
      async removeRightById(role, rightId) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        // 如果用户确认删除，则返回字符串confirm
        // 如果用户取消删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除！')
        }

        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除权限失败！')
        }
        // 不建议刷新权限列表，会折叠展开的组件
        // this.getRolesList()

        // 将删除接口返回的数据重新赋值给权限列表重新渲染
        role.children = res.data
      },
      // 展示分配权限的对话框
      async showSetRightDialog() {
        // 请求获取权限列表（树形结构）
        const { data: res } = await this.$http.get('rights/tree')
        if (res.meta.status !== 200) {
          return this.$message.error('获权限数据失败！')
        }
        // 把获取到的权限数据保存到data中
        this.rightList = res.data
        console.log(this.rightList)

        // 展示分配权限对话框
        this.setRightDialogVisible = true
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

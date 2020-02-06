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
          <!--          添加参数按钮-->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加参数
          </el-button>

          <!--          动态参数表格-->
          <el-table
            :data="manyTableData" border stripe>
            <!--            展开列-->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!--                循环渲染tag便签-->
                <el-tag closable v-for="(item,i) in scope.row.attr_vals" :key="i">
                  {{item}}
                </el-tag>
                <!--                输入的文本框-->
                <el-input v-if="scope.row.inputVisible"
                  class="input-new-tag"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!--        索引列-->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!--            修改按钮-->
                <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)" size="mini">
                  编辑
                </el-button>
                <!--            删除按钮-->
                <el-button type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)" size="mini">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!--        静态属性的面板-->
        <el-tab-pane label="静态属性" name="only">
          <!--          添加静态属性按钮-->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加属性
          </el-button>
          <!--          静态参数表格-->
          <el-table
            :data="onlyTableData" border stripe>
            <!--        索引列-->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!--            修改按钮-->
                <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)" size="mini">
                  编辑
                </el-button>
                <!--            删除按钮-->
                <el-button type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)" size="mini">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!--    添加参数的对话框-->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
      <!--        主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
        <!--          el-form-item中的prop是校验规则-->
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!--        底部操作区域-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addParams">确 定</el-button>
         </span>
    </el-dialog>

    <!--    编辑参数的对话框-->
    <el-dialog
      :title="'修改'+titleText"
      :visible.sync="editDialogVisible"
      width="50%" @close="editDialogClosed">
      <!--        主体区域-->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
        <!--          el-form-item中的prop是校验规则-->
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!--        底部操作区域-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editParams">确 定</el-button>
         </span>
    </el-dialog>


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
        onlyTableData: [],
        // 添加参数/属性的对话框显示与隐藏控制
        addDialogVisible: false,
        // 添加参数的表单数据对象
        addForm: {
          attr_name: ''
        },
        // 添加表单的验证规则对象
        addFormRules: {
          attr_name: [
            { required: true, message: '请输入参数名称', trigger: 'blur' }
          ]
        },
        // 编辑参数/属性的对话框显示与隐藏控制
        editDialogVisible: false,
        // 编辑参数的表单数据对象
        editForm: {
          attr_name: '',
          attr_id: null
        },
        // 编辑表单的验证规则对象
        editFormRules: {
          attr_name: [
            { required: true, message: '请输入参数名称', trigger: 'blur' }
          ]
        }
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

        // 分割可选项字符串，变成数组
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? (item.attr_vals || '').split(' ') : []
          // 控制文本框的显示与隐藏
          item.inputVisible = false
          // 文本框中输入的值
          item.inputValue = ''
        })
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
      },

      // 监听对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },

      // 点击按钮，添加参数
      addParams() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`,
            {
              attr_name: this.addForm.attr_name,
              attr_sel: this.activeName
            })
          if (res.meta.status !== 201) {
            return this.$message.error('添加参数失败！')
          }
          this.$message.success('添加参数成功！')
          this.addDialogVisible = false
          this.getParamsData()
        })
      },

      // 点击按钮，确认修改参数信息
      editParams() {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          })
          if (res.meta.status !== 200) {
            return this.$message.error('修改参数失败！')
          }

          this.$message.success('修改参数成功！')
          this.getParamsData()
          this.editDialogVisible = false
        })
      },

      // 重置编辑的表单
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
      },

      // 点击按钮，展示修改的对话框
      async showEditDialog(attrId) {
        this.editDialogVisible = true
        // 查询当前参数的信息
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${attrId}`, { params: { attr_sel: this.activeName } })
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数信息失败！')
        }
        // 重置修改的表单，进行赋值
        this.editForm = res.data
        this.editDialogVisible = true
      },

      // 根据id删除对应的参数项目
      async removeParams(attrId) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
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

        // 删除的业务逻辑
        const { data: res } = await this.$http.delete(`categories/${this.cateId}/attributes/${attrId}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除参数失败！')
        }

        this.$message.success('删除参数成功！')
        this.getParamsData()
      },

      // 文本框失去焦点或摁下enter都会触发
      handleInputConfirm() {
        this.inputVisible = false
      },

      // 点击按钮，展示文本输入框
      showInput(row) {
        row.inputVisible = true
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
      },
      // 动态计算标题的文本
      titleText() {
        if (this.activeName === 'many') {
          return '动态参数'
        } else {
          return '静态属性'
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .cat_opt {
    margin: 15px;
  }

  .el-tag {
    margin: 10px;
  }

  .input-new-tag {
    width: 100px;
  }
</style>

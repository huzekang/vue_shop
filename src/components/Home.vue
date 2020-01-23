<template>
  <el-container class="home-container">
    <!--      头部区域-->
    <el-header>
      <div>
        <img src="../assets/heima.png">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--      页面主体区域-->
    <el-container>
      <!--        侧边-->
      <el-aside width="200px">
        <!--        侧边菜单-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--          一级菜单 (添加:代表标签的动态属性)-->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!--            一级菜单模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>{{item.authName}}</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item :index="submenu.id+''" v-for="submenu in item.children" :key="submenu.id">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-location"></i>
                <!--              文本-->
                <span>{{submenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--        右侧内容-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        // 左侧菜单数据
        menulist: []
      }
    },
    created() {
      this.getMenuList()
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      /**
       * 获取所有的菜单
       */
      async getMenuList() {
        // 解构出promise对象中的data
        // ![](http://image-picgo.test.upcdn.net/img/20200123122711.png)
        const { data: res } = await this.$http.get('menus')
        // 接口返回不正常，则用消息组件显示后台返回数据的错误提示
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        } else {
          this.$message.success(res.meta.msg)
          this.menulist = res.data
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /*最外层容器撑满全屏*/
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>

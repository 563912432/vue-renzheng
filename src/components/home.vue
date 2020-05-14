<template>
  <div class="frame">
    <div>
      <!--头部-->
      <div class="header bg-green">
        <div class="f-l logo">
          <img src="../assets/images/logo-cer.png">
        </div>
        <div class="f-r user">
          <a target="">{{com.company}}</a> &nbsp;|&nbsp; <a @click="toAbort" style="cursor: pointer;">退出</a>
        </div>
        <div class="clear"></div>
        <el-menu
                style="height: 48px;padding-left: 50px;"
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#1F84C6"
                text-color="#fff"
                active-text-color="#fff">
          <el-menu-item index="1">
            <a :href="[urlType == 0 ? 'javascript:;' : '#/home/indexcertificate']"><div>首页</div></a>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">抵扣勾选</template>
            <el-menu-item index="2-1">
              <a class="color-black" :href="[urlType == 0 ? 'javascript:;' : '#/home/check']"><div>发票抵扣勾选</div></a>
            </el-menu-item>
            <el-menu-item index="2-2">
              <a class="color-black" :href="[urlType == 0 ? 'javascript:;' : '#/home/upload']"><div>发票批量抵扣勾选</div></a>
            </el-menu-item>
            <el-menu-item index="2-3">
              <a class="color-black" :href="[urlType == 0 ? 'javascript:;' : '#/home/deduction']"><div>发票不抵扣勾选</div></a>
            </el-menu-item>
            <el-menu-item index="2-4">逾期发票抵扣勾选</el-menu-item>
            <el-menu-item index="2-5">出口转内销发票勾选</el-menu-item>
            <el-menu-item index="2-6">
              <a class="color-black" :href="[urlType == 0 ? 'javascript:;' : '#/home/count']"><div>抵扣勾选统计</div></a>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">退税勾选</el-menu-item>
          <el-menu-item index="4">代办退税勾选</el-menu-item>
          <el-submenu index="5">
            <template slot="title">进项发票查询</template>
            <el-menu-item index="5-1">单票查询</el-menu-item>
            <el-menu-item index="5-2">发票检查</el-menu-item>
            <el-menu-item index="5-3">出口转内销发票查询</el-menu-item>
          </el-submenu>
          <el-menu-item index="6">税务事项通知书</el-menu-item>
          <el-menu-item index="7">成品油消费税管理</el-menu-item>
          <el-menu-item index="8">发票下载</el-menu-item>
          <el-menu-item index="9">
            <!--企业档案信息-->
            <a :href="[urlType == 0 ? 'javascript:;' : '#/home/info']"><div>企业档案信息</div></a>
          </el-menu-item>
          <el-menu-item @click="saveAnswer">保存操作结果</el-menu-item>
        </el-menu>
      </div>
    </div>
    <!--home 监听info页面内的setPersonnelInfo方法来决定是否解放url权限-->
    <router-view></router-view>
    <!--底部-->
    <div class="footer bg-green">
      本系统为教学系统，版权归属于我的实务学习云平台
    </div>
  </div>
</template>

<script>
  import common from '../mixins/common'

  export default {
    name: "Home",
    mixins: [common],
    data() {
      return {
        hasCompany: 0, // 切换企业 和 操作手册切换依据
        urlType: 1,
        // newdata
        activeIndex: '1',
        activeIndex2: '1',
        com: ''
      }
    },
    mounted() {
      // 同步企业基本信息
      this.synchronizeComInfo()
    },
    methods:{
      saveAnswer() {
        this.saveBusiness()
      },
      // 退出系统
      toAbort() {
        // 清一下数据
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  .frame .header .el-menu--horizontal>.el-submenu .el-submenu__title,
  .frame .header .el-menu--horizontal>.el-menu-item{
    height: 47px;
    line-height: 47px;
  }
</style>
<style scoped>
  a div{
    width: 100%;
    height: 100%;
  }
  .color-black{
    color: #ffffff;
  }
  .frame {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .footer{
    background: #474747;
    width: 100%;
    padding: 20px 0;
    margin: 0 auto;
    line-height: 30px;
    text-align: center;
    color: #aaa;
  }
  .do-next{
    background: url("../assets/images/do_next.png");
  }
  .header {
    min-width: 1280px;
  }
</style>

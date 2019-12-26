<template>
  <div class="frame">
    <el-container style="overflow:auto;">
      <el-header style="height: 110px;">
        <!--头部-->
        <div class="bg-f login-head">
          <div class="width-1200 relative">
            <div class="f-l">
              <img src="../assets/images/logo2.gif">
            </div>
            <div class="f-r ribbon">
              <a href="javascript:void(0);" title="流程指引" class="lczy notice1">
                <span>流程指引</span>
              </a>
              <a href="javascript:void(0);" title="检测环境" class="jchj notice1">
                <span>检测环境</span>
              </a>
              <a href="javascript:void(0);" title="升级公告" class="sjgg notice1">
                <span>历史公告</span>
              </a>
              <a href="javascript:void(0);" title="常见问题" class="cjwt notice1">
                <span>常见问题</span>
              </a>
              <a v-if="hasCompany" href="javascript:void(0);" title="切换企业" class="czsc change-trade">
                <span>切换企业</span>
              </a>
              <a v-else href="javascript:void(0);" title="操作手册" class="czsc notice1">
                <span>操作手册</span>
              </a>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </el-header>
      <el-container style="min-width: 1250px;">
        <el-main>
          <!--中间-->
          <div class="login-cont">
            <div class="width-1200 relative">
              <img src="../assets/images/new_login_pic.png" class="bj2">
              <div class="login_box">
                <div class="mbbox">
                  <ul>
                    <li id="mb2" class="font-18 hover">系统登录</li>
                  </ul>
                </div>
                <div class="conbox">
                  <div id="con_mb_2" style="padding: 0 30px;">
                    <div class="pd-vertical-10">
                      <div class="login_input">
                        <img class="login-key-icon" src="../assets/images/login_key_icon.gif">
                        <el-input v-model="certifyPwd" show-password :clearable="true" style="height: 48px !important;" placeholder="输入金税盘、税控盘或税务Ukey证书密码"></el-input>
                      </div>
                    </div>
                    <div v-if="platPwdType">
                      <div class="pd-vertical-10">
                        <div class="login_input">
                          <span>平台密码：</span>
                          <el-input prefix-icon="iconfont new_iconupan" v-model="platPwd" placeholder="输入平台密码"></el-input>
                        </div>
                      </div>
                      <div class="f-r mg-right-5">
                        <a href="#" class="for_key for_key_alert">忘记平台密码？</a>
                      </div>
                      <div class="clear"></div>
                    </div>
                    <div class="pd-vertical-10">
                      <el-button type="primary" class="sub_1" @click="toLogin">登录</el-button>
                    </div>
                  </div>
                  <div class="login-info-foot">
                    <div class="driver_div">首次访问请下载驱动程序和应用客户端</div>
                    <div class="fav_div">欢迎收藏本站</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer>
          <div class="width-1200">
            本系统为教学系统，版权归属于我的实务学习云平台
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // import AnswerBoard from './answer-board'
  import common from '../mixins/common'
  import axios from 'axios'
  import { mapState } from 'vuex'
  export default {
    name: "Index",
    mixins: [common],
    // components:{
    //   AnswerBoard
    // },
    data() {
      return {
        hasCompany: 0, // 切换企业 和 操作手册切换依据
        platPwdType: 0, // 平台密码是否开启
        platPwd: '', // 平台密码
        certifyPwd: '', // 金税盘密码
      }
    },
    created() {
      // 初始化state数据
      this.$store.commit('delState')
      this.getCompany()
    },
    methods:{
      getCompany() {
        // var preset = {
        //   company: {
        //     admin_id: "11",
        //     certify_pwd: "12345678",
        //     check_end: "1546185600",
        //     check_start: "1543852800",
        //     check_time: "1546185600",
        //     company: "山东问云机械有限公司",
        //     confirm_time: "1546185600",
        //     id: "13",
        //     level: "B",
        //     old_no: "370305755666003",
        //     province: "山东",
        //     sub_date: "月",
        //     tax_deadline: "1547481600",
        //     tax_no: "91370305755666003U",
        //     tax_time: "1543593600",
        //     trade_id: "1",
        //   },
        //   invoice: [
        //     {
        //       admin_id: "11",
        //       certify_state: "0",
        //       certify_time: null,
        //       check_state: "0",
        //       check_time: null,
        //       cid: "13",
        //       code: "3700171130",
        //       create_time: "1543852800",
        //       id: "1327",
        //       money: "120000.00",
        //       no: "1",
        //       number: "32544580",
        //       protect: "1",
        //       saler_name: "淄博天成塑业有限公司",
        //       saler_tax_no: "91370305755362038U",
        //       scan_state: "0",
        //       scan_time: null,
        //       state: "1",
        //       tax_cate: "1",
        //       tax_money: "19200.00",
        //       userid: null
        //     }
        //   ]
        // }
        // 获取session内的预设信息
        // 调试
        var info = '{"answer":{"invoiceList":[{"id":"1327","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"32544580","create_time":"1543852800","saler_name":"淄博天成塑业有限公司","saler_tax_no":"91370305755362038U","money":"120000.00","tax_money":"19200.00","state":"1","check_state":"1","check_time":"2019-11-23","certify_state":"1","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"19200.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1328","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35650560","create_time":"1543939200","saler_name":"济南百全管材制造有限公司","saler_tax_no":"913123565000254150","money":"121900.00","tax_money":"19504.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"19504.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1329","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"56898754","create_time":"1543939200","saler_name":"淄博振华物流有限公司","saler_tax_no":"91370302377683301U","money":"1000.00","tax_money":"100.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"100.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1330","userid":null,"admin_id":"11","cid":"13","no":"1","code":"137030925306","tax_cate":"1","number":"00151264","create_time":"1544198400","saler_name":"淄博明珠旗瑞汽车销售有限公司","saler_tax_no":"91370303661976381U","money":"45344.83","tax_money":"7255.17","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"7255.17","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1331","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35895789","create_time":"1544284800","saler_name":"中国石油天然气股份有限公司山东淄博销售分公司","saler_tax_no":"91370303731731255U","money":"6780.40","tax_money":"1084.86","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"1084.86","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1332","userid":null,"admin_id":"11","cid":"13","no":"1","code":"4101174140","tax_cate":"1","number":"78650567","create_time":"1544371200","saler_name":"郑州聚鑫五金商贸有限公司","saler_tax_no":"914101565000254150","money":"15000.00","tax_money":"2400.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"2400.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1333","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"30053689","create_time":"1544544000","saler_name":"淄川区商家磊发耐火材料营销部 （淄川区国税局商家分局代开）","saler_tax_no":"9137030208DK00239U","money":"7220.00","tax_money":"216.60","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"216.60","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1334","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35678560","create_time":"1544630400","saler_name":"淄博银座商城有限责任公司","saler_tax_no":"91370321798679867U","money":"12580.00","tax_money":"2012.80","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"2012.80","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1335","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"30052440","create_time":"1544716800","saler_name":"青岛奥神化工有限公司","saler_tax_no":"91302565658744560U","money":"27360.00","tax_money":"4377.60","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"4377.60","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1336","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35678599","create_time":"1544716800","saler_name":"淄博银座商城有限责任公司","saler_tax_no":"91370321798679867U","money":"5800.00","tax_money":"928.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"928.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1337","userid":null,"admin_id":"11","cid":"13","no":"1","code":"4100174130","tax_cate":"1","number":"36580548","create_time":"1544889600","saler_name":"郑州聚鑫五金商贸有限公司","saler_tax_no":"91356500032565541U","money":"68000.00","tax_money":"10880.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"10880.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1338","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"14785236","create_time":"1545148800","saler_name":"淄博供电公司高新区分公司","saler_tax_no":"91370305755365987U","money":"2783.04","tax_money":"445.29","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"445.29","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""},{"id":"1339","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"78945612","create_time":"1545840000","saler_name":"山东永润商贸有限公司","saler_tax_no":"91370300032565541U","money":"6600.00","tax_money":"1056.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1","declare_tax_money":"1056.00","checkCertification":"否","checkCertificationdate":"","scanningCertification":"否","scanningCertificationdate":""}]},"company":{"id":"13","province":"山东","company":"山东问云机械有限公司","certify_pwd":"123","tax_no":"91370305755666003U","old_no":"370305755666003","level":"B","sub_date":"月","tax_time":"1543593600","tax_deadline":"1547481600","check_start":"1543852800","check_end":"1546185600","check_time":"1546185600","confirm_time":"1546185600","trade_id":"1","admin_id":"11"},"invoice":[{"id":"1327","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"32544580","create_time":"1543852800","saler_name":"淄博天成塑业有限公司","saler_tax_no":"91370305755362038U","money":"120000.00","tax_money":"19200.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1328","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35650560","create_time":"1543939200","saler_name":"济南百全管材制造有限公司","saler_tax_no":"913123565000254150","money":"121900.00","tax_money":"19504.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1329","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"56898754","create_time":"1543939200","saler_name":"淄博振华物流有限公司","saler_tax_no":"91370302377683301U","money":"1000.00","tax_money":"100.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1330","userid":null,"admin_id":"11","cid":"13","no":"1","code":"137030925306","tax_cate":"1","number":"00151264","create_time":"1544198400","saler_name":"淄博明珠旗瑞汽车销售有限公司","saler_tax_no":"91370303661976381U","money":"45344.83","tax_money":"7255.17","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1331","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35895789","create_time":"1544284800","saler_name":"中国石油天然气股份有限公司山东淄博销售分公司","saler_tax_no":"91370303731731255U","money":"6780.40","tax_money":"1084.86","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1332","userid":null,"admin_id":"11","cid":"13","no":"1","code":"4101174140","tax_cate":"1","number":"78650567","create_time":"1544371200","saler_name":"郑州聚鑫五金商贸有限公司","saler_tax_no":"914101565000254150","money":"15000.00","tax_money":"2400.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1333","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"30053689","create_time":"1544544000","saler_name":"淄川区商家磊发耐火材料营销部 （淄川区国税局商家分局代开）","saler_tax_no":"9137030208DK00239U","money":"7220.00","tax_money":"216.60","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1334","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35678560","create_time":"1544630400","saler_name":"淄博银座商城有限责任公司","saler_tax_no":"91370321798679867U","money":"12580.00","tax_money":"2012.80","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1335","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"30052440","create_time":"1544716800","saler_name":"青岛奥神化工有限公司","saler_tax_no":"91302565658744560U","money":"27360.00","tax_money":"4377.60","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1336","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"35678599","create_time":"1544716800","saler_name":"淄博银座商城有限责任公司","saler_tax_no":"91370321798679867U","money":"5800.00","tax_money":"928.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1337","userid":null,"admin_id":"11","cid":"13","no":"1","code":"4100174130","tax_cate":"1","number":"36580548","create_time":"1544889600","saler_name":"郑州聚鑫五金商贸有限公司","saler_tax_no":"91356500032565541U","money":"68000.00","tax_money":"10880.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1338","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"14785236","create_time":"1545148800","saler_name":"淄博供电公司高新区分公司","saler_tax_no":"91370305755365987U","money":"2783.04","tax_money":"445.29","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"},{"id":"1339","userid":null,"admin_id":"11","cid":"13","no":"1","code":"3700171130","tax_cate":"1","number":"78945612","create_time":"1545840000","saler_name":"山东永润商贸有限公司","saler_tax_no":"91370300032565541U","money":"6600.00","tax_money":"1056.00","state":"1","check_state":"0","check_time":null,"certify_state":"0","certify_time":null,"scan_state":"0","scan_time":null,"protect":"1"}]}'
        this.$store.commit('clonePreset', info)
        // 注释
        var preset = sessionStorage.getItem('preset')
        if(preset) {
          // 同步企业基本信息
          this.$store.commit('clonePreset', preset)

          var pubData = this.$store.state.publicData
          if(pubData['plat'] != undefined){
            this.platPwdType = pubData['plat'].platEnable
          }
        }
      },
      toLogin(){
        // 同步登录密码
        var trade_id = this.$store.state.preset.trade_id
        var certifyPwd = this.$store.state.preset.companyInfo.company[trade_id].certify_pwd
        if(this.$store.state.publicData.plat != undefined){
          var platPwd = this.$store.state.publicData.plat.pwdone
        }
        if(this.certifyPwd){
          // 判断金税盘密码
          if(this.certifyPwd == certifyPwd){
            // 判断平台密码是否开启
            if(this.platPwdType){
              if(this.platPwd == platPwd){
                this.$router.push('/home/indexcertificate')
              }else{
                this.$message({
                  message: '平台密码错误',
                  type: 'warning'
                });
              }
            }else{
              this.$router.push('/home/indexcertificate')
            }
          }else{
            this.$message({
              message: '金税盘密码错误',
              type: 'warning'
            });
          }
        }else{
          this.$message.error('金税盘密码不能为空！');
        }
      }
    }
  }
</script>

<style>
  .login_input .el-input__inner{
    padding: 0 0 0 45px !important;
  }
</style>
<style scoped>
  .login-key-icon{
    position: absolute;
    z-index: 2;
    top: 113px;
    left: 45px;
  }
  .driver_div{
    background: url("../assets/images/index_icon_download.png") left center no-repeat;
    padding-left: 40px;
  }
  .fav_div{
    background: url("../assets/images/index_icon_fav.png") left center no-repeat;
    padding-left: 40px;
  }
  .login-info-foot{
    margin-top: 20px;
    font-size: 12px;
    line-height: 30px;
    background: #f4f4f4;
    border-top: 1px solid #e3e3e3;
    padding: 10px 30px;
    border-radius: 0 0 2px 2px;
    text-align: left;
  }
  .bj2{
    position: absolute;
    left: 9%;
    top: 45px;
  }
  .mr-5{
    margin-right: 5px;
  }
  .mt-10{
    margin-bottom: 10px;
  }
  .frame {
    width: 100%;
    height: 100%;
  }
  .float-right{
    float: right;
  }
  .el-header {
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  .el-footer {
    padding: 30px;
    color: #333;
    text-align: center;
    /*line-height: 15px;*/
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    color: #333;
    text-align: center;
    padding: 0px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .login-cont {
    background: url("../assets/images/new_login_bg.gif") no-repeat;
    background-size: cover;
  }
  .do-next{
    background: url("../assets/images/do_next.png");
  }
</style>

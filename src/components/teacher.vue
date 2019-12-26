<template>
  <div class="frame">
    <el-container style="overflow:auto;">
      <el-header style="height: 120px;">
        <!--头部-->
        <div class="bg-f login-head">
          <div class="width-1200 relative">
            <div class="f-l">
              <img src="../assets/images/login-logo.gif">
            </div>
            <div class="f-r ribbon">
              <a href="javascript:void(0);" title="流程指引" class="lczy notice1">
                <span>流程指引</span>
              </a>
              <a href="javascript:void(0);" title="检测环境" class="jchj notice1">
                <span>检测环境</span>
              </a>
              <a href="javascript:void(0);" title="升级公告" class="sjgg notice1">
                <span>升级公告</span>
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
              <div class="login_box">
                <div class="mbbox">
                  <ul>
                    <li id="mb2" class="font-18 hover">系统登录</li>
                  </ul>
                </div>
                <div class="conbox">
                  <div id="con_mb_2">
                    <div class="pd-vertical-10">
                      <div class="login_input">
                        <span>证书密码：</span>
                        <el-input prefix-icon="iconfont new_iconupan" v-model="certifyPwd" style="width: 74%;" placeholder="输入税控盘/金税盘证书密码"></el-input>
                      </div>
                    </div>
                    <div v-if="platPwdType">
                      <div class="pd-vertical-10">
                        <div class="login_input">
                          <span>平台密码：</span>
                          <el-input prefix-icon="iconfont new_iconupan" v-model="platPwd" style="width: 74%;" placeholder="输入平台密码"></el-input>
                        </div>
                      </div>
                      <div class="f-r mg-right-5">
                        <a href="#" class="for_key for_key_alert">忘记平台密码？</a>
                      </div>
                      <div class="clear"></div>
                    </div>
                    <div class="pd-vertical-10">
                      <!--<input class="sub_1" @click="toLogin" value="登录">-->
                      <el-button type="primary" class="sub_1" @click="toLogin">登录</el-button>
                    </div>
                    <!--<div class="login_word">-->
                      <!--<span>证书密码默认为：<a>12345678</a></span>-->
                    <!--</div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer>
          <div class="width-1200">
            <!--本系统为教学系统，版权归属于我的实务学习云平台-->
            本系统为教学系统，版权归属于我的实务学习云平台
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <!--答题板部分-->
    <AnswerBoard v-if="boardStatus" class="answerBoard">
      <div v-if="boardType" slot="content">
        {{businessInfo.content}}
      </div>
      <div v-else slot="material">
        <!--<p><Tag color="blue">相关材料</Tag></p>{{businessInfo.material}}-->
      </div>
      <div slot="buttons">
        <el-button class="mr-5 mt-10 mr-10 float-right" type="primary" size="mini" @click="businessSwitch('next')">下一题</el-button>
        <el-button class="mr-5 mt-10 mr-10 float-right" type="primary" size="mini" @click="businessSwitch('previous')">上一题</el-button>
        <el-button v-if="companyStatus != 0" class="mr-5 mt-10 float-right" type="primary" size="mini" @click="saveBusiness">
          保存业务答案
        </el-button>
        <el-button v-if="companyStatus == 0 && sumbitType" class="mr-5 mt-10 float-right" type="primary" size="mini"
                @click="saveBusiness">提交操作结果
        </el-button>
        <!--<Button class="mr-5" v-if="boardType" @click="materialTagSwitch" >相关材料</Button>-->
        <!--<Button class="mr-5" v-else type="primary" ghost @click="materialTagSwitch" >相关材料</Button>-->
      </div>
    </AnswerBoard>
    <div v-else class="do-next" @click="closeBoard"></div>
  </div>
</template>

<script>
  import AnswerBoard from './answer-board'
  import common from '../mixins/common'
  import axios from 'axios'
  export default {
    name: "Index",
    mixins: [common],
    components:{
      AnswerBoard
    },
    data() {
      return {
        businessCode: 0, // 当前操作业务编号
        boardStatus: 0, // 题板状态
        businessInfo: {}, // 业务内容
        boardType: 1, // 业务内容/材料内容切换
        companyStatus: 0, // 当前系统操作者身份
        sumbitType: 0,


        hasCompany: 0, // 切换企业 和 操作手册切换依据
        platPwdType: 0, // 平台密码是否开启
        platPwd: '', // 平台密码
        certifyPwd: '' // 金税盘密码
      }
    },
    mounted: function () {
      // 初始化state数据
      this.$store.commit('delState')
      var url_trade_id = this.$router.history.current.query.tid
      // 接口调用获取企业相关信息
      if(url_trade_id){
        axios.post(host + '/company/list',{id: url_trade_id}).then(res => {
          var com = res.data.data.data[0]

          // 模拟数据结构
          var preset = {}
          preset['trade_id'] = url_trade_id
          preset['businessCode'] = 0
          preset['platPwdType'] = 0 // 平台密码是否开启
          preset['operatorStatus'] = 1 // 登陆者身份 0:学员操作 1:答案发布
          preset['companyInfo'] = {}
          if(!preset['companyInfo']['company']){
            preset['companyInfo']['company'] = {}
          }
          if(!preset['companyInfo']['preset']){
            preset['companyInfo']['preset'] = {}
          }
          if(!preset['companyInfo']['business']){
            preset['companyInfo']['business'] = {}
          }

          preset['companyInfo']['company'][url_trade_id] = com
          preset['companyInfo']['preset'][url_trade_id] = com.preset
          preset['companyInfo']['business'][url_trade_id] = com.business

          this.$store.commit('clonePreset', preset) // 同步总线数据

          // 初始化可操作性发票数据
          if((res.data.data.data[0].invoice).length != 0){
            this.$store.commit('cloneInvoiceList', res.data.data.data[0].invoice)
          }else{
            this.$store.commit('cloneInvoiceList', com.preset)
          }

          setTimeout(() => {
            // 业务提示面板
            this.closeBoard()
            // 操作者身份确认
            this.companyStatus = 1
            // 获取业务信息
            this.setBusinessInfo();
            // 同步业务编号
            this.businessCode = this.$store.state.preset.businessCode
            // 获取平台密码开启状态
            var pubData = this.$store.state.publicData
            if(pubData['plat'] != undefined){
              this.platPwdType = pubData['plat'].platEnable
            }

          },50)
        })
        axios.get(host + '/company/answer/'+ url_trade_id).then(res => {
          if(res.data.error_code == 0){
            if(res.data.data[0] != null){
              if(res.data.data[0]['Info'] == undefined){
                res.data.data[0]['Info'] = {
                  Email: "",
                  address: "",
                  name: "",
                  tel: "",
                  zipCode: "",
                }
              }else if(res.data.data[0]['plat'] == undefined){
                res.data.data[0]['plat'] = {
                  disabled: "0",
                  editPlat: "0",
                  platAnswer: "",
                  platEnable: "",
                  platQuestion: "",
                  pwdone: "",
                  pwdtwo: "",
                }
              }
              this.$store.commit('clonePublicData', res.data.data[0]) // 同步操作数据
            }
          }else{
            this.$message.error('操作答案获取失败')
          }
        })
      }else{
        this.$message.error('企业信息查询失败！')
      }
    },
    methods:{
      toLogin(){
        // 同步登录密码
        var trade_id = this.$store.state.preset.trade_id
        var certifyPwd = this.$store.state.preset.companyInfo.company[trade_id].certifypwd
        if(this.$store.state.publicData.plat != undefined){
          var platPwd = this.$store.state.publicData.plat.pwdone
        }
        if(this.certifyPwd){
          // 判断金税盘密码
          if(this.certifyPwd == certifyPwd){
            // 判断平台密码是否开启
            if(this.platPwdType){
              if(this.platPwd == platPwd){
                this.$router.push('/home/info')
              }else{
                this.$message({
                  message: '平台密码错误',
                  type: 'warning'
                });
              }
            }else{
              this.$router.push('/home/info')
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
      },
    }
  }
</script>

<style scoped>
  .frame {
    width: 100%;
    height: 100%;
    padding-top: 140px;
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
    background: url("../assets/images/login_bg.gif") center bottom no-repeat #a2f3f7;
  }
  .do-next{
    background: url("../assets/images/do_next.png");
  }
</style>

<template>
  <div class="content">
    <!--面包屑-->
    <div class="breadCrumb">
      <div class="width-1200">
        <div class="iconfont rz-iconditu float-left font-24"></div>
        <a class="float-left font-16 ml-25">当前位置：<a>首页</a></a>
        <div class="iconfont rz-iconyou float-right font-24"></div>
        <a class="float-right font-16 mr-5">帮助</a>
      </div>
    </div>
    <div class="workplat">
      <div class="w-title">
        <p class="float-left">
          当前税款所属期：
          <span class="col-red">2019年12月</span>
          <span class="col-hui fs-18">（当期可勾选、确认截止日期为：{{tax_deadline}}）</span>
        </p>
        <p class="float-right fs-18">
          年度：2019
        </p>
      </div>
      <div class="w-content" v-show="conShow">
        <div class="tabBrBg"></div>
        <div class="con-left">
          <div class="con-left-top">
            <ul class="bd_box_list1">
              <li v-if="timeMonth === 12">抵扣发票
                <a class="bd_list_a" href="javascript:void(0);">{{numTotal}}</a>
                份，税额合计：
                <span>{{tax_moneyTotal}}</span>元
              </li>
              <li v-else>抵扣发票
                <a class="bd_list_a" href="javascript:void(0);">0</a>
                份，税额合计：
                <span>0</span>元
              </li>
            </ul>
          </div>
          <div class="con-left-bottom">
            <ul class="bd_box_list2">
              <li>您有<a class="bd_list_a" href="javascript:void(0);">0</a>张当期已确认抵扣的发票被判定为非正常发票，请进行相关处理！</li>
              <li>您有<a class="bd_list_a" href="javascript:void(0);">0</a>张往期已抵扣的发票被判定为非正常发票，请在当期进行进项税额转出处理！</li>
              <hr>
              <li>您有<a class="bd_list_a" href="javascript:void(0);">0</a>张当期已确认抵扣的出口转内销发票被判定为非正常发票，请进行相关处理！</li>
              <li>您有<a class="bd_list_a" href="javascript:void(0);">0</a>张往期已抵扣的出口转内销发票被判定为非正常发票，请在当期进行进项税额转出处理！</li>
            </ul>
          </div>
        </div>
        <div class="con-right" v-if="timeMonth === 12">
          <div class="con-right-a">
            <a class="color-black" href="#/home/check">
              <img src="../../assets/public/tabBar_wsb.png">
            </a>
          </div>
          <div class="con-right-a">
            <!--回退税款所属期-->
            <img @click="initializeInvoice" src="../../assets/public/tabBar_ht.png">
          </div>
          <div class="con-right-a">
            <!--注销勾选-->
            <img src="../../assets/public/tabBar_zxgx.png">
          </div>
        </div>
        <div class="con-right" v-else>
          <div class="con-right-a">
            <img src="../../assets/public/tabBar_ysb.png">
          </div>
        </div>
      </div>
      <div class="w-bottom">
        <ul class="clearfix">
          <li class="finish" :class="timeMonth == 1? 'finish_on': ''" @click="selectMonth(1)">1月</li>
          <li class="finish" :class="timeMonth == 2? 'finish_on': ''" @click="selectMonth(2)">2月</li>
          <li class="finish" :class="timeMonth == 3? 'finish_on': ''" @click="selectMonth(3)">3月</li>
          <li class="finish" :class="timeMonth == 4? 'finish_on': ''" @click="selectMonth(4)">4月</li>
          <li class="finish" :class="timeMonth == 5? 'finish_on': ''" @click="selectMonth(5)">5月</li>
          <li class="finish" :class="timeMonth == 6? 'finish_on': ''" @click="selectMonth(6)">6月</li>
          <li class="finish" :class="timeMonth == 7? 'finish_on': ''" @click="selectMonth(7)">7月</li>
          <li class="finish" :class="timeMonth == 8? 'finish_on': ''" @click="selectMonth(8)">8月</li>
          <li class="finish" :class="timeMonth == 9? 'finish_on': ''" @click="selectMonth(9)">9月</li>
          <li class="finish" :class="timeMonth == 10? 'finish_on': ''" @click="selectMonth(10)">10月</li>
          <li class="finish" :class="timeMonth == 11? 'finish_on': ''" @click="selectMonth(11)">11月</li>
          <li class="current_on" @click="selectMonth(12)">12月</li>
        </ul>
      </div>
      <div class="w-tips">
        <div class="tips-con">
          <div class="tips-con-bz">
            <div class="row-top-blue"></div>
            <span class="row-top-text">备注</span>
          </div>
          <p>1、平台页面显示的当前税款所属期即当期，勾选、确认截止时间为各省当期的申报截止期，您可在此截止期之前进行当期的勾选和确认操作；</p>
          <p>2、当平台获取到您当期已完成申报的结果时，将自动跳转税款所属期到下期；</p>
          <p>3、当期平台获取到您上一税款所属期撤销申报的结果时，平台支持您回退税款所属期到上一属期。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'

  export default {
    name: "Indexcertificate",
    mixins: [common],
    data() {
      return {
        month: 12,
        monthArray: [
          [{month: 1}, {month: 2}, {month: 3}, {month: 4}],
          [{month: 5}, {month: 6}, {month: 7}, {month: 8}],
          [{month: 9}, {month: 10}, {month: 11}, {month: 12}]
        ],
        com: {},
        numTotal: 0, // 已确认的发票数量
        tax_moneyTotal: 0, //税额合计
        timeMonth: 12, // 时间轴内选中的月份
        tax_deadline: '', // 截止日期
        conShow: true
      }
    },
    mounted() {
      // 同步企业基本信息
      this.synchronizeComInfo()
      this.tax_deadline = this.conversionTime(this.com.tax_deadline)
      this.statisticsInvoice()
    },
    methods: {
      // 选择月
      selectMonth(month) {
        this.timeMonth = month
      },
      // 统计已认证发票信息
      statisticsInvoice() {
        if(this.$store.state.publicData.invoiceList) {
          // 查询申报后的发票数量/总税额
          let sum = 0
          let sum_tax = 0
          let invoiceData = this.$store.state.publicData.invoiceList

          invoiceData.forEach(res => {
            if(parseInt(res.certify_state) === 1 && !res.deduction) {
              sum++
              sum_tax = Number(sum_tax) + Number(res.declare_tax_money)
            }
          })
          this.numTotal = sum
          this.tax_moneyTotal = sum_tax
        }
      },
      // 注销勾选，发票数据初始化
      initializeInvoice() {
        this.$confirm('此操作将还原全部发票的操作数据, 是否继续?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('revertInvoice')
          this.$message.success('注销成功!')
          this.statisticsInvoice()
        }).catch(() => {});
      }
    },
  }
</script>

<style scoped>
  .w-tips .tips-con p{
    color: #888888;
    margin: 10px 0;
  }
  .w-tips .tips-con .tips-con-bz{
    height: 30px;
    border-bottom: 2px solid #f7f7f7;
  }
  .w-tips .tips-con{
    width: 1200px;
    margin: 20px auto;
  }
  .w-tips{
    border-top: 15px solid #f7f7f7;
    margin-top: 60px;
  }
  .w-content .con-left-bottom .bd_box_list2 .bd_list_a,
  .w-content .con-left-top .bd_box_list1 .bd_list_a {
    padding: 0 5px;
    color: #d75452;
    font-size: 16px;
  }

  .w-content .con-left-top .bd_box_list1 li {
    padding-left: 26px;
    background: url(../../assets/public/tabBar_icon11.gif) left 2px no-repeat;
  }
  .w-content .con-left-bottom .bd_box_list2 li{
    background: url(../../assets/public/tabBar_icon1.png) left 2px no-repeat;
  }
  .w-content .con-left-top .bd_box_list1 li,
  .w-content .con-left-bottom .bd_box_list2 li{
    padding-left: 26px;
    margin: 10px 0;
    line-height: 20px;
  }

  .w-content .con-left-bottom .bd_box_list2,
  .w-content .con-left-top .bd_box_list1 {
    background: #fff;
    padding: 10px;
    border-radius: 10px;
  }

  .w-bottom .finish_on {
    background: url(../../assets/public/tabBar_line_finishOn2.png) left top no-repeat !important;
    color: #ffa751;
    font-size: 20px;
  }

  .w-bottom .current_on {
    background: url(../../assets/public/tabBar_line_on2.png) left top no-repeat;
    color: #37b2f0;
    font-size: 24px;
  }

  .w-bottom .finish {
    background: url(../../assets/public/tabBar_line_finish2.png) left top no-repeat;
    color: #ffa751;
  }

  .w-bottom li {
    float: left;
    width: 100px;
    cursor: pointer;
    font-size: 16px;
    color: #ccc;
    position: relative;
    background: url(../../assets/public/tabBar_line2.png) left top no-repeat;
    padding-top: 25px;
    line-height: 40px;
    text-align: center;
  }

  .clearfix {
    display: block;
  }

  .w-bottom ul {
    z-index: 5;
    zoom: 1;
    width: 1200px;
    margin-top: 30px;
  }

  .tabBrBg {
    position: absolute;
    background: url("../../assets/public/tabBar_months_bg.png") left top repeat-x;
    width: 1200px;
    height: 30px;
    top: -13px;
    left: 0;
    z-index: 9;
  }

  .w-content .con-right .con-right-a {
    float: left;
    margin: 35px 0 25px 25px;
    background-color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
  }

  .w-content .con-left .con-left-bottom {
    width: 94%;
    float: left;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .w-content .con-left .con-left-top {
    width: 94%;
    float: left;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .w-content .con-left {
    position: absolute;
    padding: 35px 0 25px 30px;
    height: 100%;
    width: 58%;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #36B2F0;
  }

  .w-content .con-right {
    position: absolute;
    right: 0px;
    height: 100%;
    background-color: #36B2F0;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    width: 43%;
  }

  .fs-18 {
    font-size: 18px;
  }

  .col-hui {
    color: #B6B6B6;
  }

  .col-red {
    color: #CF7783;
  }

  .content {
    position: relative;
    margin: 0 auto;
  }

  .w-title {
    width: 1200px;
    margin: 0px auto;
    font-size: 24px;
  }

  .w-content {
    height: 400px;
    position: relative;
    width: 1200px;
    margin: 0px auto;
  }

  .breadCrumb {
    padding-left: 50px;
    padding-right: 50px;
    height: 80px;
    line-height: 40px;
    border-bottom: 20px solid #F7F7F7;
  }

  .w-bottom {
    width: 1200px;
    margin: 0px auto;
  }
</style>

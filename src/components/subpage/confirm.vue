<template>
  <div class="content">
    <!--面包屑-->
    <div class="breadCrumb">
      当前位置：<a href="">确认勾选</a>
      <a class="f-r help notice-help" href="javascript:;">帮助</a>
    </div>
    <div>
      <div class="T-title">
        <span class="font-16">当前税款所属期：</span>
        <span class="color_3">{{taxdate}}</span>
        <span class="color_2 font_1">（本期已累计确认{{confirmSum}}次）</span>
        <span class="color_2 font_1"></span>
        <span class="f-r" style="margin-top: -10px;">
          <input type="submit" class="button button-blue" style="cursor: pointer;" @click="setInvoice" value="查询">
        </span>
      </div>

      <span class="pad15_r" style="width: 320px; display: inline-block;">确认标志：
        <label class="pad30_r"><input type="radio" value="0" v-model="checkType">已勾选未确认</label>
        <label class="pad30_r"><input type="radio" value="1" v-model="checkType">已确认</label>
      </span>
    </div>

    <hr style="border: 0px currentcolor; border-image: none; height: 8px;">
    <div class="T-title">
      <span class="f-l font-16">确认勾选发票清单</span>

      <div class="clear"></div>
    </div>

    <div>
      <div class="contentBox" id="datatable">
        <el-table
                :data="datatable"
                style="width: 100%">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="code" label="发票代码"></el-table-column>
          <el-table-column prop="number" label="发票号码"></el-table-column>
          <el-table-column prop="create_date" label="开票日期"></el-table-column>
          <el-table-column prop="saler_name" label="销方名称"></el-table-column>
          <el-table-column prop="money" label="金额"></el-table-column>
          <el-table-column prop="tax_money" label="税额"></el-table-column>
          <el-table-column prop="state" label="发票状态"></el-table-column>
          <el-table-column prop="checkdate" label="勾选时间"></el-table-column>
          <el-table-column prop="scanningCertificationdate" label="扫描时间"></el-table-column>
          <el-table-column prop="checkCertificationdate" label="确认时间"></el-table-column>
        </el-table>
      </div>
      <br>

      <div class="text-center" style="clear: both;margin-bottom: 10px;">
        <input class="button button-green certifyBtn" type="button" style="cursor: pointer;" @click="invoiceConfirm" value="确认">
      </div>
    </div>
    <div v-show="showTheme">
      <div class="themePopover">
        <ThemePopover ref="datatable"></ThemePopover>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'
  import ThemePopover from '../preset/theme-popover'
  export default {
    name: "Confirm",
    mixins: [common],
    components: {
      ThemePopover
    },
    data(){
      return {
        showTheme: 0,
        com: {},
        taxdate: '',
        confirmSum: 0, // 发票确认总数量
        checkType: 0, // 筛选条件
        datatable: [], // 发票内容集合
      }
    },
    mounted() {
      // // 检测总线数据结构是否完整并生成所需要的结构
      // var historyInvoiceInfo = this.$store.state.publicData.historyInvoiceInfo
      // if(historyInvoiceInfo == undefined){
      //   var attr = {
      //     certify_num: 0, // 共确认发票几次
      //     totalNum: 0, // 累计勾选多少张
      //
      //     zyfpNum: 0, // 专用发票数量
      //     zyfpMoney: 0, // 专用发票总金额
      //     zyfpTax_money: 0, // 专用发票总税额
      //
      //     jdcNum: 0, // 机动车发票数量
      //     jdcMoney: 0, // 机动车发票总金额
      //     jdcTax_money: 0, // 机动车发票总税额
      //
      //     numTotal: 0, // 数量合计
      //     moneyTotal: 0, // 金额合计
      //     tax_moneyTotal: 0, // 税额合计
      //   }
      //   this.$store.commit('addHistoryInvoiceInfo',attr)
      // }
      //
      // // 同步企业基本信息
      // this.synchronizeComInfo()
      // // 同步税款所属期
      // this.setMonth(this.com.tax_date[0])
      // // 同步待审核发票信息
      // this.pendingReviewInvoice(0)
    },
    methods:{
      // 待审核发票信息
      pendingReviewInvoice(){
        this.datatable = []
        var checkType = this.checkType
        var tableList = this.$store.state.publicData.invoiceList
        var attr = []
        for(var i=0; i<tableList.length; i++){
          if(checkType == 0){
            if(tableList[i].check == '是' && tableList[i].checkCertificationdate == ''){
              attr.push(tableList[i])
            }
          }else if(checkType == 1){
            if(tableList[i].check == '是' && tableList[i].checkCertificationdate != ''){
              attr.push(tableList[i])
            }
          }
        }

        this.datatable = attr
      },
      // 发票确认
      invoiceConfirm(){
        this.showTheme = 1
        layer.open({
          type: 1,
          area: ['800px', '700px'], //宽高
          title: '确认勾选',
          // closeBtn: 0,
          content: J('.themePopover'),
          success: () => {
            // 获取增值税发票信息
            var invoiceInfo = this.setInvoiceInfo(this.datatable)

            if(this.checkType == 0){
              this.$refs.datatable.invoiceInfo = invoiceInfo // 发票的统计信息
              this.$refs.datatable.totalNum = (this.datatable).length;    // 这句很重要
            }else{
              this.$refs.datatable.totalNum = 0
              this.$refs.datatable.invoiceInfo = {
                zyfpNum: 0, // 专用发票数量
                zyfpMoney: 0, // 专用发票总金额
                zyfpTax_money: 0, // 专用发票总税额

                jdcNum: 0, // 机动车发票数量
                jdcMoney: 0, // 机动车发票总金额
                jdcTax_money: 0, // 机动车发票总税额

                numTotal: 0, // 数量合计
                moneyTotal: 0, // 金额合计
                tax_moneyTotal: 0, // 税额合计
              }
            }
            this.$refs.datatable.historyInvoiceInfo = this.$store.state.publicData.historyInvoiceInfo // 累计发票的统计信息
          },
          end: () => {
            this.showTheme = 0
            this.pendingReviewInvoice()
          }
        });
      },
      // 发票条件查询
      setInvoice(){
        this.pendingReviewInvoice()
      },
      // 获取当前申报月份
      setMonth(res) {
        var time = res.split('-') // 拆解完毕后是  年  月  日

        this.taxdate = time[0]+'年'+time[1]+'月'
      }
    }
  }
</script>

<style>
  .contentBox .checkTable .cell{
    text-align: center;
  }
  .contentBox .gutter{
    display: block !important;
  }
</style>
<style scoped>
  .content {
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
  .breadCrumb {
    background: url("../../assets/images/icon_position.png") 10px center no-repeat #f1f1f1;
  }
</style>

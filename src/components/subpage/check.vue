<template xmlns="http://www.w3.org/1999/html">
  <div class="content">
    <!--面包屑-->
    <div class="breadCrumb">
      <div class="width-1200">
        <div class="iconfont rz-iconditu float-left font-24"></div>
        <a class="float-left font-16 ml-25">当前位置：首页-<span class="cl-888">抵扣勾选</span>-<span class="cl-888">发票抵扣勾选</span></a>
        <div class="iconfont rz-iconyou float-right font-24"></div>
        <a class="float-right font-16 mr-5">帮助</a>
      </div>
    </div>

    <!--筛选条件-->
    <div class="standard">
      <div class="T-title">
        <span class="font-16">
          <div class="row-top-blue"></div>
          <span class="row-top-text">税款所属期：</span>
        </span>
        <span class="color_3 font-16">{{taxdate}}</span>
        <span class="color_2">(当期可进行勾选操作的截止日期为：{{taxTimeEnd}})</span>
        <span class="f-r" style="margin-top: -10px;">
          <input type="button" class="button button-blue" style="cursor: pointer;" @click="filterInvoice" value="查询">
        </span>
      </div>
      <div class="height40">
        <span class="pad15_r">发票代码：<input class="input_1" type="text" v-model="filterCondition.code"></span>
        <span class="pad15_r">发票号码：<input class="input_1" type="text" v-model="filterCondition.number"></span>
        <span class="pad15_r" id="createDate">开票日期：
          <label>
            <el-date-picker
                    style="width: 340px;border-radius: 0px;border-color: #888888;height: 28px;top: 1px;"
                    v-model="filterCondition.create_time"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    start-placeholder="起始日期"
                    end-placeholder="截止日期">
            </el-date-picker>
          </label>
        </span>
        <span class="pad15_r">销方税号：
          <input class="input_1" style="width: 175px;" type="text" v-model="filterCondition.saler_tax_no">
        </span>
        <br>
        <span class="pad15_r" id="certifyState">认证状态：
          <label class="pad15_r">
            <input type="radio" value="否" v-model="filterCondition.checkCertification"> 未认证
          </label>
          <label class="pad15_r">
            <input type="radio" value="是" v-model="filterCondition.checkCertification"> 已认证
          </label>
        </span>

        <div id="checkState">
          <span class="pad15_r">勾选状态：
            <label class="pad15_r">
              <input type="radio" value="0" v-model="filterCondition.check_state"> 未勾选
            </label>
            <label class="pad15_r">
              <input type="radio" value="1" v-model="filterCondition.check_state"> 己勾选
            </label>
          </span>
        </div>
        <div id="panel" v-show="selectType">
          <span class="pad15_r">发票类型：
            <label class="pad15_r"><input type="radio" value="" v-model="filterCondition.tax_cate"> 全部</label>
            <label class="pad15_r"><input type="radio" :value=1 v-model="filterCondition.tax_cate"> 增值税专用发票</label>
            <label class="pad15_r"><input type="radio" :value=2 v-model="filterCondition.tax_cate"> 机动车专用发票</label>
          </span>
          <br>
          <span class="pad15_r">发票状态：
            <label class="pad15_r"><input type="radio" value="" v-model="filterCondition.state"> 全部</label>
            <label class="pad15_r"><input type="radio" :value=1 v-model="filterCondition.state"> 正常</label>
            <label class="pad15_r"><input type="radio" :value=0 v-model="filterCondition.state"> 作废</label>
            <label class="pad15_r"><input type="radio" :value=2 v-model="filterCondition.state"> 异常</label>
            <label class="pad15_r"><input type="radio" :value=3 v-model="filterCondition.state"> 失控</label>
            <label class="pad15_r"><input type="radio" :value=4 v-model="filterCondition.state"> 红冲</label>
          </span>
        </div>
      </div>
      <p class="slide">
        <a class="btn-slide active" @click="moreSelect" href="javascript:;">更多查询条件</a>
      </p>
    </div>

    <!--数据列表-->
    <div class="standard">
      <div class="T-title">
        <span class="floatl font-16">
          <div class="row-top-blue"></div>
          <span class="row-top-text">发票勾选</span>
        </span>
        <span class="color_2" id="gxczfw">
          (当期可勾选发票的开票日期范围为：{{taxdate}})
        </span>
      </div>
      <div class="contentBox">
        <!--分页+列表-->
        <el-table
                size="mini"
                ref="invoiceData"
                :data="invoiceData.slice((checkList.currpage - 1) * checkList.pagesize, checkList.currpage * checkList.pagesize)"
                @select-all="invoiceSelectAll"
                @select="invoiceDataChange"
                border style="width: 100%;">
          <el-table-column type="selection" width="30"/>
          <el-table-column prop="code" label="发票代码" width="100"/>
          <el-table-column prop="number" label="发票号码" width="80"/>
          <el-table-column prop="create_time" label="开票日期" width="80">
            <template slot-scope="{ row }">
              {{ conversionTime(row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="saler_name" label="销方名称" width="200"/>
          <el-table-column prop="money" label="金额"/>
          <el-table-column prop="tax_money" label="税额"/>
          <el-table-column label="有效税额" width="150">
            <template slot-scope="{ row }">
              <el-input v-if="row.check_state === '0'" v-model="row.declare_tax_money" :readonly="row.state === '1'? false: true"></el-input>
              <el-input v-else v-model="row.declare_tax_money" :readonly="true"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="发票状态" width="70">
            <template slot-scope="{ row }">
              {{row.state === '1'? '正常': row.state === '0'? '作废': row.state === '2'? '异常': row.state === '3'? '失控':
              row.state === '4'? '红冲': ''}}
            </template>
          </el-table-column>
          <el-table-column prop="check" label="发票类型" width="120">
            <template slot-scope="{ row }">
              {{row.tax_cate === '1'? '增值税专用发票': '机动车销售统一发票'}}
            </template>
          </el-table-column>
          <el-table-column label="信息来源" width="100">
            <template slot-scope="{ row }">
              系统推送
            </template>
          </el-table-column>
          <el-table-column prop="check_state" label="是否勾选" width="80">
            <template slot-scope="{ row }">
              {{row.check_state === '0'? '否': '是'}}
            </template>
          </el-table-column>
          <el-table-column prop="check_time" label="勾选时间" width="120">
            <template slot-scope="{ row }">
              {{row.check_time? row.check_time: '-'}}
            </template>
          </el-table-column>
          <el-table-column label="管理状态" width="">
            <template slot-scope="{ row }">
              正常
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="{ row }">
              <el-button type="text" class="look-invoice-info" @click="lookInvoiceInfo(row)">查看明细信息</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin: 20px auto; text-align: center;">
          <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5, 10, 30, 50]"
                  :page-size="checkList.pagesize"
                  layout="total, sizes, prev, pager, next"
                  :total="checkList.total">
          </el-pagination>
        </div>

      </div>
      <div class="tips">
        <div class="tips-con-bz">
          <div class="row-top-blue"></div>
          <span class="row-top-text">备注</span>
        </div>
        <p>1、除发票状态、管理状态为正常外，其他异常发票不允许勾选；</p>
        <p>2、对于勾选为抵扣的发票默认全额抵扣，您可根据实际情况自行调整有效抵扣税额，请注意：差额部分将不可继续勾选为其他用途；</p>
        <p>3、对于信息来源为扫描认证的发票，支持撤销勾选操作，再次勾选时，税款所属期归属在勾选提交时的当期；</p>
        <p>4、对于已勾选的发票，您可以在这里撤销勾选，但在申报期内，如您已经在“抵扣勾选统计”模块进行了申请统计，系统将锁定当期的勾选操作；如需继续勾选发票，可在撤销统计成功后继续进行发票勾选或撤销勾选；</p>
        <p>5、本模块支持查询当期可勾选范围内已勾选和未勾选的发票。往期认证和未到认证期的发票，请前往进项发票查询模块的“单票查询”和“未到勾选日期发票查询”进行查询。</p>
      </div>
      <div class="text-center" style="clear: both;">
        <input type="button" class="button button-blue" style="margin:20px 0;" @click="saveCheckInvoice"
               value="提 交"></input>
      </div>
    </div>
    <!--发票明细弹窗-->
    <div class="invoiceInfoDialog" v-if="invoiceInfoDialog">
      <el-dialog
              title="发票明细"
              :visible.sync="invoiceInfoDialog"
              width="900px"
              :close-on-click-modal="false">
        <InvoiceInfo :invoice="checkInvoice"></InvoiceInfo>
      </el-dialog>
    </div>
    <!--勾选发票信息弹窗-->
    <div class="invoiceChecksDialog" v-if="invoiceChecksDialog">
      <el-dialog
              title="勾选认证信息"
              :visible.sync="invoiceChecksDialog"
              width="490px"
              :close-on-click-modal="false">
        <div style="height: 170px;" class="invoice-checks-dialog-form">
          <div style="width: 15%; padding-top: 40px;" class="float-left">
            <i class="el-icon-question" style="font-size: 60px; color: #FB6908;"></i>
          </div>
          <div style="width: 85%;" class="float-left">
            <p>本次勾选的发票汇总如下：</p>
            <p>
              本次勾选：<span class="col-red">{{invoiceCheckListInfo.sum}}</span>份，
              金额合计：<span class="col-red">{{invoiceCheckListInfo.sum_amount}}</span>元，
              税额合计：<span class="col-red">{{invoiceCheckListInfo.sum_tax}}</span>元，
              有效税额合计：<span class="col-red">{{invoiceCheckListInfo.sum_effective_tax}}</span>元
            </p>
            <p>请确认是否提交？</p>
          </div>
          <p class="text-center">
            <span slot="footer" class="dialog-footer">
              <input type="button" class="button button-blue" @click="checksConfirm" value="确定"></input>
            </span>
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'
  import InvoiceInfo from '../subpage/invoice-info'

  export default {
    mixins: [common],
    name: "Check",
    data() {
      return {
        selectType: 0,
        // 发票数据结构
        invoiceData: [],
        com: {},
        taxdate: '',
        taxTimeEnd: '',
        // 发票勾选列表分页数据
        checkList: {
          total: 0, // 总条数
          pagesize: 5, //每页内容条数
          size: 0, // 当前页数
          currpage: 1
        },
        // 发票筛选条件
        filterCondition: {
          code: '', // 发票代码
          number: '', // 发票号码
          saler_tax_no: '', // 销方税号
          tax_cate: '', // 发票类型
          check_state: '0', // 发票状态
          check_time: null, // 开票日期
          checkCertification: '否', // 认证状态
          check: '', // 勾选状态
          create_time: null
        },
        // 发票类型select
        taxCateOptions: [
          {
            value: 1,
            label: '增值税专用发票'
          }, {
            value: 2,
            label: '机动车销售统一发票'
          }
        ],
        // 勾选后的发票集合
        invoiceCheck: [],
        invoiceSelect: [],
        cancelSelect: [], // 撤销勾选的集合
        // 已勾选发票数据统计
        invoiceCheckListInfo: {
          sum: 0, // 已勾选发票总数量
          sum_amount: 0, // 金额合计
          sum_tax: 0, // 合计税额
          sum_effective_tax: 0 // 有效税额合计
        }, // 勾选发票详细数据统计
        invoiceInfoDialog: false, // 发票明细弹窗标记
        invoiceChecksDialog: false, // 勾选发票统计信息确认弹窗
        checkInvoice: '', // 选中的发票信息
        selectAllType: false
      }
    },
    components: {InvoiceInfo},
    mounted() {
      // 同步发票信息
      this.setInvoiceData()
      // 同步企业基本信息
      this.synchronizeComInfo()
      // 同步税款所属期
      this.setMonth(this.conversionTime(this.com.tax_time))
      this.taxTimeEnd = this.conversionTime(this.com.tax_deadline)
    },
    methods: {
      invoiceSelectAll(selection) {
        let invoiceData = this.invoiceData.slice((this.checkList.currpage - 1) * this.checkList.pagesize, this.checkList.currpage * this.checkList.pagesize)
        if (selection.length === 0) {
          // 取消全选
          invoiceData.forEach(value => {
            const index = this.invoiceSelect.indexOf(value.id)
            if (index > -1) {
              this.invoiceSelect.splice(index, 1)
            }
          })
        } else {
          // 全选
          invoiceData.forEach(value => {
            if (this.invoiceSelect.indexOf(value.id) === -1) {
              this.invoiceSelect.push(value.id)
            }
          })
        }
      },
      // 更多查询条件
      moreSelect() {
        if (this.selectType == 0) {
          this.selectType = 1
        } else {
          this.selectType = 0
        }
      },
      handleSizeChange(val) {
        this.checkList.pagesize = val;
      },
      handleCurrentChange(val) {
        if (Object.keys(this.invoiceCheck).length !== 0) {
          for (var i = 0; i < Object.keys(this.invoiceCheck).length; i++) {
            this.invoiceSelect[this.invoiceCheck[i].id] = this.invoiceCheck[i]
          }
        }
        this.checkList.currpage = val;
        this.updateCheck() // 同步勾选状态
      },
      //同步发票信息
      setInvoiceData() {
        this.filterInvoice()
      },
      // 发票筛选
      filterInvoice() {
        this.invoiceSelect = []
        var attr = []
        // 全部可勾选发票
        var invoiceData = this.$store.state.publicData.invoiceList
        var filterCondition = this.filterCondition

        for (var i = 0; i < invoiceData.length; i++) {
          // 未认证的发票
          if(parseInt(invoiceData[i].certify_state) === 0) {
            if (invoiceData[i].checkCertification === undefined) {
              this.$store.commit('addPublicDataItem', {index: i, name: 'checkCertification', data: '否'})
            }
            if (invoiceData[i].checkCertificationdate === undefined) {
              this.$store.commit('addPublicDataItem', {index: i, name: 'checkCertificationdate', data: ''})
            }
            if (invoiceData[i].scanningCertification === undefined) {
              this.$store.commit('addPublicDataItem', {index: i, name: 'scanningCertification', data: '否'})
            }
            if (invoiceData[i].scanningCertificationdate === undefined) {
              this.$store.commit('addPublicDataItem', {index: i, name: 'scanningCertificationdate', data: ''})
            }
            if (invoiceData[i].code === filterCondition.code || filterCondition.code === '') { // 验证发票代码
              if (invoiceData[i].number === filterCondition.number || filterCondition.number === '') { // 验证发票号码
                if (filterCondition.saler_tax_no === invoiceData[i].saler_tax_no || filterCondition.saler_tax_no === '') { // 验证销方税号
                  if (parseInt(invoiceData[i].tax_cate) === parseInt(filterCondition.tax_cate) || filterCondition.tax_cate === '') { // 验证发票类型
                    if (parseInt(invoiceData[i].check_state) === parseInt(filterCondition.check_state)) { // 验证发票状态
                      // 未勾选的发票查询查全部
                      if (parseInt(invoiceData[i].check_state) === 0) {
                        // 比对日期时间范围
                        if (filterCondition.create_time !== null) {
                          var timeStatus = this.isDateBetween(this.conversionTime(invoiceData[i].create_time), filterCondition.create_time[0], filterCondition.create_time[1])
                        }

                        if (timeStatus || filterCondition.create_time === null) { // 验证开票日期
                          if (invoiceData[i].checkCertification === filterCondition.checkCertification || invoiceData[i].checkCertification === '否') { // 验证认证状态
                            if (invoiceData[i].check_state === filterCondition.check_state || filterCondition.check_state === '') { // 验证勾选状态
                              attr.push(invoiceData[i])
                            }
                          }
                        }
                      } else {
                        // 已勾选的不抵扣发票信息
                        if(!invoiceData[i].deduction) {
                          if(parseInt(filterCondition.check_state) === 1){
                            if (this.invoiceSelect.indexOf(invoiceData[i].id) < 0) {
                              this.invoiceSelect.push(invoiceData[i].id)
                            }
                          }
                          // 比对日期时间范围
                          if (filterCondition.create_time !== null) {
                            var timeStatus = this.isDateBetween(this.conversionTime(invoiceData[i].create_time), filterCondition.create_time[0], filterCondition.create_time[1])
                          }

                          if (timeStatus || filterCondition.create_time === null) { // 验证开票日期
                            if (invoiceData[i].checkCertification === filterCondition.checkCertification || invoiceData[i].checkCertification === '否') { // 验证认证状态
                              if (invoiceData[i].check_state === filterCondition.check_state || filterCondition.check_state === '') { // 验证勾选状态
                                attr.push(invoiceData[i])
                              }
                            }
                          }
                        }
                      }

                      // if(parseInt(filterCondition.check_state) === 1){
                      //   if (this.invoiceSelect.indexOf(invoiceData[i].id) < 0) {
                      //     this.invoiceSelect.push(invoiceData[i].id)
                      //   }
                      // }
                      // // 比对日期时间范围
                      // if (filterCondition.check_time != null) {
                      //   var timeStatus = this.isDateBetween(this.conversionTime(invoiceData[i].check_time), filterCondition.check_time[0], filterCondition.check_time[1])
                      // }
                      // if (timeStatus || filterCondition.create_date == null) { // 验证开票日期
                      //   if (invoiceData[i].checkCertification === filterCondition.checkCertification || invoiceData[i].checkCertification === '否') { // 验证认证状态
                      //     if (invoiceData[i].check_state === filterCondition.check_state || filterCondition.check_state === '') { // 验证勾选状态
                      //       attr.push(invoiceData[i])
                      //     }
                      //   }
                      // }
                    }
                  }
                }
              }
            }
          }
        }
        // 重新分页
        this.invoiceData = attr
        this.checkList.total = attr.length
        this.updateCheck()
      },
      // 发票勾选选中事件
      invoiceDataChange(selection, row) {
        if (this.invoiceSelect.indexOf(row.id) < 0) {
          this.invoiceSelect.push(row.id)
        } else {
          let index = this.invoiceSelect.indexOf(row.id)
          this.invoiceSelect.splice(index, 1)
        }
      },
      // 勾选保存
      saveCheckInvoice() {
        // 勾选发票信息确认
        // 区分是否是已勾选撤销
        if(this.filterCondition.check_state === '0') {
          if (this.invoiceSelect.length !== 0) {
            this.invoiceChecksDialog = true
            // 勾选发票数据统计
            for (var i = 0; i < this.invoiceData.length; i++) {
              if(this.invoiceSelect.indexOf(this.invoiceData[i].id) !== -1) {
                this.invoiceCheckListInfo.sum_amount = this.changeTwoDecimal_f(Number(this.invoiceCheckListInfo.sum_amount) + Number(this.invoiceData[i].money))
                this.invoiceCheckListInfo.sum_tax = this.changeTwoDecimal_f(Number(this.invoiceCheckListInfo.sum_tax) + Number(this.invoiceData[i].tax_money))
                this.invoiceCheckListInfo.sum_effective_tax = this.changeTwoDecimal_f(Number(this.invoiceCheckListInfo.sum_effective_tax) + Number(this.invoiceData[i].declare_tax_money))
              }
            }
            this.invoiceCheckListInfo.sum = this.invoiceSelect.length
          } else {
            this.$message.error('请先勾选发票')
          }
        } else {
          // 撤销勾选
          let invoiceData = this.invoiceData
          let sum = 0
          this.cancelSelect = []

          // 勾选发票数据统计
          for (var i = 0; i < invoiceData.length; i++) {
            // 确定该发票属于抵扣已勾选
            if(!invoiceData[i].deduction && invoiceData[i].check_state === '1') {
              if(this.invoiceSelect.indexOf(invoiceData[i].id) === -1) {
                this.invoiceCheckListInfo.sum_amount = this.changeTwoDecimal_f(Number(this.invoiceCheckListInfo.sum_amount) + Number(this.invoiceData[i].money))
                this.invoiceCheckListInfo.sum_tax = this.changeTwoDecimal_f(Number(this.invoiceCheckListInfo.sum_tax) + Number(this.invoiceData[i].tax_money))
                this.invoiceCheckListInfo.sum_effective_tax = this.changeTwoDecimal_f(Number(this.invoiceCheckListInfo.sum_effective_tax) + Number(this.invoiceData[i].declare_tax_money))
                sum++
                this.cancelSelect.push(invoiceData[i].id)
              }
            }
          }
          this.invoiceCheckListInfo.sum = sum
          if(sum === 0) {
            this.$message.error('请先撤销已勾选的发票')
          } else {
            this.invoiceChecksDialog = true // 弹窗开启
          }
        }
      },
      // 确认勾选
      checksConfirm() {
        // 关闭上一弹窗
        this.invoiceChecksDialog = false
        if(parseInt(this.filterCondition.check_state) === 0) {
          // 勾选
          // 修改公用数据内发票信息
          this.$store.commit('editInvoiceCheckStatus', this.invoiceSelect)
          this.$message.success('勾选成功')
        } else {
          // 取消勾选
          this.$store.commit('delInvoiceCheckStatus', this.cancelSelect)
          this.$message.success('已取消勾选')
        }

        this.filterInvoice()
      },
      // 获取当前申报月份
      setMonth(res) {
        var time = res.split('-') // 拆解完毕后是  年  月  日

        this.taxdate = time[0] + '年' + time[1] + '月'
      },
      // 查询发票明细信息
      lookInvoiceInfo(row) {
        this.invoiceInfoDialog = true
        this.checkInvoice = row
      },
      // 同步勾选状态
      updateCheck() {
        var topicList = this.invoiceData.slice((this.checkList.currpage - 1) * this.checkList.pagesize, this.checkList.currpage * this.checkList.pagesize)
        setTimeout(() => {
          if (this.invoiceSelect) {
            if (Object.keys(this.invoiceSelect).length !== 0) {
              var attr = []
              for (var item in this.invoiceSelect) {
                attr.push(parseInt(this.invoiceSelect[item]))
              }

              topicList.forEach(row => {
                if (attr.indexOf(parseInt(row.id)) > -1) {
                  this.$refs.invoiceData.toggleRowSelection(row, true)
                }
              })
            }
          }
        })
      },
    }
  }
</script>

<style>
  .content .invoiceInfoDialog .el-dialog__body {
    padding: 15px 20px 20px 20px;
  }

  .content .invoiceChecksDialog .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }

  .contentBox .el-table th {
    text-align: center !important;
    font-weight: 700;
    font-size: 14px;
    color: #333333;
  }

  .content .el-table .cell {
    padding: 0px !important;
    text-align: center;
  }

  .content .contentBox table {
    margin: 0px !important;
  }

  .content .tax_cate input {
    border-radius: 0px;
    border-color: #888888;
    height: 28px;
    top: 1px;
  }
</style>
<style scoped>
  .col-red {
    color: #CF7783;
  }

  .invoice-checks-dialog-form p {
    margin: 15px 0;
  }

  .look-invoice-info {
    color: red;
  }

  .tips p {
    color: #888888;
    margin: 10px 0;
  }

  .tips-con-bz {
    height: 30px;
    border-bottom: 2px solid #f7f7f7;
  }

  .content {
    position: relative;
    margin: 0 auto;
  }

  .breadCrumb {
    padding-left: 50px;
    padding-right: 50px;
    height: 80px;
    line-height: 40px;
    border-bottom: 20px solid #F7F7F7;
  }
</style>

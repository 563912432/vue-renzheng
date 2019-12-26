<template>
  <div>
    <div class="theme-popover" id="summaryInfo">
      <div class="theme-poptit">
        <div>
          <span style="color: blue;margin-left: 10px;">当前状态：
            <i id="subState" style="font-style: normal">待提交</i>
          </span>
          <span id="red_notice" style="color: red;">（请您核对本次待确认发票，若无问题，请“提交”。若有问题，请重新勾选）</span>
        </div>
      </div>
      <div class="theme-popbod" style="padding-right: 15px; -ms-overflow-y: auto;">
        <div id="dcarea">
          <p class="text-center" style="font-size: 30px;">发票确认汇总</p>
          <table width="100%" align="center" style="margin-top: 8px;" border="0">
            <tbody>
            <tr>
              <td align="right">
                <div>确认时间：<span class="certifydate">{{confirmdate}}</span></div>
              </td>
            </tr>
            <tr>
              <td align="left">
                <div>尊敬的<span class="color_4">{{com.company}}</span>，税号为<span
                        class="color_4">{{com.taxnumber}}</span>。
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="summaryInfo" style="margin-top: 8px;">
            <label>
              本次为所属期<span class="color_4" id="currentDate">{{tax_date}}</span>
              第<span class="color_4" id="subTimes">{{certify_num+1}}</span>次发票勾选确认。
              共勾选<span class="color_4">{{totalNum}}</span>张发票，其中:
            </label>
            <br>
            <label>（1）有效勾选发票
              <span class="color_4" id="validInvoice">{{totalNum}}</span> 张</label>
            <br>
            <label>（2）勾选且扫描认证发票
              <span class="color_4" id="certifyInvoice">0</span> 张
            </label>
            <br>
            <label>（3）勾选不可抵扣发票
              <span class="color_4" id="unableInvoice">0</span> 张。
            </label>
          </div>
          <div class="text-center">
            <h3 style="font-size: 24px;">本次有效勾选统计如下：</h3>
          </div>
          <table width="98%" align="center" class="height40 resulttable" style="margin-top: 6px;" border="1">
            <tbody>
            <tr>
              <th></th>
              <th>数量（份）</th>
              <th>金额（元）</th>
              <th>税额（元）</th>
            </tr>
            <tr>
              <td width="160">增值税专用发票</td>
              <td>
                <span class="addTax_num">{{invoiceInfo.zyfpNum}}</span>
              </td>
              <td>
                <span class="addTax_money">
                    {{invoiceInfo.zyfpMoney}}
                </span>
              </td>
              <td>
                <span class="addTax_tax">
                    {{invoiceInfo.zyfpTax_money}}
                </span>
              </td>
            </tr>
            <tr>
              <td>机动车销售统一发票</td>
              <td>
                <span class="vehicle_num">{{invoiceInfo.jdcNum}}</span>
              </td>
              <td>
                <span class="vehicle_money">
                    {{invoiceInfo.jdcMoney}}
                </span>
              </td>
              <td>
                <span class="vehicle_tax">
                    {{invoiceInfo.jdcTax_money}}
                </span>
              </td>
            </tr>
            <tr>
              <td>合计</td>
              <td>
                <span class="add_num">{{invoiceInfo.numTotal}}</span>
              </td>
              <td>
                <span class="add_money">
                    {{invoiceInfo.moneyTotal}}
                </span>
              </td>
              <td>
                <span class="add_tax">
                    {{invoiceInfo.tax_moneyTotal}}
                </span>
              </td>
            </tr>
            </tbody>
          </table>
          <hr style="margin: 20px 0px; border: 1px solid rgb(98, 166, 71); border-image: none;">

          <div id="bottomContent">
            <div class="summaryInfo">
              <label>截止本次勾选确认，共确认
                <span class="color_4" id="totalTimes">{{historyInvoiceInfo.certify_num}}</span> 次，累计勾选
                <span class="color_4" id="totalNum">{{historyInvoiceInfo.totalNum}}</span>张发票，其中：</label>
              <br>
              <label>（1）有效勾选发票
                <span class="color_4" id="totalValid">{{historyInvoiceInfo.totalNum}}</span>
                张</label>
              <br>
              <label>（2）勾选且扫描认证发票
                <span class="color_4" id="totalCertify">0</span>张</label>
              <br>
              <label>（3）勾选不可抵扣发票
                <span class="color_4" id="totalUnable">0</span>张。
              </label>
            </div>
            <div class="text-center">
              <h3 style="font-size: 24px;">累计有效勾选统计如下：</h3>
            </div>
            <table width="98%" align="center" class="height40 resulttable" style="margin-top: 6px;" border="1">
              <tbody>
              <tr>
                <th></th>
                <th>数量（份）</th>
                <th>金额（元）</th>
                <th>税额（元）</th>
              </tr>
              <tr>
                <td width="160">增值税专用发票</td>
                <td>
                  <span class="total_addTax_num">{{historyInvoiceInfo.zyfpNum}}</span>
                </td>
                <td>
                  <span class="total_addTax_money">
                      {{historyInvoiceInfo.zyfpMoney}}
                  </span>
                </td>
                <td>
                  <span class="total_addTax_tax">
                      {{historyInvoiceInfo.zyfpTax_money}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>机动车销售统一发票</td>
                <td>
                  <span class="total_vehicle_num">{{historyInvoiceInfo.jdcNum}}</span>
                </td>
                <td>
                  <span class="total_vehicle_money">
                      {{historyInvoiceInfo.jdcMoney}}
                  </span>
                </td>
                <td>
                  <span class="total_vehicle_tax">
                      {{historyInvoiceInfo.jdcTax_money}}
                  </span>
                </td>
              </tr>
              <tr>
                <td>合计</td>
                <td>
                  <span class="total_num">{{historyInvoiceInfo.numTotal}}</span>
                </td>
                <td>
                  <span class="total_money">
                      {{historyInvoiceInfo.moneyTotal}}
                  </span>
                </td>
                <td>
                  <span class="total_tax">
                      {{historyInvoiceInfo.tax_moneyTotal}}
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div align="right" style="margin-top: 10px; margin-right: 15px;">打印日期：<span id="dyrq">20xx-xx-xx</span>
          </div>
        </div>
        <div class="tips color_3" id="tipdiv" style="line-height: 20px; margin-top: 15px;">注：
          <br>已勾选发票，在执行确认操作前发票状态变为“异常”（作废、红冲、失控、异常）时，确认提交后，不能做为有效抵扣依据参与当期抵扣。
        </div>
      </div>
      <div align="center" style="margin-top: 10px; margin-bottom: 10px;">
        <input type="button" class="button button-green submitBtn" style="cursor: pointer;" @click="saveInvoiceInfo"
               value="提交">
        <input type="button" class="button button-green" value="打印本页">
        <input type="button" class="button button-green" value="导出明细">
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'

  export default {
    mixins: [common],
    name: "theme-popover",
    mounted() {
      // // 同步企业基本信息
      // this.synchronizeComInfo()
      //
      // this.Date = new Date()
      // var dataTime = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate() // 当前日期时间
      // this.confirmdate = dataTime
      // this.tax_date = this.com.tax_date[0]

    },
    data() {
      return {
        com: {},
        tax_date: '', // 税款所属期
        confirmdate: '', // 确认时间
        certify_num: 0, // 本期第几次勾选确认
        totalNum: 0, // 共勾选多少张
        // 增值税专用发票信息统计
        invoiceInfo: {
          zyfpNum: 0, // 专用发票数量
          zyfpMoney: 0, // 专用发票总金额
          zyfpTax_money: 0, // 专用发票总税额

          jdcNum: 0, // 机动车发票数量
          jdcMoney: 0, // 机动车发票总金额
          jdcTax_money: 0, // 机动车发票总税额

          numTotal: 0, // 数量合计
          moneyTotal: 0, // 金额合计
          tax_moneyTotal: 0, // 税额合计
        },
        // 历史累计发票信息
        historyInvoiceInfo: {
          certify_num: 0, // 共确认发票几次
          totalNum: 0, // 累计勾选多少张

          zyfpNum: 0, // 专用发票数量
          zyfpMoney: 0, // 专用发票总金额
          zyfpTax_money: 0, // 专用发票总税额

          jdcNum: 0, // 机动车发票数量
          jdcMoney: 0, // 机动车发票总金额
          jdcTax_money: 0, // 机动车发票总税额

          numTotal: 0, // 数量合计
          moneyTotal: 0, // 金额合计
          tax_moneyTotal: 0, // 税额合计
        },
      }
    },
    methods: {
      // 保存发票信息
      saveInvoiceInfo() {
        var certify_num = 0 // 累计勾选多少次
        var totalNum = 0 // 累计确认发票张数

        var zyfpNum = 0 // 专用发票数量
        var zyfpMoney = 0 // 专用发票总金额
        var zyfpTax_money = 0 // 专用发票总税额

        var jdcNum = 0 // 机动车发票数量
        var jdcMoney = 0 // 机动车发票总金额
        var jdcTax_money = 0 // 机动车发票总税额

        if (this.invoiceInfo.numTotal !== 0) {
          layer.confirm('提交后您所有已勾选未确认的发票(所属期' + this.com.tax_date[0] + ')将被确认，且结果不可变动？', {
            btn: ['确认', '取消'], //按钮
            title: '确认提醒'
          }, () => {

            this.Date = new Date()
            var dataTime = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate() // 当前日期时间

            var invoice = this.$store.state.publicData.invoiceList
            for (var i = 0; i < invoice.length; i++) {
              if (invoice[i].check === '是' && invoice[i].checkCertificationdate == '') {
                invoice[i].checkCertification = '是'
                invoice[i].checkCertificationdate = dataTime
                totalNum++
                if (invoice[i].tax_cate === '增值税专用发票') {
                  zyfpNum++
                  zyfpMoney = zyfpMoney + invoice[i].money * 1
                  zyfpTax_money = zyfpTax_money + invoice[i].tax_money * 1
                } else if (invoice[i].tax_cate === '机动车销售统一发票') {
                  jdcNum++
                  jdcMoney = jdcMoney + invoice[i].money * 1
                  jdcTax_money = jdcTax_money + invoice[i].tax_money * 1
                }
                this.$store.commit('editInvoiceItem', {key: i, data: invoice[i]})
              }
            }
            layer.close(layer.index) // 关闭最新弹窗
            layer.confirm('确认结果提交完毕，本批次发票勾选认证成功！', {
              btn: ['确认'], //按钮
              title: '提示'
            }, () => {
              certify_num++

              var historyInfo = this.$store.state.publicData.historyInvoiceInfo
              this.historyInvoiceInfo.certify_num = historyInfo.certify_num + certify_num
              this.historyInvoiceInfo.totalNum = historyInfo.totalNum + totalNum

              this.historyInvoiceInfo.zyfpNum = historyInfo.zyfpNum + zyfpNum
              this.historyInvoiceInfo.zyfpMoney = historyInfo.zyfpMoney + zyfpMoney
              this.historyInvoiceInfo.zyfpTax_money = historyInfo.zyfpTax_money + zyfpTax_money

              this.historyInvoiceInfo.jdcNum = historyInfo.jdcNum + jdcNum
              this.historyInvoiceInfo.jdcMoney = historyInfo.jdcMoney + jdcMoney
              this.historyInvoiceInfo.jdcTax_money = historyInfo.jdcTax_money + jdcTax_money

              this.historyInvoiceInfo.numTotal = historyInfo.numTotal + zyfpNum + jdcNum
              this.historyInvoiceInfo.moneyTotal = historyInfo.moneyTotal + zyfpMoney + jdcMoney
              this.historyInvoiceInfo.tax_moneyTotal = historyInfo.tax_moneyTotal + zyfpTax_money + jdcTax_money

              this.$store.commit('addHistoryInvoiceInfo', this.historyInvoiceInfo)

              layer.closeAll()
            })
          });
        } else {
          layer.msg('没有符合条件的记录')
        }
      },
    }
  }
</script>

<style scoped>

</style>

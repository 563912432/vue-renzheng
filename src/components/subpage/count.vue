<template>
  <div class="content">
    <div style="border-bottom: 20px solid #F7F7F7;">
      <!--面包屑-->
      <div class="breadCrumb">
        <div class="width-1200">
          <div class="iconfont rz-iconditu float-left font-24"></div>
          <a class="float-left font-16 ml-25">当前位置：首页-<span class="cl-888">抵扣勾选</span>-<span class="cl-888">抵扣勾选统计</span></a>
          <div class="iconfont rz-iconyou float-right font-24"></div>
          <a class="float-right font-16 mr-5">帮助</a>
        </div>
      </div>

      <div class="standard">
        <div class="switch-invoice-type mt-20">
          <input :class="currentInvoice === 0? 'switch-invoice-type_on': ''" @click="countType(0)" type="button"
                 value="当前属期数据统计"></input>
          <!--<input :class="currentInvoice === 1? 'switch-invoice-type_on': ''" @click="countType(1)" type="button"-->
                 <!--value="历史属期数据统计"></input>-->
          <input :class="currentInvoice === 1? 'switch-invoice-type_on': ''" type="button"
                 value="历史属期数据统计"></input>
        </div>
        <!--当前暑期数据统计-->
        <div class="T-title" v-if="currentInvoice === 0">
          <span class="pad15_r font-16">
            <div class="row-top-blue"></div>
            <span class="row-top-text">税款所属期：</span>
          </span>
          <span class="color_3 font-16">{{taxdate}}</span>
          <span class="ml-20 font-16">
            报表类型：
            <label class="pad15_r">
              <input type="radio" value="0" v-model="invoiceType"> 发票统计表
            </label>
            <label class="pad15_r">
              <input type="radio" value="1" disabled v-model="invoiceType"> 异常发票统计表
            </label>
          </span>
          <span class="f-r" style="margin-top: -10px;">
            <a class="button button-green" @click="countInquire">统计查询</a>
            <a class="button button-green notice-help" href="javascript:void(0);">打印</a>
          </span>
        </div>
        <!--历史属期数据统计-->
        <div v-else  class="T-title">
          <span class="pad15_r font-16">
            <div class="row-top-blue"></div>
            <span class="row-top-text">税款所属期：</span>
          </span>
          <span class="color_3 font-16">
            <el-date-picker
                    style="margin-top: -5px;"
                    size="mini"
                    v-model="taxMonth"
                    type="month"
                    :clearable="false"
                    :editable="false"
                    value-format="yyyy-MM"
                    placeholder="选择月">
            </el-date-picker>
          </span>
          <span class="ml-20 font-16">
            报表类型：
            <label class="pad15_r">
              <input type="radio" value="0" v-model="invoiceType"> 发票统计表
            </label>
            <label class="pad15_r">
              <input type="radio" disabled> 异常发票统计表
            </label>
          </span>
          <span class="f-r" style="margin-top: -10px;">
            <a class="button button-green">统计查询</a>
            <a class="button button-green notice-help" href="javascript:void(0);">打印</a>
          </span>
        </div>
      </div>
      <!--当前暑期数据统计 表格数据-->
      <div v-if="currentInvoice === 0" class="standard">
        <div id="normal">
          <div class="text-right mt-30">
            <a class="button button-green switch-invoice-type_on" v-if="width_sum < 2" @click="toStatistics">申请统计</a>
            <a class="button button-green switch-invoice-type_on" v-if="width_sum === 2" @click="toDeclare" >确认签名</a>
            <a class="button button-green switch-invoice-type_on" v-if="width_sum > 1" @click="cancelCount" >撤销统计</a>
          </div>
          <!--时间轴部分-->
          <div class="standard-timeline">
            <div class="step-bar">
              <div class="step-bar-active" :class="width_sum === 1? 'width-33': width_sum === 2? 'width-66': width_sum === 3? 'width-100': ''"></div>
            </div>
            <ul>
              <li style="width: 33.3333%;">
                <span :class="width_sum > 0? 'on_span': '' ">1</span>
                <p>申请统计
                  <br>
                  <i id="sqtjsj"></i>
                </p>
              </li>
              <li style="width: 33.3333%;">
                <span :class="width_sum > 1? 'on_span': '' ">2</span>
                <p>
                  统计完成
                  <br>
                  <i id="tjwcsj"></i>
                </p>
              </li>
              <li style="width: 33.3333%;">
                <span :class="width_sum > 2? 'on_span': '' ">3</span>
                <p>
                  确认签名
                  <br>
                  <i id="qrqmsj"></i>
                </p>
              </li>
            </ul>
          </div>
          <div class="T-title">
            <div class="text-center font-16 mt-65">发票统计表</div>
          </div>
          <table width="100%" class="height40" v-if="width_sum === 2 || width_sum === 3">
            <tbody>
              <tr>
                <td>
                  <span class="height40 color_2" id="nsrmc1">纳税人名称：{{com.company}}</span>
                </td>
                <td>
                  <span class="height40 color_2" id="nsrsbh1">纳税人识别号：{{com.tax_no}}</span>
                </td>
                <td>
                  <span class="height40 color_2" id="rzyf1">认证月份：{{taxdate}}</span>
                </td>
                <td align="right">
                  <span class="height40 color_2 mar_l_30">单位：（份、元）</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="width: 100%; overflow-x: auto;">
            <table width="100%" class="height40 resulttable" border="1" cellpadding="0" cellspacing="0">
              <tbody>
              <tr>
                <th width="20%" rowspan="2">
                  <div class="out">
                    <b>用途</b>
                    <em style="color: rgb(0, 0, 0);">发票类型</em>
                  </div>
                </th>
                <th width="20%" colspan="3">抵扣</th>
                <th width="20%" colspan="3">不抵扣</th>
              </tr>
              <tr>
                <th>份数</th>
                <th>金额</th>
                <th>有效税额</th>
                <th>份数</th>
                <th>金额</th>
                <th>有效税额</th>
              </tr>
              <tr v-if="width_sum < 2">
                <td colspan="7">未找到符合在条件的记录</td>
              </tr>
              <tr v-if="width_sum > 1" id="row_0">
                <td>增值税专用发票</td>
                <td>{{zcInvoiceInfo.zyfpNum}}</td>
                <td>{{this.changeTwoDecimal_f(zcInvoiceInfo.zyfpMoney)}}</td>
                <td>{{this.changeTwoDecimal_f(zcInvoiceInfo.zyfpTax_money)}}</td>

                <td>{{zcInvoiceInfo.bdkzyfpNum}}</td>
                <td>{{this.changeTwoDecimal_f(zcInvoiceInfo.bdkzyfpMoney)}}</td>
                <td>{{this.changeTwoDecimal_f(zcInvoiceInfo.bdkzyfpTax_money)}}</td>
              </tr>
              <tr v-if="width_sum > 1" id="row_1">
                <td>机动车销售统一发票</td>
                <td>{{zcInvoiceInfo.jdcNum}}</td>
                <td>{{zcInvoiceInfo.jdcMoney}}</td>
                <td>{{zcInvoiceInfo.jdcTax_money}}</td>

                <td>0</td>
                <td>0.00</td>
                <td>0.00</td>
              </tr>
              </tbody>
            </table>
            <div class="tips mt-20">
              <div class="tips-con-bz">
                <div style="width: 4px;height: 20px;background-color: #16307a;float:left;"></div>
                <span style="float: left; margin-left: 10px; font-size: 16px; font-weight: 700;">备注</span>
              </div>
              <p>1、本统计表包括当前税款所属期内所有勾选为抵扣和不抵扣的增值税发票；</p>
              <p>2、一个属期内对已勾选的发票支持多次申请统计操作；</p>
              <p>3、申报期内，对已勾选数据进行申请统计后，系统将自动锁定当期抵扣勾选操作；如需继续勾选发票，可在撤销统计成功后继续进行发票勾选或撤勾选操作；</p>
              <p>4、申报期内，申请统计完成后正式进行申报前，需在本平台对抵扣统计表进行签名确认操作；</p>
              <p>5、申报期内，对抵扣统计表签名确认后申报完成前，支持撤销统计，系统将自动撤销抵扣统计表和确认签名，撤销完成后可以继续勾选发票，修正完毕后需再次进行申请统计和确认签名操作。</p>
              <br>
              <br>
            </div>
          </div>
        </div>
      </div>
      <!--历史属期数据统计 表格数据-->
      <div v-else class="standard">
        <div class="T-title">
          <div class="text-center font-16 mt-65">发票统计表</div>
        </div>
        <!--<table width="100%" class="height40">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>-->
        <!--<span class="height40 color_2" id="nsrmc1">纳税人名称：{{com.company}}</span>-->
        <!--</td>-->
        <!--<td>-->
        <!--<span class="height40 color_2" id="nsrsbh1">纳税人识别号：{{com.taxNumber}}</span>-->
        <!--</td>-->
        <!--<td>-->
        <!--<span class="height40 color_2" id="rzyf1">认证月份：{{taxdate}}</span>-->
        <!--</td>-->
        <!--<td align="right">-->
        <!--<span class="height40 color_2 mar_l_30">单位：（份、元）</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <div style="width: 100%; overflow-x: auto;">
          <table width="100%" class="height40 resulttable" border="1" cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
              <th width="20%" rowspan="2">
                <div class="out">
                  <b>用途</b>
                  <em style="color: rgb(0, 0, 0);">发票类型</em>
                </div>
              </th>
              <th width="20%" colspan="3">抵扣</th>
              <th width="20%" colspan="3">不抵扣</th>
            </tr>
            <tr>
              <th>份数</th>
              <th>金额</th>
              <th>有效税额</th>
              <th>份数</th>
              <th>金额</th>
              <th>有效税额</th>
            </tr>
            <tr>
              <td>增值税专用发票</td>
              <td>{{zcInvoiceInfo.zyfpNum}}</td>
              <td>{{zcInvoiceInfo.zyfpMoney}}</td>
              <td>{{zcInvoiceInfo.zyfpTax_money}}</td>

              <td>0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>机动车销售统一发票</td>
              <td>{{zcInvoiceInfo.jdcNum}}</td>
              <td>{{zcInvoiceInfo.jdcMoney}}</td>
              <td>{{zcInvoiceInfo.jdcTax_money}}</td>

              <td>0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            </tbody>
          </table>
          <div class="tips mt-20">
            <div class="tips-con-bz">
              <div style="width: 4px;height: 20px;background-color: #16307a;float:left;"></div>
              <span style="float: left; margin-left: 10px; font-size: 16px; font-weight: 700;">备注</span>
            </div>
            <p>1、本统计表包括当前选定税款所属期内所有勾选为抵扣和不抵扣的增值税发票；</p>
            <p>2、本统计表只允许查询下载近一年数据。</p>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentInvoice === 0" style="min-height: 40px;"></div>
    <div v-else class="width-1200" style="min-height: 40px; margin-top: 20px;">
      <div class="T-title">
        <span class="pad15_r font-16">
          <div class="row-top-blue"></div>
          <span class="row-top-text">发票清单</span>
        </span>
        <span class="f-r" style="margin-top: -10px;">
          <a class="button button-green switch-invoice-type_on">查询明细下载</a>
          <a class="button button-green switch-invoice-type_on">查询</a>
        </span>
      </div>
      <div>
        <div class="height40">
          <p>
            发票类别：
            <label class="pad15_r">
              <input type="radio" value="0" v-model="invoiceType"> 增值税专用发票
            </label>
            <label class="pad15_r">
              <input type="radio" value="1" disabled v-model="invoiceType"> 出口转内销发票
            </label>
          </p>
          <span class="pad15_r">发票代码：<input class="input_1" type="text" v-model="condition.code"></span>
          <span class="pad15_r">发票号码：<input class="input_1" type="text" v-model="condition.number"></span>
          <span class="pad15_r" id="createDate">勾选日期：
            <el-date-picker
                    style="width: 300px;border: 1px solid #888888;border-radius: 0px; height: 28px;top: 1px;"
                    v-model="condition.create"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    start-placeholder="起始日期"
                    end-placeholder="截止日期">
            </el-date-picker>
          </span>
          <span class="pad15_r">销方税号：
            <input class="input_1" style="width: 175px;" type="text" v-model="condition.saler_tax_no">
          </span>
          <br>
          <span class="pad15_r" id="certifyMethod">用途：
            <label class="pad15_r">
              <input name="certify_state" type="radio" checked=""> 全部
            </label>
            <label class="pad15_r">
              <input name="certify_state" type="radio">抵扣
            </label>
            <label class="pad15_r">
              <input name="certify_state" type="radio">不抵扣
            </label>
          </span>
        </div>
        <div class="T-title">
          <span class="pad15_r font-16">
            <div class="row-top-blue"></div>
            <span class="row-top-text">查询结果</span>
          </span>
        </div>
        <div class="mb-10">
          <el-table :data="dataInfo" size="mini" border style="width: 100%;">
            <el-table-column label="序号" width="40"/>
            <el-table-column label="发票代码" width="80"/>
            <el-table-column label="发票号码" width="80"/>
            <el-table-column label="开票日期" width="80"/>
            <el-table-column label="销方名称"/>
            <el-table-column label="金额"/>
            <el-table-column label="税额"/>
            <el-table-column label="有效税额" width="70"/>
            <el-table-column label="勾选日期" width="80"/>
            <el-table-column label="发票类型" width="80"/>
            <el-table-column label="用途" width="80"/>
            <el-table-column label="发票状态" width="80"/>
            <el-table-column label="管理状态" width="80"/>
            <el-table-column label="操作" width="80"/>
          </el-table>
        </div>
      </div>



    </div>
    <span>
    <!--<div id="tip_info" v-show="showSelectStatus" class="standard">-->
      <!--<hr class="detail_hr">-->
      <!--<form>-->
        <!--<div class="height40">-->
          <!--<span class="pad15_r">发票代码：<input class="input_1" type="text" v-model="condition.code"></span>-->
          <!--<span class="pad15_r">发票号码：<input class="input_1" type="text" v-model="condition.number"></span>-->
          <!--<span class="pad15_r" id="createDate">开票日期：-->
            <!--<el-date-picker-->
                    <!--style="width: 300px;border: 1px solid #888888;border-radius: 0px; height: 28px;top: 1px;"-->
                    <!--v-model="condition.create"-->
                    <!--type="daterange"-->
                    <!--format="yyyy-MM-dd"-->
                    <!--value-format="yyyy-MM-dd"-->
                    <!--range-separator="-"-->
                    <!--start-placeholder="起始日期"-->
                    <!--end-placeholder="截止日期">-->
            <!--</el-date-picker>-->
          <!--</span>-->
          <!--<span class="pad15_r">销方税号：-->
            <!--<input class="input_1" style="width: 175px;" type="text" v-model="condition.saler_tax_no">-->
          <!--</span>-->
          <!--<br>-->
          <!--<span class="pad15_r" id="certifyMethod">认证方式：-->
            <!--<label class="pad15_r">-->
              <!--<input name="certify_state" type="radio" checked=""> 全部-->
            <!--</label>-->
            <!--<label class="pad15_r">-->
              <!--<input name="certify_state" type="radio">勾选认证-->
            <!--</label>-->
            <!--<label class="pad15_r">-->
              <!--<input name="certify_state" type="radio">扫描认证-->
            <!--</label>-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="T-title">-->
          <!--<span class="font-16">查询结果</span>-->
          <!--<span class="f-r" style="margin-top: -10px;">-->
            <!--<el-button type="primary" class="button button-blue" @click="inquireInvoiceInfo">查询</el-button>-->
          <!--</span>-->
        <!--</div>-->
      <!--</form>-->

      <!--<div class="T-title text-center font-16">-->
        <!--发票清单-->
      <!--</div>-->
      <!--<table width="100%" class="height40" id="tab_title">-->
        <!--<tbody>-->
        <!--<tr>-->
          <!--<td>-->
            <!--<span class="height40 color_2" id="nsrmc2">纳税人名称：{{com.company}}</span>-->
          <!--</td>-->
          <!--<td>-->
            <!--<span class="height40 color_2" id="nsrsbh2">纳税人识别号：{{com.taxNumber}}</span>-->
          <!--</td>-->
          <!--<td>-->
            <!--<span class="height40 color_2" id="rzyf2">认证月份：{{taxdate}}</span>-->
          <!--</td>-->
          <!--<td align="right" colspan="3">-->
            <!--<span class="height40 color_2 mar_l_30">单位：（份、元）</span>-->
          <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
      <!--<div class="contentBox" id="tab1">-->
        <!--<el-table-->
                <!--class="contentBoxTable"-->
                <!--:data="datatable"-->
                <!--style="width: 100%">-->
          <!--<el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <!--<el-table-column prop="code" label="发票代码"></el-table-column>-->
          <!--<el-table-column prop="number" label="发票号码"></el-table-column>-->
          <!--<el-table-column prop="create_date" label="开票日期"></el-table-column>-->
          <!--<el-table-column prop="saler_name" label="销方名称"></el-table-column>-->
          <!--<el-table-column prop="money" label="金额"></el-table-column>-->
          <!--<el-table-column prop="tax_money" label="税额"></el-table-column>-->
          <!--<el-table-column prop="attestType" label="认证方式"></el-table-column>-->
          <!--<el-table-column prop="checkCertificationdate" label="确认/认证日期" width="120px"></el-table-column>-->
          <!--<el-table-column prop="tax_cate" label="发票类型" width="130px"></el-table-column>-->
          <!--<el-table-column prop="state" label="发票状态"></el-table-column>-->
        <!--</el-table>-->

        <!--<div class="text-center ajaxPage" style="margin: 20px 0 20px;" data-totalnum>-->
          <!--<el-pagination layout="total" :total="total"></el-pagination>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
      </span>
    <!--勾选发票信息弹窗-->
    <div class="statisticsDialog" v-if="statisticsDialog">
      <el-dialog
              title="提示信息"
              :visible.sync="statisticsDialog"
              width="330px"
              :close-on-click-modal="false">
        <div style="height: 130px;" class="invoice-checks-dialog-form">
          <div style="width: 25%; padding-top: 20px;" class="float-left">
            <i class="el-icon-question" style="font-size: 60px; color: #FB6908;"></i>
          </div>
          <div style="width: 75%; line-height: 70px; font-weight: bold;" class="float-left fs-16">
            <p>是否确定申请生成统计报表！</p>
          </div>
          <p class="text-center">
            <span slot="footer" class="dialog-footer">
              <input type="button" class="button button-blue mr-10" @click="statisticsDialog = false" value="取消"></input>
              <input type="button" class="button button-blue" @click="toStatisticsTwo" value="确定"></input>
            </span>
          </p>
        </div>
      </el-dialog>
    </div>
    <!--确认申报信息弹窗-->
    <div class="statisticsDialog" v-if="declareDialog">
      <el-dialog
              title="提示信息"
              :visible.sync="declareDialog"
              width="450px"
              :close-on-click-modal="false">
        <div style="height: 130px;" class="invoice-checks-dialog-form">
          <div style="width: 20%; padding-top: 20px;" class="float-left">
            <i class="el-icon-question" style="font-size: 60px; color: #FB6908;"></i>
          </div>
          <div style="width: 75%; line-height: 70px; font-weight: bold;" class="float-left">
            <p>是否确定,确认后当前统计报表将作为申报的依据!</p>
          </div>
          <p class="text-center">
            <span slot="footer" class="dialog-footer">
              <input type="button" class="button button-blue mr-10" @click="declareDialog = false" value="取消"></input>
              <input type="button" class="button button-blue" @click="saveDeclare" value="确定"></input>
            </span>
          </p>
        </div>
      </el-dialog>
    </div>
    <!--发票抵扣统计表弹窗-->
    <div class="statisticsDialog" v-if="deductionDialog">
      <el-dialog
              title="查询信息"
              :visible.sync="deductionDialog"
              width="1100px"
              :close-on-click-modal="false">
        <div style="height: 220px;" class="invoice-checks-dialog-form">
          <div class="text-center table-title">发票抵扣统计表</div>
          <table width="100%" class="height40 resulttable" border="1" cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
              <th width="20%" rowspan="2">
                <div class="out">
                  <b>用途</b>
                  <em style="color: rgb(0, 0, 0);">发票类型</em>
                </div>
              </th>
              <th width="20%" colspan="3">抵扣</th>
              <th width="20%" colspan="3">不抵扣</th>
            </tr>
            <tr>
              <th>份数</th>
              <th>金额</th>
              <th>有效税额</th>
              <th>份数</th>
              <th>金额</th>
              <th>有效税额</th>
            </tr>
            <tr>
              <td>增值税专用发票</td>
              <td>{{yrzInvoiceInfo.zyfpNum}}</td>
              <td>{{this.changeTwoDecimal_f(yrzInvoiceInfo.zyfpMoney)}}</td>
              <td>{{this.changeTwoDecimal_f(yrzInvoiceInfo.zyfpTax_money)}}</td>

              <td>{{yrzInvoiceInfo.bdkzyfpNum}}</td>
              <td>{{this.changeTwoDecimal_f(yrzInvoiceInfo.bdkzyfpMoney)}}</td>
              <td>{{this.changeTwoDecimal_f(yrzInvoiceInfo.bdkzyfpTax_money)}}</td>
            </tr>
            <tr>
              <td>机动车销售统一发票</td>
              <td>{{yrzInvoiceInfo.jdcNum}}</td>
              <td>{{yrzInvoiceInfo.jdcMoney}}</td>
              <td>{{yrzInvoiceInfo.jdcTax_money}}</td>

              <td>0</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'

  export default {
    name: "Count",
    mixins: [common],
    data() {
      return {
        showSelectStatus: 0,
        com: {},
        taxdate: '',
        // 正常发票信息统计
        zcInvoiceInfo: {
          zyfpNum: 0, // 专用发票数量
          zyfpMoney: 0, // 专用发票总金额
          zyfpTax_money: 0, // 专用发票总税额

          jdcNum: 0, // 机动车发票数量
          jdcMoney: 0, // 机动车发票总金额
          jdcTax_money: 0, // 机动车发票总税额

          numTotal: 0, // 数量合计
          moneyTotal: 0, // 金额合计
          tax_moneyTotal: 0, // 税额合计

          bdkzyfpNum: 0, // 不抵扣专用发票数量
          bdkzyfpMoney: 0, // 不抵扣专用发票总金额
          bdkzyfpTax_money: 0, // 不抵扣专用发票总税额

          bdkjdcNum: 0, // 不抵扣机动车发票数量
          bdkjdcMoney: 0, // 不抵扣机动车发票总金额
          bdkjdcTax_money: 0, // 不抵扣机动车发票总税额

        },
        // 异常发票信息统计
        ycInvoiceInfo: {
          zyfpNum: 0, // 专用发票数量
          zyfpMoney: 0, // 专用发票总金额
          zyfpTax_money: 0, // 专用发票总税额

          jdcNum: 0, // 机动车发票数量
          jdcMoney: 0, // 机动车发票总金额
          jdcTax_money: 0, // 机动车发票总税额

          numTotal: 0, // 数量合计
          moneyTotal: 0, // 金额合计
          tax_moneyTotal: 0, // 税额合计

          bdkzyfpNum: 0, // 不抵扣专用发票数量
          bdkzyfpMoney: 0, // 不抵扣专用发票总金额
          bdkzyfpTax_money: 0, // 不抵扣专用发票总税额

          bdkjdcNum: 0, // 不抵扣机动车发票数量
          bdkjdcMoney: 0, // 不抵扣机动车发票总金额
          bdkjdcTax_money: 0, // 不抵扣机动车发票总税额
        },
        // 已认证发票信息统计
        yrzInvoiceInfo: {
          zyfpNum: 0, // 专用发票数量
          zyfpMoney: 0, // 专用发票总金额
          zyfpTax_money: 0, // 专用发票总税额

          jdcNum: 0, // 机动车发票数量
          jdcMoney: 0, // 机动车发票总金额
          jdcTax_money: 0, // 机动车发票总税额

          numTotal: 0, // 数量合计
          moneyTotal: 0, // 金额合计
          tax_moneyTotal: 0, // 税额合计

          bdkzyfpNum: 0, // 不抵扣专用发票数量
          bdkzyfpMoney: 0, // 不抵扣专用发票总金额
          bdkzyfpTax_money: 0, // 不抵扣专用发票总税额

          bdkjdcNum: 0, // 不抵扣机动车发票数量
          bdkjdcMoney: 0, // 不抵扣机动车发票总金额
          bdkjdcTax_money: 0, // 不抵扣机动车发票总税额
        },
        // 查询条件
        condition: {
          code: '',
          number: '',
          create: '',
          saler_tax_no: '',

        },
        datatable: [],
        total: 0,
        invoiceType: '0', // 查询发票类型
        currentInvoice: 0, // 当前属期数据统计/历史属期数据统计
        taxMonth: '', // 税款所属期月份
        dataInfo: [],
        statisticsDialog: false,
        declareDialog: false,
        deductionDialog: false,
        width_sum: 0
      }
    },
    mounted() {
      // 同步企业基本信息
      this.synchronizeComInfo()
      // 同步税款所属期
      this.taxdate = this.com.tax_time
      // 获取当前申报月份
      this.setMonth(this.com.tax_time)
    },
    methods: {
      // 获取当前申报月份
      setMonth(res) {
        var time = this.conversionTime(res).split('-') // 拆解完毕后是  年  月  日

        this.month = time[1]
        this.taxdate = time[0] + '年' + time[1] + '月'
      },
      // 发票信息统计
      statisticsInvoiceInfo() {
        var invoice = this.$store.state.publicData.invoiceList
        // 正常发票信息统计
        this.zcInvoiceInfo = {
          zyfpNum: 0, // 专用发票数量
            zyfpMoney: 0, // 专用发票总金额
            zyfpTax_money: 0, // 专用发票总税额

            jdcNum: 0, // 机动车发票数量
            jdcMoney: 0, // 机动车发票总金额
            jdcTax_money: 0, // 机动车发票总税额

            numTotal: 0, // 数量合计
            moneyTotal: 0, // 金额合计
            tax_moneyTotal: 0, // 税额合计

            bdkzyfpNum: 0, // 不抵扣专用发票数量
            bdkzyfpMoney: 0, // 不抵扣专用发票总金额
            bdkzyfpTax_money: 0, // 不抵扣专用发票总税额

            bdkjdcNum: 0, // 不抵扣机动车发票数量
            bdkjdcMoney: 0, // 不抵扣机动车发票总金额
            bdkjdcTax_money: 0, // 不抵扣机动车发票总税额

        },
        // 异常发票信息统计
        this.ycInvoiceInfo = {
          zyfpNum: 0, // 专用发票数量
            zyfpMoney: 0, // 专用发票总金额
            zyfpTax_money: 0, // 专用发票总税额

            jdcNum: 0, // 机动车发票数量
            jdcMoney: 0, // 机动车发票总金额
            jdcTax_money: 0, // 机动车发票总税额

            numTotal: 0, // 数量合计
            moneyTotal: 0, // 金额合计
            tax_moneyTotal: 0, // 税额合计

            bdkzyfpNum: 0, // 不抵扣专用发票数量
            bdkzyfpMoney: 0, // 不抵扣专用发票总金额
            bdkzyfpTax_money: 0, // 不抵扣专用发票总税额

            bdkjdcNum: 0, // 不抵扣机动车发票数量
            bdkjdcMoney: 0, // 不抵扣机动车发票总金额
            bdkjdcTax_money: 0, // 不抵扣机动车发票总税额
        },
        // 已认证发票信息统计
        this.yrzInvoiceInfo = {
          zyfpNum: 0, // 专用发票数量
            zyfpMoney: 0, // 专用发票总金额
            zyfpTax_money: 0, // 专用发票总税额

            jdcNum: 0, // 机动车发票数量
            jdcMoney: 0, // 机动车发票总金额
            jdcTax_money: 0, // 机动车发票总税额

            numTotal: 0, // 数量合计
            moneyTotal: 0, // 金额合计
            tax_moneyTotal: 0, // 税额合计

            bdkzyfpNum: 0, // 不抵扣专用发票数量
            bdkzyfpMoney: 0, // 不抵扣专用发票总金额
            bdkzyfpTax_money: 0, // 不抵扣专用发票总税额

            bdkjdcNum: 0, // 不抵扣机动车发票数量
            bdkjdcMoney: 0, // 不抵扣机动车发票总金额
            bdkjdcTax_money: 0, // 不抵扣机动车发票总税额
        }

        if (invoice !== undefined) {
          for (var i = 0; i < invoice.length; i++) {
            // 未认证的发票
            if(parseInt(invoice[i].certify_state) === 0) {
              // 已勾选发票
              if(parseInt(invoice[i].check_state) === 1) {
                if (invoice[i].state == 1) {
                  // 正常发票信息
                  this.zcInvoiceInfo.numTotal = this.zcInvoiceInfo.numTotal + 1
                  this.zcInvoiceInfo.moneyTotal = this.zcInvoiceInfo.moneyTotal + invoice[i].money * 1
                  this.zcInvoiceInfo.tax_moneyTotal = this.zcInvoiceInfo.tax_moneyTotal + invoice[i].tax_money * 1

                  // 增值税专用发票
                  if (invoice[i].tax_cate === '1') {
                    // 抵扣发票
                    if(!invoice[i].deduction) {
                      this.zcInvoiceInfo.zyfpNum = this.zcInvoiceInfo.zyfpNum + 1
                      this.zcInvoiceInfo.zyfpMoney = this.zcInvoiceInfo.zyfpMoney + invoice[i].money * 1
                      this.zcInvoiceInfo.zyfpTax_money = this.zcInvoiceInfo.zyfpTax_money + invoice[i].tax_money * 1
                    } else {
                      // 不抵扣发票
                      this.zcInvoiceInfo.bdkzyfpNum = this.zcInvoiceInfo.bdkzyfpNum + 1
                      this.zcInvoiceInfo.bdkzyfpMoney = this.zcInvoiceInfo.bdkzyfpMoney + invoice[i].money * 1
                      this.zcInvoiceInfo.bdkzyfpTax_money = this.zcInvoiceInfo.bdkzyfpTax_money + invoice[i].tax_money * 1
                    }
                  } else {
                    // 机动车专用发票
                    if(!invoice[i].deduction) {
                      this.zcInvoiceInfo.jdcNum = this.zcInvoiceInfo.jdcNum + 1
                      this.zcInvoiceInfo.jdcMoney = this.zcInvoiceInfo.jdcMoney + invoice[i].money * 1
                      this.zcInvoiceInfo.jdcTax_money = this.zcInvoiceInfo.jdcTax_money + invoice[i].tax_money * 1
                    } else {
                      this.zcInvoiceInfo.jdcNum = this.zcInvoiceInfo.bdkjdcNum + 1
                      this.zcInvoiceInfo.jdcMoney = this.zcInvoiceInfo.bdkjdcMoney + invoice[i].money * 1
                      this.zcInvoiceInfo.jdcTax_money = this.zcInvoiceInfo.bdkjdcTax_money + invoice[i].tax_money * 1
                    }
                  }
                } else {
                  // 异常发票信息
                  this.ycInvoiceInfo.numTotal = this.ycInvoiceInfo.numTotal + 1
                  this.ycInvoiceInfo.moneyTotal = this.ycInvoiceInfo.moneyTotal + invoice[i].money * 1
                  this.ycInvoiceInfo.tax_moneyTotal = this.ycInvoiceInfo.tax_moneyTotal + invoice[i].tax_money * 1

                  if (invoice[i].tax_cate === '1') {
                    this.ycInvoiceInfo.zyfpNum = this.ycInvoiceInfo.zyfpNum + 1
                    this.ycInvoiceInfo.zyfpMoney = this.ycInvoiceInfo.zyfpMoney + invoice[i].money * 1
                    this.ycInvoiceInfo.zyfpTax_money = this.ycInvoiceInfo.zyfpTax_money + invoice[i].tax_money * 1
                  } else {
                    this.ycInvoiceInfo.jdcNum = this.ycInvoiceInfo.jdcNum + 1
                    this.ycInvoiceInfo.jdcMoney = this.ycInvoiceInfo.jdcMoney + invoice[i].money * 1
                    this.ycInvoiceInfo.jdcTax_money = this.ycInvoiceInfo.jdcTax_money + invoice[i].tax_money * 1
                  }
                }
              }
            } else {
              // 已认证的发票信息
              if (invoice[i].state == 1) {
                // 正常发票信息
                this.yrzInvoiceInfo.numTotal = this.yrzInvoiceInfo.numTotal + 1
                this.yrzInvoiceInfo.moneyTotal = this.yrzInvoiceInfo.moneyTotal + invoice[i].money * 1
                this.yrzInvoiceInfo.tax_moneyTotal = this.yrzInvoiceInfo.tax_moneyTotal + invoice[i].tax_money * 1

                // 增值税专用发票
                if (parseInt(invoice[i].tax_cate) === 1) {
                  // 抵扣发票
                  if(!invoice[i].deduction) {
                    this.yrzInvoiceInfo.zyfpNum = this.yrzInvoiceInfo.zyfpNum + 1
                    this.yrzInvoiceInfo.zyfpMoney = this.yrzInvoiceInfo.zyfpMoney + invoice[i].money * 1
                    this.yrzInvoiceInfo.zyfpTax_money = this.yrzInvoiceInfo.zyfpTax_money + invoice[i].tax_money * 1
                  } else {
                    // 不抵扣发票
                    this.yrzInvoiceInfo.bdkzyfpNum = this.yrzInvoiceInfo.bdkzyfpNum + 1
                    this.yrzInvoiceInfo.bdkzyfpMoney = this.yrzInvoiceInfo.bdkzyfpMoney + invoice[i].money * 1
                    this.yrzInvoiceInfo.bdkzyfpTax_money = this.yrzInvoiceInfo.bdkzyfpTax_money + invoice[i].tax_money * 1
                  }
                } else {
                  // 机动车专用发票
                  if(!invoice[i].deduction) {
                    this.yrzInvoiceInfo.jdcNum = this.yrzInvoiceInfo.jdcNum + 1
                    this.yrzInvoiceInfo.jdcMoney = this.yrzInvoiceInfo.jdcMoney + invoice[i].money * 1
                    this.yrzInvoiceInfo.jdcTax_money = this.yrzInvoiceInfo.jdcTax_money + invoice[i].tax_money * 1
                  } else {
                    this.yrzInvoiceInfo.jdcNum = this.yrzInvoiceInfo.bdkjdcNum + 1
                    this.yrzInvoiceInfo.jdcMoney = this.yrzInvoiceInfo.bdkjdcMoney + invoice[i].money * 1
                    this.yrzInvoiceInfo.jdcTax_money = this.yrzInvoiceInfo.bdkjdcTax_money + invoice[i].tax_money * 1
                  }
                }
              }
            }
          }
        }
      },
      // 更多查询条件控制
      selectStatus() {
        if (this.showSelectStatus === 0) {
          this.showSelectStatus = 1
        } else {
          this.showSelectStatus = 0
        }
      },
      // 根据条件查询发票信息
      inquireInvoiceInfo() {
        var invoice = this.$store.state.publicData.invoiceList
        var attr = []
        if (invoice !== undefined) {
          for (var i = 0; i < invoice.length; i++) {
            // 筛选认证后的发票
            if (invoice[i].checkCertification === '是' && invoice[i].checkCertificationdate !== '') {
              if (invoice[i].code === this.condition.code || this.condition.code === '') {
                if (invoice[i].number === this.condition.number || this.condition.number === '') {
                  if (invoice[i].saler_tax_no === this.condition.saler_tax_no || this.condition.saler_tax_no === '') {
                    // 比对日期时间范围
                    if (this.condition.create != '') {
                      var timeStatus = this.isDateBetween(invoice[i].create_date, this.condition.create[0], this.condition.create[1])
                    }
                    if (timeStatus || this.condition.create == '') {
                      invoice[i]['attestType'] = '勾选认证'
                      attr.push(invoice[i])
                    }
                  }
                }
              }
            }
          }
          this.datatable = attr
          this.total = attr.length
        }
      },
      // 统计类型切换
      countType(type) {
        this.currentInvoice = type
      },
      // 申请统计
      toStatistics() {
        this.statisticsDialog = true
      },
      // 确认申请统计
      toStatisticsTwo() {
        this.statisticsDialog = false
        this.width_sum = 1
        setTimeout(() => {
          this.width_sum = 2
          // 发票统计
          this.statisticsInvoiceInfo()
        },2000)
      },
      // 确认签名申报
      toDeclare() {
        this.declareDialog = true
      },
      // 确认申报
      saveDeclare() {
        this.declareDialog = false
        // 输入证书密码
        this.$prompt('请输入证书密码：', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if(this.com.certify_pwd == value) {
            this.$store.commit('declareInvoice')
            this.$message.success('确认成功!')
            this.width_sum = 3
          } else {
            this.$message.error('证书密码错误!');
          }
        }).catch(() => {});
        // this.$store.commit('declareInvoice')
      },
      // 撤销统计
      cancelCount() {
        this.width_sum = 0
      },
      // 统计查询
      countInquire() {
        this.statisticsInvoiceInfo()
        this.deductionDialog = true
      }
    }
  }
</script>

<style>
  .content .statisticsDialog .el-dialog__body {
    padding: 15px 20px 20px 20px;
  }

  .content .statisticsDialog .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }
  .contentBoxTable .cell {
    font-size: 14px;
    color: #333333;
    text-align: center;
  }
</style>
<style scoped>
  .table-title{
    height: 40px;
    font-size: 18px;
    font-weight: bold;
  }
  .invoice-checks-dialog-form p {
    height: 70px;
    margin: 15px 0;
  }
  .iconClass{
    font-size: 60px;
    color: #FB6908;
  }
  .fs-16{
    font-size: 16px;
  }
  .h-42{
    height: 42px;
  }
  .mt-65{
    margin-top: 65px;
  }
  .mr-10{
    margin-right: 10px;
  }
  .standard-timeline li .on_span{
    background: url(../../assets/public/cell-active.png) center top no-repeat !important;
  }
  .standard-timeline li span{
    position: relative;
    margin: 0 auto;
    font-weight: 700;
    font-size: 20px;
    font-family: Arial;
    color: #fff;
    height: 40px;
    line-height: 40px;
    background: url(../../assets/public/cell.png) center top no-repeat;
    display: block;
  }
  .standard-timeline li{
    position: relative;
    list-style-type: none;
    text-align: center;
    float: left;
  }
  .standard-timeline ul, .standard-timeline li{
    list-style: none;
  }

  .width-33{
    width: 33.33% !important;
  }
  .width-66{
    width: 66.66% !important;
  }
  .width-100{
    width: 100% !important;
  }

  .standard-timeline .step-bar-active {
    background: url(../../assets/public/bar-bg-active.png);
    border-radius: 12px;
    height: 14px;
    width: 0px;
  }

  .standard-timeline .step-bar {
    position: absolute;
    width: 100%;
    background: url(../../assets/public/bar-bg.png);
    border-radius: 12px;
    z-index: 0;
    top: 12px;
    height: 14px;
  }

  .standard-timeline {
    margin: 40px auto;
    width: 90%;
    position: relative;
    height: 50px;
    line-height: 50px;
    /*background-color: #13ce66;*/
  }

  .switch-invoice-type_on {
    color: #ffffff !important;
    font-weight: bold !important;
    background-color: #3bb5ee !important;
    border: 1px solid #3bb5ee !important;
  }

  .switch-invoice-type input {
    height: 45px;
    padding: 5px 30px;
    border-radius: 5px;
    color: #666666;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    font-size: 16px;
    cursor: pointer;
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

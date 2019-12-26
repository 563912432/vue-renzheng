<template>
  <div class="content">
    <!--面包屑-->
    <div class="breadCrumb">
      <div class="standard">
        <div class="iconfont rz-iconditu float-left font-24"></div>
        <a class="float-left font-16 ml-25">当前位置：首页-<span class="cl-888">抵扣勾选</span>-<span
                class="cl-888">发票批量抵扣勾选</span></a>
        <div class="iconfont rz-iconyou float-right font-24"></div>
        <a class="float-right font-16 mr-5">帮助</a>
      </div>
    </div>

    <div class="standard">
      <div class="T-title">
        <div class="row-top-blue"></div>
        <span class="row-top-text">当前税款所属期：</span>
        <span class="color_3 font-16" id="ssq">{{taxdate}}</span>
        <span class="color_2 font_1" id="kgxsj">(当期可进行勾选操作的截止日期为：{{taxTimeEnd}})</span>
        <span class="f-r excelFile" style="margin-top: -10px;">
          <input type="button" class="button button-blue" style="cursor: pointer;margin-right: 10px;" value="查询">
          <a type="file" class="button button-red f-r" style="border-radius: 15px;" @click="triggerClick"
             href="javascript:;">上传</a>
          <input type="file" ref="file" id="fileselect" style="display: none;">
          <download-excel
                  class="f-r mr-10"
                  :data="json_data"
                  :fields="json_fields"
                  type="xls"
                  name="发票文件.xls">
            <a class="button button-blue" href="javascript:;">下载发票文件</a>
          </download-excel>
        </span>
      </div>
      <div>
        <span class="pad15_r" id="createDate">开票日期：
          <label>
            <input class="form-control datepicker" style="width: 110px; display: inline;" type="text"
                   name="createStart"> -
            <input class="form-control datepicker" style="width: 110px; display: inline;" type="text" name="createEnd">
          </label>
        </span>
        <span class="pad15_r" id="checkDate" style="display: none;">勾选日期：
          <label>
            <input class="form-control datepicker" style="width: 110px; display: inline;" type="text" name="checkStart"> -
            <input class="form-control datepicker" style="width: 110px; display: inline;" type="text" name="checkEnd">
          </label>
        </span>
        <span class="pad15_r">销方税号：<input class="input_1" name="saler_tax_no" style="width: 200px;" type="text"></span>
        <span class="pad15_r checkState">勾选标志：
          <label class="pad30_r"><input name="abc" type="radio" checked>未勾选</label>
          <label class="pad30_r"><input name="abc" type="radio"> 已勾选</label>
        </span>
        <span>
          接收日期：
          <label>
            <input class="form-control datepicker" style="width: 110px; display: inline;" type="text"
                   name="create_at"> -
            <input class="form-control datepicker" style="width: 110px; display: inline;" type="text" name="createEnd">
          </label>
        </span>
      </div>
    </div>

    <div class="standard">
      <div class="T-title">
        <div class="row-top-blue"></div>
        <span class="row-top-text">批量勾选：</span>
      </div>
      <p class="text-center standard-title">数据汇总情况</p>
      <el-table
              class="checkTable"
              :data="checkTableData"
              border
              style="width: 100%;">
        <el-table-column label="勾选标志">已勾选</el-table-column>
        <el-table-column prop="number" label="发票分数"></el-table-column>
        <el-table-column prop="money" label="合计金额(元)"></el-table-column>
        <el-table-column prop="tax_money" label="合计税额(元)"></el-table-column>
        <el-table-column label="操作">
          <p class="text-center col-red hand" @click="cancelChecks">撤销勾选</p>
        </el-table-column>
      </el-table>
      <p class="text-center standard-title mt-20">批量勾选日志</p>
      <el-table
              :span-method="objectSpanMethod"
              class="checkTable"
              :data="checkTableDataAll"
              border
              style="width: 100%; color: red;">
        <el-table-column prop="datatime" label="上传时间"></el-table-column>
        <el-table-column prop="check" label="勾选结果"></el-table-column>
        <el-table-column prop="number" label="发票份数"></el-table-column>
        <el-table-column prop="money" label="金额(元)"></el-table-column>
        <el-table-column prop="tax_money" label="税额(元)"></el-table-column>
      </el-table>
    </div>
    <div class="upload-remark mt-20">
      <div class="tips standard" style="margin-top: 20px;">
        <div class="tips-con-bz">
          <div class="row-top-blue"></div>
          <span class="row-top-text">备注</span>
        </div>
        <p>1、除发票状态、管理状态为正常外，其他异常发票不允许勾选；</p>
        <p>2、对于勾选为抵扣的发票默认全额抵扣，您可根据实际情况自行调整有效抵扣税额，请注意：差额部分将不可继续勾选为其他用途；</p>
        <p>3、对于信息来源为扫描认证的发票，支持撤销勾选操作，再次勾选时税款所属期归属在勾选提交时的当期；</p>
        <p>4、对于已勾选的发票，您可以在这里撤销勾选，但在申报期内，如您已经在“抵扣勾选统计”模块进行了申请统计，系统将锁定当期的勾选操作；如需继续勾选发票，可在撤销统计成功后继续进行发票勾选；</p>
        <p>5、批量勾选会忽略已勾选的发票再次勾选和已撤销勾选的发票再次撤销的情况；</p>
        <p>6、本模块支持查询当期可勾选范围内已勾选和未勾选的发票。往期认证和未到认证期的发票，请前往进项发票查询模块的“单票查询”和“未到勾选日期发票查询”进行查询。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'
  import XLSX from "xlsx";

  export default {
    name: "Upload",
    mixins: [common],
    data() {
      return {
        com: {},
        taxdate: '',
        taxTimeEnd: '',
        // 发票下载插件
        json_fields: {
          '是否勾选': 'check_state', // 是否勾选
          '发票代码': 'code', // 发票代码
          '发票号码': 'number', // 发票号码
          '开票日期': 'create_time', // 开票日期
          '税额': 'tax_money', // 税额
          '有效抵扣金额': 'declare_tax_money', // 有效抵扣税额
          '销方名称': 'saler_name', // 销方名称
          '销方税号': 'saler_tax_no', // 销方税号
          '金额': 'money', // 金额
          '用途': 'use', // 用途
        },
        json_data: [],
        json_meta: [
          [
            {
              " key ": " charset ",
              " value ": " utf- 8 "
            }
          ]
        ],
        uploadList: [], // 上传文件的内容
        checkTableData: [], // 上传文件内的勾选发票数据
        checkTableDataAll: [], // 上传文件内的操作日志

        // 合并行
        spanArr: [],
        position: 0,
        checkInvoice: null, // 批量上传中有效的勾选发票数据

        notCheckNumber: 0, // 未勾选发票数量
        notCheckMoney: 0, // 未勾选发票总金额
        notCheckTax_money: 0, // 未勾选发票总税额

        checkMoney: 0, // 勾选发票总金额
        checkTax_money: 0, // 勾选发票总税额

      }
    },
    mounted() {
      // 同步企业基本信息
      this.synchronizeComInfo()
      // 同步税款所属期
      this.taxdate = this.conversionTime(this.com.tax_time)
      this.taxTimeEnd = this.conversionTime(this.com.tax_deadline)


      var preset = this.$store.state.publicData.invoiceList
      // 处理发票内字段显示格式
      var attr = []
      preset.forEach((res) => {
        // 筛选出未勾选的票据
        if (parseInt(res.check_state) === 0) {
          attr.push({...res})
        }
      })
      attr.forEach((item) => {
        item.check_state = '否' // 勾选状态切换 0:未勾选 1:已勾选
        item.create_time = this.conversionTime(item.create_time) // 开票日期转换
        item.use = '抵扣' // 增加用途字段
      })
      this.json_data = attr

      this.readFile()
      // 判断是否批量上传过
      if (this.$store.state.publicData.uploadInvoice) {
        this.checkInvoice = this.$store.state.publicData.uploadInvoice

        var invoiceList = this.$store.state.publicData.invoiceList
        // 计算合计金额、合计税额
        for (var i = 0; i < invoiceList.length; i++) {
          for (var k = 0; k < this.checkInvoice.length; k++) {
            if (invoiceList[i].number == this.checkInvoice[k].number) {
              this.checkMoney = this.changeTwoDecimal_f(Number(this.checkMoney) + this.checkInvoice[k].money * 1)
              this.checkTax_money = this.changeTwoDecimal_f(Number(this.checkTax_money) + this.checkInvoice[k].tax_money * 1)
            }
          }
        }

        this.rowspan()
      }
    },
    methods: {
      triggerClick() {
        this.$refs.file.dispatchEvent(new MouseEvent('click'))
      },
      readFile() {
        let fileselect = document.querySelector('#fileselect')

        fileselect.addEventListener('change', function (e) {
          event.preventDefault()

          var file = e.target.files

          if (file.length <= 0) { // 如果没有文件名
            return
          } else if (!/\.(xls|xlsx)$/.test(file[0].name.toLowerCase())) {
            this.$message({
              type: 'info',
              message: '上传格式不正确，请上传xls或者xlsx格式'
            })
            return
          }

          var reader = new FileReader()

          if (typeof FileReader === 'undefined') {
            this.$message({
              type: 'info',
              message: '您的浏览器不支持FileReader接口'
            })
            return
          }
          reader.readAsBinaryString(file[0])
          reader.onload = (e) => {
            try {
              var data = e.target.result
              var workbook = XLSX.read(data, {type: 'binary'})
              var wsname = workbook.SheetNames[0] // 取第一张表
              var ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])

              this.uploadList = ws // 获取上传文件的内容
              // 处理上传发票
              this.processUploadList()
              this.$message.success('上传成功')
              return false
            } // 生成json表格内容
            catch (e) {
              return false
            }
          }
        }.bind(this))
      },
      // 处理上传发票
      processUploadList() {
        // 数据初始化
        this.spanArr = [],
        this.position = 0,
        this.checkInvoice = [], // 批量上传中有效的勾选发票数据

        this.notCheckNumber = 0, // 未勾选发票数量
        this.notCheckMoney = 0, // 未勾选发票总金额
        this.notCheckTax_money = 0, // 未勾选发票总税额

        this.checkMoney = 0, // 勾选发票总金额
        this.checkTax_money = 0 // 勾选发票总税额


        var attr = []
        var uploadList = this.uploadList // 上传的发票信息
        var invoiceList = this.$store.state.publicData.invoiceList

        for (var i = 0; i < invoiceList.length; i++) {
          for (var k = 0; k < uploadList.length; k++) {
            if (invoiceList[i].number == uploadList[k]['发票号码'] && uploadList[k]['是否勾选'] === '是' && parseInt(invoiceList[i].check_state) !== 1) {
              invoiceList[i].check_state = '1'
              attr.push(invoiceList[i])
              this.checkMoney = this.changeTwoDecimal_f(Number(this.checkMoney) + uploadList[k]['金额'] * 1)
              this.checkTax_money = this.changeTwoDecimal_f(Number(this.checkTax_money) + uploadList[k]['税额'] * 1)
            }
          }
        }
        this.checkInvoice = attr
        if (this.checkInvoice.length !== 0) {
          // 保存有效的发票数据信息
          this.$store.commit('addUploadInvoice', attr)

          // // 修改公用数据内发票信息
          // this.$store.commit('editInvoiceCheckStatus', attr)
          // 表格合并行
          this.rowspan()
        }
      },
      // 表格合并行
      rowspan() {
        // 获取统计运算数据
        var datadate = this.com.check_date
        var checktime = this.com.check_time
        this.checkTableData = [
          {
            datatime: this.conversionTime(checktime),
            datadate: datadate,
            number: this.checkInvoice.length,
            money: this.checkMoney,
            tax_money: this.checkTax_money
          }
        ]
        this.checkTableDataAll = [
          {
            datatime: this.conversionTime(checktime),
            datadate: datadate,
            check: '勾选',
            number: this.checkInvoice.length,
            money: this.checkMoney,
            tax_money: this.checkTax_money
          },
          {
            datadate: datadate,
            check: '撤销',
            number: this.notCheckNumber,
            money: this.notCheckMoney,
            tax_money: this.notCheckTax_money
          },
        ]
        this.checkTableDataAll.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1);
            this.position = 0;
          } else {

            if (this.checkTableDataAll[index].datadate === this.checkTableDataAll[index - 1].datadate) {
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.position = index;
            }
          }
        })
      },
      // 表格合并行
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      // 撤销上传勾选
      cancelChecks() {
        const invoiceList = this.$store.state.publicData.invoiceList // 全部操作票据集合
        const checks = this.$store.state.publicData.uploadInvoice // 上传票据记录
        for (var i = 0; i < invoiceList.length; i++) {
          for (var s = 0; s < checks.length; s++) {
            if(invoiceList[i].code === checks[s].code) {
              invoiceList[i].check_state = '0'
              invoiceList[i].check_time = ''
            }
          }
        }
        this.$store.commit('delUploadInvoice') // 删除数据
        this.reductionInvoiceState()
        this.$message.success('撤回成功')
      },
      // 还原历史记录
      reductionInvoiceState() {
        this.checkInvoice = [], // 批量上传中有效的勾选发票数据
        this.notCheckNumber = 0, // 未勾选发票数量
        this.notCheckMoney = 0, // 未勾选发票总金额
        this.notCheckTax_money = 0, // 未勾选发票总税额

        this.checkMoney = 0, // 勾选发票总金额
        this.checkTax_money = 0 // 勾选发票总税额

        this.checkTableData = []
        this.checkTableDataAll = []
      }
    }
  }
</script>

<style>
  .content .checkTable th {
    background-color: #56627F;
    color: #ffffff;
  }

  .content .checkTable .cell {
    text-align: center;
  }

  .content .gutter {
    display: block !important;
  }
</style>
<style scoped>
  .hand {
    cursor: pointer;
  }

  .col-red {
    color: red;
  }

  .upload-remark {
    border-top: 20px solid #F7F7F7;
  }

  .standard-title {
    font-size: 14px;
    padding: 10px 0;
    color: #666666;
    font-weight: 700;
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

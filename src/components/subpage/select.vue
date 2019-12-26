<template>
  <div class="content">
    <!--面包屑-->
    <div class="breadCrumb">
      当前位置：<a href="">发票查询</a>
      <a class="f-r help notice-help" href="javascript:;">帮助</a>
    </div>


    <div>
      <div class="T-title">
        <span class="font-16">当前税款所属期：</span>
        <span class="color_3" id="ssq">{{taxdate}}</span>
        <span class="color_2 font_1" id="kgxsj"></span>
        <span class="f-r" style="margin-top: -10px;">
          <input class="button button-blue" type="button" style="cursor: pointer;" @click="setConfirmInfo" value="查询">
        </span>
      </div>
      <div style="margin-top: 10px;">
        <span class="pad15_r" id="invoiceRange">发票范围：
          <label class="pad15_r"><input name="invoiceRange" type="radio" :value="0" v-model="invoiceRange" > 单票查询</label>
          <label class="pad15_r"><input name="invoiceRange" type="radio" :value="1" v-model="invoiceRange" > 未到期发票</label>
        </span>
      </div>
      <br>
      <div class="height40">
        <span class="pad15_r">发票代码：<input class="input_1" type="text" v-model="code"></span>
        <span class="pad15_r">发票号码：<input class="input_1" type="text" v-model="number"></span>
        <span class="pad15_r" v-show="invoiceRange" >开票日期：
          <el-date-picker
            style="width: 300px;border: 1px solid #888888;border-radius: 0px;"
            v-model="create"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="起始日期"
            end-placeholder="截止日期">
          </el-date-picker>
        </span>
      </div>
    </div>


    <div class="T-title">
      <span class="f-l font-16">查询结果</span>
      <div class="clear contentBox">
        <el-table
                v-show="invoiceRange"
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
    </div>


    <div class="contentBox height50 container2 relative" v-for="item in datatable" id="tab1">
      <h2>发票信息</h2>
      <hr>
      <label class="pad30_r">
        <span class="label_name">发票代码：</span>
        <input disabled="" class="label_txt" type="text" :value=item.code>
      </label>
      <label class="pad30_r">
        <span class="label_name">发票号码：</span>
        <input disabled="" class="label_txt" type="text" :value=item.number>
      </label>
      <label class="pad30_r">
        <span class="label_name">发票类型：</span>
        <input disabled="" class="label_txt" type="text" :value=item.tax_cate>
      </label>
      <label class="pad30_r">
        <span class="label_name">开票日期：</span>
        <input disabled="" class="label_txt" type="text" :value=item.create_date>
      </label>
      <label class="pad30_r">
        <span class="label_name">销方名称：</span>
        <input disabled="" class="label_txt" type="text" :value=item.saler_name>
      </label>
      <label class="pad30_r">
        <span class="label_name">销方税号：</span>
        <input disabled="" class="label_txt" type="text" :value=item.saler_tax_no>
      </label>
      <label class="pad30_r">
        <span class="label_name">金额：</span>
        <input disabled="" class="label_txt" type="text" :value=item.money>
      </label>
      <label class="pad30_r">
        <span class="label_name">税额：</span>
        <input disabled="" class="label_txt" type="text" :value=item.tax_money>
      </label>
      <label class="pad30_r">
        <span class="label_name">发票状态：</span>
        <input disabled="" class="label_txt" type="text" value="正常">
      </label>
      <label class="pad30_r">
        <span class="label_name">异常类别：</span>
        <input disabled="" class="label_txt" type="text" :value=item.state>
      </label>
      <h2>处理状态</h2>
      <hr>
      <label class="pad30_r">
        <span class="label_name">是否认证：</span>
        <input disabled="" class="label_txt" type="text" :value=item.checkCertification>
      </label>
      <label class="pad30_r">
        <span class="label_name" style="width: 120px;">认证方式：</span>
        <input disabled="" class="label_txt" style="width: 185px;" type="text" value="勾选认证">
      </label>
      <label class="pad30_r">
        <span class="label_name" style="width: 120px;">认证月份：</span>
        <input disabled="" class="label_txt" style="width: 185px;" type="text" :value="taxTimeNum">
      </label>
    </div>

    <div class="tips color_3" id="tipdiv" style="line-height: 20px; margin-top: 15px;">注：
      <br>1、“确认勾选”操作成功即为“勾选认证”成功。勾选认证和扫描认证是目前的两种认证方式，两种方式同样有效，您任择其一即可，建议您选择更便捷、高效的勾选认证方式。
      <br>2、当“是否认证”为“是”时，即为认证成功，可参与当期抵扣；当“是否认证”为“否”、“是否勾选”为“是”时，您还需要在平台的“确认勾选”模块对相应发票进行确认操作，完成勾选认证。
    </div>
    <div class="container" id="tab2" style="display: none;">
      <section>
        <table width="100%" class="display" id="example" style="text-align: center;" cellspacing="0">
          <thead>
          <tr>
            <th>序号</th>
            <th>发票代码</th>
            <th>发票号码</th>
            <th>开票日期</th>
            <th>销方名称</th>
            <th>金额</th>
            <th>税额</th>
            <th>发票状态</th>
          </tr>
          </thead>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'
  export default {
    name: "Select",
    mixins: [common],
    data(){
      return {
        com: {},
        taxdate: '',
        taxTimeNum: '',
        invoiceRange: 0, // 筛选条件 发票范围
        code: '', // 筛选条件  发票代码
        number: '', // 筛选条件  发票号码
        create: '', // 开票日期 时间段
        datatable: [],
      }
    },
    mounted() {
      // // 同步企业基本信息
      // this.synchronizeComInfo()
      // // 获取当前申报月份
      // this.setMonth(this.com.tax_date)
      // // 同步已确认的发票信息
      // this.setConfirmInfo()
    },
    methods:{
      // 获取已确认的发票数据
      setConfirmInfo(){
        var invoiceArry = this.$store.state.publicData.invoiceList
        var attr = []
        // 筛选条件
        var code = this.code
        var number = this.number
        var create = this.create

        if(invoiceArry != undefined){
          if(this.invoiceRange == 0){
            for(var i=0; i<invoiceArry.length; i++){
              if(invoiceArry[i].code == code || code == ''){
                if(invoiceArry[i].number == number || number == ''){
                  if(invoiceArry[i].checkCertification == '是' && invoiceArry[i].checkCertificationdate != ''){
                    attr.push(invoiceArry[i])
                  }
                }
              }
            }
          }else{
            for(var i=0; i<invoiceArry.length; i++){
              if(invoiceArry[i].code == code || code == ''){
                if(invoiceArry[i].number == number || number == ''){
                  // 比对日期时间范围
                  if(create != ''){
                    var timeStatus = this.isDateBetween(invoiceArry[i].create_date, create[0], create[1])
                  }

                  if(timeStatus || create == ''){
                    if(invoiceArry[i].checkCertification == '是' && invoiceArry[i].checkCertificationdate != ''){
                      attr.push(invoiceArry[i])
                    }
                  }
                }
              }
            }
          }
        }
        this.datatable = attr
      },
      // 获取当前申报月份
      setMonth(res) {
        var time = res[0].split('-') // 拆解完毕后是  年  月  日

        this.month = time[1]
        this.taxdate = time[0]+'年'+time[1]+'月'
        this.taxTimeNum = time[0]+'-'+time[1]
      }
    }
  }
</script>

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

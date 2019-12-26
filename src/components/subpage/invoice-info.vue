<template>
  <div class="invoice-info">
    <div class="top mb-20">
      <span class="title">
        发票代码:
        <span class="title-text">{{ invoice.code }}</span>
      </span>
      <span class="title">
        发票号码:
        <span class="title-text">{{ invoice.number }}</span>
      </span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="销方信息" name="salesParty">
        <div class="T-title">
          <span>
            <div class="row-top-blue"></div>
            <span class="row-top-text">销方信息：</span>
          </span>
        </div>
        <div>
          <span class="title">
            纳税人识别号:
            <span class="title-text">{{ invoice.saler_tax_no }}</span>
          </span>
          <span class="title">
            纳税人名称:
            <span class="title-text">{{ invoice.saler_name }}</span>
          </span>
          <span class="title">
            登记状态:
            <span class="title-text">正常</span>
          </span>
          <span class="title">
            是否走逃失联企业:
            <span class="title-text">否</span>
          </span>
        </div>
        <div class="T-title">
          <span>
            <div class="row-top-blue"></div>
            <span class="row-top-text">违法违章信息：</span>
          </span>
        </div>
        <el-table
                size="mini"
                :data="violationList"
                border
                style="width: 100%;">
          <el-table-column label="序号" width=""/>
          <el-table-column label="处罚时间" width=""/>
          <el-table-column label="税收违法类型" width=""/>
          <el-table-column label="税收违法手段" width=""/>
          <el-table-column label="录入日期" width=""/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="发票状态信息" name="invoice">
        <div class="T-title">
          <span>
            <div class="row-top-blue"></div>
            <span class="row-top-text">流转状态：</span>
          </span>
        </div>
        <div style="width: 100%; height: 180px;">
          <div class="circulation-type">
            <p>领用信息： 正常领用</p>
            <p>领用时间： - </p>
            <p>开局状态： 正常 </p>
          </div>
          <div class="circulation-type">
            <p>开具时间： {{conversionTime(invoice.create_time)}}</p>
            <p>发票用途： - </p>
            <p>所属期： - </p>
          </div>
          <div class="circulation-type">
            <p>购方申报状态： -</p>
            <p>购方票表比对状态： - </p>
            <p>购方申报状态： - </p>
          </div>
          <div class="circulation-type">
            <p>购方缴税状态： -</p>
            <p>购方缴税业务时间： - </p>
          </div>
          <div class="circulation-type">
            <p>销方申报状态： -</p>
            <p>销方票表比对状态： - </p>
            <p>销方申报状态： - </p>
          </div>
          <div class="circulation-type">
            <p>销方缴税状态： -</p>
            <p>销方缴税业务时间： - </p>
          </div>
        </div>
        <div class="T-title" style="width: 100%;">
          <span>
            <div class="row-top-blue"></div>
            <span class="row-top-text">管理状态：</span>
          </span>
        </div>
        <div class="circulation-type">
          <p>是否异常： 否</p>
          <p>异常时间： - </p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import common from '../../mixins/common'

  export default {
    mixins: [common],
    name: "invoice-info",
    props: {
      // 选中发票详情
      invoice: {
        type: Object,
        required: true,
        defaults: {}
      }
    },
    data() {
      return {
        activeName: 'salesParty',
        com: '', // 企业基本信息
        violationList:[]
      }
    },
    mounted() {
      // 同步企业基本信息
      this.synchronizeComInfo()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .circulation-type p{
    height: 30px;
    line-height: 30px;
    width: 33.33%;
    float: left;
  }
  .title .title-text {
    color: #000000;
    font-weight: bold;
  }

  .title {
    margin-right: 20px;
    color: #8E8B9A;
  }

  .invoice-info {
    width: 100%;
  }
  .mb-20{
    margin-bottom: 20px;
  }
</style>

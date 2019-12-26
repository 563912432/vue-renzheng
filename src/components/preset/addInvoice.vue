<template>
  <div class="invoice">
    <el-form :model="addInvoiceForm" :rules="addInvoiceRules" ref="addInvoiceForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="发票代码" prop="code">
        <el-input v-model="addInvoiceForm.code" placeholder="例：3700114140"></el-input>
      </el-form-item>
      <el-form-item label="发票类型" prop="tax_cate">
        <el-select v-model="addInvoiceForm.tax_cate" placeholder="请选择" style="width: 100%;">
          <el-option
                  v-for="item in taxCateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票号码" prop="number">
        <el-input v-model="addInvoiceForm.number" placeholder="例：56898754"></el-input>
      </el-form-item>
      <el-form-item label="开票日期" prop="create_date">
        <el-date-picker
                style="width: 100%;"
                v-model="addInvoiceForm.create_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="销方名称" prop="saler_name">
        <el-input v-model="addInvoiceForm.saler_name" placeholder="例：济南百全管材制造有限公司"></el-input>
      </el-form-item>
      <el-form-item label="销方税号" prop="saler_tax_no">
        <el-input v-model="addInvoiceForm.saler_tax_no" placeholder="例：91380913246514232T"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="money">
        <el-input v-model="addInvoiceForm.money" placeholder="例：10000.00"></el-input>
      </el-form-item>
      <el-form-item label="税额" prop="tax_money">
        <el-input v-model="addInvoiceForm.tax_money" placeholder="例：10000.00"></el-input>
      </el-form-item>
      <el-form-item label="发票状态" prop="state">
        <el-select v-model="addInvoiceForm.state" placeholder="请选择" style="width: 100%;">
          <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>



      <div class="text-center">
        <el-button type="primary" @click="saveInvoiceForm('addInvoiceForm')">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AddInvoice",
    data(){
      return {
        addInvoiceForm: {
          code: '', // 发票代码
          tax_cate: '', // 发票类型
          number: '', // 发票号码
          create_date: '', // 开票日期
          saler_name: '', // 销方名称
          saler_tax_no: '', // 销方税号
          money: '', // 金额
          tax_money: '', // 税额
          state: '', // 发票状态
        },
        addInvoiceRules: {
          code: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          tax_cate: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          number: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          create_date: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          saler_name: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          saler_tax_no: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          money: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          tax_money: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
          state: [{ required: true, message: '必填项目能为空', trigger: 'blur' },],
        },
        // 发票类型 select
        taxCateOptions: [
          {
            value: '增值税专用发票',
            label: '增值税专用发票'
          },
          {
            value: '机动车销售统一发票',
            label: '机动车销售统一发票'
          }
        ],
        // 发票状态 select
        stateOptions: [
          {
            value: '1',
            label: '正常'
          },
          {
            value: '2',
            label: '作废'
          },
          {
            value: '3',
            label: '异常'
          },
          {
            value: '4',
            label: '失控'
          },
          {
            value: '5',
            label: '红冲'
          },
        ],
        editCode: null, // 新增为null 修改为数组下标
      }
    },
    watch: {
      editCode: function (val) {
        const trade_id = this.$store.state.preset.trade_id
        if (val == null) {
          this.addInvoiceForm.code = '', // 发票代码
              this.addInvoiceForm.tax_cate = '', // 发票类型
              this.addInvoiceForm.number = '', // 发票号码
              this.addInvoiceForm.create_date = '', // 开票日期
              this.addInvoiceForm.saler_name = '', // 销方名称
              this.addInvoiceForm.saler_tax_no = '', // 销方税号
              this.addInvoiceForm.money = '', // 金额
              this.addInvoiceForm.tax_money = '', // 税额
              this.addInvoiceForm.state = '' // 发票状态
        }
      }
    },
    methods:{
      saveInvoiceForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var invoice = {...this.addInvoiceForm}
            invoice['cid'] = this.$store.state.preset.trade_id

            axios.post(host + 'invoice', invoice).then(res => {
              if(res.data.error_code == 0){
                this.$message.success('保存成功')
                this.handleReset(formName)
                layer.close(layer.index); //再执行关闭
              }else{
                this.$message.error('数据保存失败')
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false;
          }
        });
      },
      // 初始化表单数据
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>

<style>
  .el-popper{
    z-index: 999999999 !important;
  }
</style>
<style scoped>
  .invoice{
    padding: 15px;
  }
</style>

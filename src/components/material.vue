<template>
  <div class="material">
    <div class="mb-5 company-top">
      <div class="float-left title-tag">认证管理</div>
      <el-button type="success" class="float-right mr-10 success" size="mini" @click="toPreset('add')">新增企业</el-button>
    </div>

    <div v-if="companyName != ''">
      <!--企业新增+业务新增-->
      <div class="company-info">
        <div class="row justify-content-between">
          <div class="float-left company-title">
            <strong class="company-name">企业名称：{{companyName}}</strong>
          </div>
          <div class="float-right text-center company-operating">
            <el-button type="text" class="mr-10" @click="addBusiness()">新增业务</el-button>
            <el-button type="text" class="mr-10" @click="toPreset('addInvoice')">新增发票</el-button>
            <el-button type="text" v-if="practicalAnswer == 1" class="mr-10" @click="toPracticalAnswer">答案修改</el-button>
            <el-button type="text" v-else class="mr-10" @click="toPracticalAnswer">答案绑定</el-button>
            <el-button type="text" class="mr-10" @click="toPreset('edit')">编辑</el-button>
            <el-button type="text" class="mr-10" @click="delCompany('company')">删除</el-button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <el-table :data="businessData" border style="width: 100%">
          <el-table-column prop="content" label="业务内容"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editResponsive(scope.$index, businessData)">编辑</el-button>
              <el-button type="text" size="small" @click="delResponsive(scope.$index, businessData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页部分-->
      <div class="mt-15 text-center">
        <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size='companyList.pageSize'
                :current-page="page"
                :total="companyList.total">
        </el-pagination>
      </div>
    </div>
    <div v-else class="airInfo">暂无数据</div>
    <!--企业新增模拟弹窗内容-->
    <div v-show="showCompanyadd">
      <Popups ref="popups">
        <div slot="title">企业数据设置</div>
        <div slot="close">
          <i class="el-icon-close" @click="showCompanyaddoff"></i>
        </div>
        <div slot="new-content" class="company-table">
          <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
            <el-tab-pane v-if="showTabsType != 1" label="企业基本信息设置" name="companyInfo">
              <!--企业基本信息设置-->
              <el-form :model="companyForm" label-position="right" :rules="companyRules" ref="companyForm"
                       label-width="100px" class="demo-ruleForm">
                <el-form-item label="企业名称" prop="company" style="width: 450px">
                  <el-input v-model="companyForm.company" placeholder="山东问云机械有限公司"></el-input>
                </el-form-item>
                <el-form-item label="企业税号" prop="taxnumber" style="width: 450px">
                  <el-input v-model="companyForm.taxnumber" placeholder="91370305755666003U"></el-input>
                </el-form-item>
                <el-form-item label="证书密码" prop="certifypwd" style="width: 450px">
                  <el-input v-model="companyForm.certifypwd" placeholder="000000"></el-input>
                </el-form-item>
                <el-form-item label="申报周期" prop="sub_date" style="width: 450px">
                  <el-input v-model="companyForm.sub_date" placeholder="月"></el-input>
                </el-form-item>
                <el-form-item label="信用等级" prop="level">
                  <el-select v-model="companyForm.level" placeholder="请选择" style="width: 340px">
                    <el-option
                            v-for="item in companyOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发票勾选时间" prop="check_date">
                  <el-date-picker
                          style="width: 340px"
                          v-model="companyForm.check_date"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="发票确认时间" prop="confirm_date">
                  <el-date-picker
                          style="width: 340px"
                          v-model="companyForm.confirm_date"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="税款所属期" prop="tax_date">
                  <el-date-picker
                          style="width: 340px"
                          v-model="companyForm.tax_date"
                          type="daterange"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          range-separator="-"
                          start-placeholder="起始日期"
                          end-placeholder="截止日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="可勾选发票" prop="check_start">
                  <el-date-picker
                          style="width: 340px"
                          v-model="companyForm.check_start"
                          type="daterange"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          range-separator="-"
                          start-placeholder="起始日期"
                          end-placeholder="截止日期">
                  </el-date-picker>
                </el-form-item>
                <div class="text-center">
                  <el-button type="success" @click="saveCompanyInfo('companyForm')">保存</el-button>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="showTabsType == 1" label="发票信息管理" name="invoiceInfo">
              <!--发票信息管理-->
              <div>
                <el-button class="f-r" style="margin-bottom: 10px;" type="success" @click="addInvoice">新增发票</el-button>
              </div>
              <el-table
                      height="445px"
                      :data="invoiceData"
                      border
                      style="width: 100%">
                <el-table-column prop="code" label="发票代码" width="100"></el-table-column>
                <el-table-column prop="tax_cate" label="发票类型" width="120"></el-table-column>
                <el-table-column prop="number" label="发票号码"></el-table-column>
                <el-table-column prop="create_time" label="开票日期" width="100"></el-table-column>
                <el-table-column prop="saler_name" label="销方名称" width="200"></el-table-column>
                <el-table-column prop="saler_tax_no" label="销方税号" width="200"></el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column prop="tax_money" label="税额"></el-table-column>
                <el-table-column prop="state" label="发票状态">
                  <template slot-scope="scope">{{ scope.row.state == 1? '正常': scope.row.state == 2? '作废':scope.row.state
                    == 3? '异常':scope.row.state == 4? '失控':scope.row.state == 5? '红冲': '错误信息'}}
                  </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                  <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="invoiceHandleEdit(scope.$index, invoiceData)"
                            type="text"
                            size="small">
                      编辑
                    </el-button>
                    <el-button
                            @click.native.prevent="invoiceHandleDelete(scope.$index, invoiceData)"
                            type="text"
                            size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </Popups>
    </div>
    <!--增加发票弹窗-->
    <div v-show="showInvoiceAdd">
      <div class="invoiceAdd">
        <InvoiceAdd ref="invoiceAdd"></InvoiceAdd>
      </div>
    </div>
    <!--业务新增弹窗-->
    <div v-show="showPreseteAdd">
      <div class="preseteAdd">
        <Preseteadd ref="preseteadd"></Preseteadd>
      </div>
    </div>
  </div>
</template>

<script>
  import Popups from './pop-ups-model'
  import InvoiceAdd from './preset/addInvoice' // 新增发票表单
  import Preseteadd from './preset/presetadd' // 业务新增表单
  import axios from 'axios'

  export default {
    name: "Material",
    components: {
      Popups,
      InvoiceAdd,
      Preseteadd
    },
    mounted() {
      this.getCompanyList()
    },
    data() {
      return {
        companyName: '',
        showInvoiceAdd: 0,
        showTabsType: 0,
        showPreseteAdd: 0,
        practicalAnswer: 0, // 答案发布状态 0：无答案  1：有答案
        // 业务数据
        businessData: [],
        showCompanyadd: 0, // 企业新增修改弹窗组件依据
        tabsName: 'companyInfo', // 默认tabs开启页
        // 企业基础信息及验证
        companyForm: {
          company: '', // 企业名称
          taxnumber: '', // 企业税号
          certifypwd: '', // 证书密码
          level: '', // 信用等级
          sub_date: '', // 申报周期
          tax_date: '', // 税款所属期
          check_start: '', // 可勾选发票的开票起始日期
          check_date: '', // 发票勾选时间
          confirm_date: '', // 发票确认时间
        },
        companyRules: {
          company: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          taxnumber: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          certifypwd: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          level: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          sub_date: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          tax_date: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          check_start: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          check_date: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
          confirm_date: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
        },
        // 企业基础信息->信用等级下拉
        companyOptions: [
          {
            value: '1',
            label: 'A'
          },
          {
            value: '2',
            label: 'B'
          },
          {
            value: '3',
            label: 'C'
          },
          {
            value: '4',
            label: 'M'
          }
        ],
        // 预设发票信息
        invoiceData: [],
        // 企业列表分页数据
        companyList: {
          total: 0, // 总条数
          pageSize: 1 //每页内容条数
        },
        // 当前页码
        page: 1,
      }
    },
    methods: {
      // 获取企业列表信息
      getCompanyList() {
        this.$store.commit('delState') // 初始化数据结构
        this.companyName = ''
        axios.post(host + 'company/list?page=' + this.page + '&page_size=1').then(res => {
          if (res.data.error_code == 0) {
            if (res.data.data.data[0]) {
              var arr = res.data.data.data[0]
              this.$store.commit('saveCompany', arr)

              // 判断企业信息是否存在
              this.companyList.total = res.data.data.total // 分页总条数
              this.$store.commit('saveTradeid', arr.id) // 储存当前企业的id
              this.companyName = arr.company // 获取企业名称
              // 同步业务信息
              this.tableDataInfo()
              // 同步发票
              this.invoiceDataInfo()
              // 获取答案信息
              axios.get(host + 'answer/' + arr.id).then(attr => {
                if (attr.data.error_code == 0) {
                  if (attr.data.data[0] != null) {
                    if (Object.keys(attr.data.data[0]).length != 0) {
                      this.practicalAnswer = 1
                    } else {
                      this.practicalAnswer = 0
                    }
                  } else {
                    this.practicalAnswer = 0
                  }
                }
              })
            }
          } else {
            this.$message.error('企业基本信息获取失败，请刷新重试')
          }
        })
      },
      // 企业新增弹窗显示与隐藏
      toPreset(res) {
        if (res == 'add') { // 企业新增
          this.showCompanyadd = 1
          this.showTabsType = 0
          this.handleReset('companyForm') // 初始化表单信息
          var arr = {}
          arr['name'] = 'companyInfo'
          this.handleClick(arr) // 切换tabs页面
          this.tabsName = 'companyInfo'


        } else if (res == 'edit') { // 企业信息修改
          var trade_id = this.$store.state.preset.trade_id
          if (trade_id) {
            this.showCompanyadd = 1
            this.showTabsType = 0
            var arr = {}
            arr['name'] = 'companyInfo'
            this.handleClick(arr) // 切换tabs页面
            this.tabsName = 'companyInfo'
            var comInfo = {...this.$store.state.preset.companyInfo.company[trade_id]}
            this.companyForm = comInfo
          } else {
            this.$message.error('请先添加企业')
          }
        } else if (res == 'addInvoice') {
          var trade_id = this.$store.state.preset.trade_id
          if (trade_id) {
            this.showCompanyadd = 1
            this.showTabsType = 1
            var arr = {}
            arr['name'] = 'invoiceInfo'
            this.handleClick(arr) // 切换tabs页面
            this.tabsName = 'invoiceInfo'
          } else {
            this.$message.error('请先添加企业')
          }
        }
      },
      // 企业数据保存
      saveCompanyInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var attr = {...this.companyForm}
            axios.post(host + 'company/add', attr).then(res => {
              if (res.data.error_code == 0) {
                // 总线中存入企业基本信息
                this.$store.commit('saveCompany', attr)
                this.handleReset('companyForm')
                this.showCompanyadd = 0
                this.getCompanyList()
                this.$message.success('数据保存成功')
              } else {
                this.$message.error('企业信息保存失败')
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false;
          }
        });
      },
      // 企业弹窗关闭
      showCompanyaddoff() {
        this.showCompanyadd = 0
      },
      // 企业删除
      delCompany(res) {
        var trade_id = this.$store.state.preset.trade_id
        this.$confirm('此操作将永久删除该企业下全部信息, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(host + 'company/del', {id: trade_id}).then(res => {
            if (res.data.error_code == 0) {
              this.getCompanyList()
              this.$message.success('删除成功')
            } else {
              this.$message.error('企业信息删除失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      // 业务新增
      addBusiness() {
        const trade_id = this.$store.state.preset.trade_id;
        if (trade_id) {
          this.showPreseteAdd = 1
          layui.use('layer', () => {
            var layer = layui.layer;
            setTimeout(() => {
              var index = layer.open({
                type: 1,
                title: '业务数据设置',
                shadeClose: false,
                shade: false,
                area: ['460px', '480px'],
                content: J('.preseteAdd'),
                end: () => {
                  this.showPreseteAdd = 0
                  // 同步业务信息
                  this.tableDataInfo();
                },
                success: () => {
                  this.$refs.preseteadd.presetCode = null;    // 这句很重要
                }
              });
            }, 5)
          });
        } else {
          this.$message.error('请先新增企业！')
        }
      },
      // 同步业务信息
      tableDataInfo() {
        const trade_id = this.$store.state.preset.trade_id
        // 请求接口获取业务信息
        // this.businessData = this.$store.state.preset.companyInfo.business[trade_id]

        axios.get(host + 'business/' + trade_id).then(res => {
          if (res.data.error_code) {
            this.$Message.error(res.data.msg)
          } else {
            // 初始化掉总线业务数据
            this.$store.commit('delState', {name: 'business'})
            for (var i = 0; i < (res.data.data).length; i++) {
              this.$store.commit('saveBusiness', {name: trade_id, data: res.data.data[i]})
            }
            this.businessData = res.data.data
          }
        })
      },
      // 业务编辑
      editResponsive(code, row) {
        this.showPreseteAdd = 1
        layui.use('layer', () => {
          var layer = layui.layer;
          setTimeout(() => {
            var index = layer.open({
              type: 1,
              title: '业务数据设置',
              shadeClose: false,
              shade: false,
              area: ['460px', '480px'],
              content: J('.preseteAdd'),
              end: () => {
                this.showPreseteAdd = 0
                // 同步业务信息
                this.tableDataInfo();
              },
              success: () => {
                var arr = {...row[code]}
                this.$refs.preseteadd.preset = arr;    // 这句很重要
                this.$refs.preseteadd.presetCode = code;    // 这句很重要
              }
            });
          }, 5)
        });
      },
      // 业务删除
      delResponsive(index, row) {
        axios.delete(host + 'business/' + row[index].id).then(res => {
          if (res.data.error_code == 0) {
            this.$message.success('删除成功')
            // 同步业务信息
            this.tableDataInfo();
          } else {
            this.$message.error('删除失败')
          }
        })
      },
      // 答案绑定
      toPracticalAnswer() {
        var trade_id = this.$store.state.preset.trade_id;
        if (trade_id) {
          // 判断业务是否发布
          // console.log('新开窗口并传企业ID进行数据拉取')
          // 传递企业id 操作者身份区分 /teacher => 发布答案  / => 学员访问
          window.open('/ren_zheng/#/' + trade_id, "_blank");
        } else {
          this.$message.error('请先新增企业！')
        }
      },
      // 分页控件
      handleCurrentChange(val) {
        console.log(val)
        this.page = val
        this.getCompanyList()
      },
      // tabs页面切换
      handleClick(tab) {
        if (tab.name === 'invoiceInfo') { // 发票信息管理
          this.$refs.popups.modelWidth.width = '900px';
        } else if (tab.name === 'companyInfo') { // 企业基本信息管理
          this.$refs.popups.modelWidth.width = '490px';
        }
      },
      // 预设发票信息操作
      // 发票新增
      addInvoice() {
        layui.use('layer', () => {
          var layer = layui.layer;
          this.showInvoiceAdd = 1; // 显示发票内容
          setTimeout(() => {
            var index = layer.open({
              type: 1,
              title: '新增发票',
              shadeClose: false,
              shade: false,
              area: ['490px', '555px'],
              content: J('.invoiceAdd'),
              end: () => {
                this.showInvoiceAdd = false
                this.invoiceDataInfo()
              },
              success: () => {
                this.$refs.invoiceAdd.editCode = null;    // 这句很重要
              }
            });
          }, 1)
        });
      },
      // 同步发票列表
      invoiceDataInfo() {
        const trade_id = this.$store.state.preset.trade_id
        // 请求接口获取业务信息
        axios.get(host + 'invoice/' + trade_id).then(res => {
          if (res.data.error_code == 0) {
            this.invoiceData = res.data.data
          } else {
            this.$message.error('发票信息获取失败')
          }
        })
      },
      // 发票编辑
      invoiceHandleEdit(index, row) {
        layui.use('layer', () => {
          var layer = layui.layer;
          this.showInvoiceAdd = 1; // 显示发票内容
          setTimeout(() => {
            layer.open({
              type: 1,
              title: '新增发票',
              shadeClose: false,
              shade: false,
              area: ['490px', '555px'],
              content: J('.invoiceAdd'),
              end: () => {
                this.showInvoiceAdd = false
                this.invoiceDataInfo()
              },
              success: () => {
                var arr = {...row[index]}
                this.$refs.invoiceAdd.addInvoiceForm = arr;    // 这句很重要
                this.$refs.invoiceAdd.editCode = index;    // 这句很重要
              }
            });
          }, 1)
        });
      },
      // 发票删除
      invoiceHandleDelete(index, row) {
        axios.delete(host + 'invoice/' + row[index].id).then(res => {
          if (res.data.error_code == 0) {
            this.$message.success('删除成功')
            this.invoiceDataInfo()
          } else {
            this.$message.error('删除失败')
          }
        })
      },
      // 初始化表单数据
      handleReset(name) {
        this.$nextTick(() => {
          this.$refs[name].resetFields()
        })
      },
    }
  }
</script>

<style>
  .material .el-table__header th {
    background-color: #f8f8f9 !important;
  }

  .material .table-responsive .el-table__header th:nth-child(2) .cell {
    text-align: center;
  }

  .material .company-table .el-table__header th .cell {
    text-align: center;
  }

  .material .el-tab-pane label {
    width: 110px !important;
  }

  .material .el-form-item__content {
    margin-left: 110px !important;
  }

  .material .el-tabs__content {
    /*height: 375px;*/
    overflow: auto;
  }
</style>
<style scoped>
  .material {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
  }

  .material .airInfo {
    margin-top: 50px;
    text-align: center;
    font-size: 14px;
    color: #909399;
  }

  .material .title-tag {
    font-size: 14px;
    font-weight: 600;
  }

  .material .success {
    background-color: #93C343;
    border-color: #93C343;
  }

  .material .success:hover {
    background-color: #B4D57C;
    border-color: #B4D57C;
  }

  .material .successhalf:hover {
    background-color: #F4F9EC;
    border-color: #C3DE97;
    color: #A7CE66;
  }

  .company-info {
    height: 42px;
    line-height: 30px;
    border: 1px solid #dee2e6;
    border-bottom: 0px;
  }

  .company-info .justify-content-between {
    padding-left: 10px;
    height: 100%;
  }

  .company-info .company-title {
    line-height: 40px;
  }

  .company-info .company-operating {
    width: 320px;
    line-height: 40px;
    float: right;
  }

  .company-name {
    font-size: 13px;
    color: #515a6e;
  }

  .company-top {
    height: 35px;
  }
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 预设数据
    preset: {
      companyInfo: { //企业预设数据信息
        company: {}, // 企业基础信息
        preset: {}, // 企业表内预设数据
        business: {}, // 企业业务信息
      },
      operatorStatus: 0, // 操作者状态 0:学员操作 1:发布答案
      trade_id: '', //当前所操作企业的标识
      platPwdType: 0, // 默认平台密码为关闭状态
    },
    publicData: {}, // 公共操作数据
    // role: 0, // 1为teacher 模式  0 为学生模式
    // mode: null, //parse  account
    // params: null
  },
  //持久化插件使用
  plugins: [createPersistedState({
    key: 'renzheng',
    storage: window.sessionStorage,
  })],
  mutations: {
    // 总线数据同步
    clonePreset(state, data){
      var res = JSON.parse(data)
      state.preset.companyInfo.company[res.company.id] = res.company
      state.preset.trade_id = res.company.id
      // 每张发票内加入有效税额项
      for(var i=0; i<res.invoice.length; i++){
        if(!res.invoice[i]['declare_tax_money']) {
          res.invoice[i]['declare_tax_money'] =  res.invoice[i].tax_money
        }
      }
      // 答案是否存在
      if(res.answer != null) {
        state.publicData = res.answer
      } else {
        state.publicData['invoiceList'] = res.invoice
      }
      state.preset.companyInfo.preset[res.company.id] = res.invoice

    },
    // 还原发票操作信息
    revertInvoice(state) {
      let invoiceData = state.publicData.invoiceList
      if(invoiceData.length !== 0) {
        invoiceData.forEach(res => {
          res.check_state = '0'
          res.check_time = null
          res.certify_state = '0'
        })
      }
      delete state.publicData.uploadInvoice
    },
    // 同步操作数据
    clonePublicData(state, data){
      state.publicData = data
    },
    // 新增公共数据结构
    addPublicDataItem(state, data){
      state.publicData['invoiceList'][data.index][data.name] = data.data
    },
    // 同步可操作发票数据
    cloneInvoiceList(state , data){
      state.publicData['invoiceList'] = data
    },
    // 插入所需要的操作
    addInvoiceItem(state, data){
      state.publicData[data.name] = data.data
    },
    // 修改发票勾选状态
    editInvoiceCheckStatus(state, data){
      var invoiceList = state.publicData.invoiceList // 可操作发票数组
      var check = data
      this.Date = new Date()
      var dataTime = this.Date.getFullYear()+'-'+(this.Date.getMonth() + 1) +'-'+ this.Date.getDate() // 当前日期时间

      for(var i=0; i<invoiceList.length; i++){
        if(check.indexOf(invoiceList[i].id) !== -1) {
          invoiceList[i].check_state = '1'
          invoiceList[i].check_time = dataTime // 勾选时间
        }
      }
    },
    // 修改不抵扣发票勾选状态
    editDeductionInvoiceCheckStatus(state, data) {
      var invoiceList = state.publicData.invoiceList // 可操作发票数组
      var check = data
      this.Date = new Date()
      var dataTime = this.Date.getFullYear()+'-'+(this.Date.getMonth() + 1) +'-'+ this.Date.getDate() // 当前日期时间

      for(var i=0; i<invoiceList.length; i++){
        if(check.indexOf(invoiceList[i].id) !== -1) {
          invoiceList[i].check_state = '1'
          invoiceList[i].check_time = dataTime // 勾选时间
          invoiceList[i].deduction = 1 // 不抵扣勾选的发票标记
        }
      }
    },
    // 保存批量上传的发票信息
    addUploadInvoice(state, data) {
      state.publicData.uploadInvoice = data
    },
    // 删除批量上传信息
    delUploadInvoice(state) {
      delete state.publicData.uploadInvoice
    },
    // 发票取消勾选
    delInvoiceCheckStatus(state, data) {
      var invoiceList = state.publicData.invoiceList // 可操作发票数组
      var check = data
      for(var i=0; i<invoiceList.length; i++){
        if(check.indexOf(invoiceList[i].id) !== -1) {
          invoiceList[i].check_state = '0'
          invoiceList[i].check_time = ''
        }
      }
    },
    // 不抵扣发票取消勾选
    delDeductionInvoiceCheckStatus(state, data) {
      var invoiceList = state.publicData.invoiceList // 可操作发票数组
      var check = data
      for(var i=0; i<invoiceList.length; i++){
        if(check.indexOf(invoiceList[i].id) !== -1) {
          invoiceList[i].check_state = '0'
          invoiceList[i].check_time = ''
          delete invoiceList[i].deduction
        }
      }
    },
    // 企业基本信息保存
    saveCompany(state, data) {
      state.preset.companyInfo.company[data.id] = data
    },
    // 所操作的企业标识
    saveTradeid(state, data) {
      state.preset.trade_id = data
    },
    // 预设发票保存
    saveInvoiceList(state, data) {
      var trade_id = state.preset.trade_id
      if (state.preset.companyInfo.preset[trade_id] == undefined) {
        state.preset.companyInfo.preset[trade_id] = new Array()
      }
      if (data.code || data.code == 0) {
        Vue.set(state.preset.companyInfo.preset[trade_id], data.code, data.data)
      } else {
        state.preset.companyInfo.preset[trade_id].push(data.data)
      }
    },
    // 删除发票信息
    delInvoiceListItem(state, code) {
      var trade_id = state.preset.trade_id
      state.preset.companyInfo.preset[trade_id].splice(code, 1)
    },
    // 初始化store的内容
    delState(state, data) {
      if (data) {
        state.preset.companyInfo.preset = {}
      } else {
        state.preset.trade_id = ''
        state.preset.companyInfo.company = {}
        state.preset.companyInfo.preset = {}
        state.preset.companyInfo.business = {}
        state.preset.operatorStatus = 0
        // state.preset.businessCode = 0
        state.publicData = {}
      }
    },
    // 操作数据保存
    savePublicData(state, data){
      state.publicData[data.name] = data.data
    },
    // 删除勾选保存的数据
    editInvoiceItem(state, data){
      Vue.set(state.publicData.invoiceList, data.key, data.data)
    },
    // 初始化公共数据结构
    addHistoryInvoiceInfo(state, data){
      state.publicData['historyInvoiceInfo'] = data
    },
    // 确认签名后，认证发票
    declareInvoice(state) {
      if(state.publicData.invoiceList && state.publicData.invoiceList.length !== 0) {
        let trade_id = state.preset.trade_id
        let certify_time = state.preset.companyInfo.company[trade_id]
        let invoiceData = state.publicData.invoiceList
        invoiceData.forEach(res => {
          if(res.check_state == 1) {
            res.certify_state = '1'
          }
        })
      }
    }
  },
})

export default store

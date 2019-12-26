export default {
  methods: {
    // 保存标准答案至数据库
    saveBusiness(){
      const trade_id = this.$store.state.preset.trade_id
      if(this.$store.state.publicData){
        const data = this.$store.state.publicData
        const answer = JSON.stringify(data)
        let formdata = new FormData()
        formdata.append('data', answer)
        formdata.append('company_id', this.$store.state.preset.companyInfo.company[trade_id].id)
        // 当前企业下的答案
        this.post('/Api/RenZheng/saveAnswer', formdata, res => {
          if(res.status) {
            this.$message.success('保存成功')
          } else {
            this.$message.error(res.info)
          }
        })
      }else{
        this.$message.error('当前企业下无操作！')
      }
    },
    post (url, data, fn) {
      let obj = new XMLHttpRequest()
      obj.open('POST', url, true)
      obj.onreadystatechange = function () {
        if (+obj.readyState === 4 && (+obj.status === 200 || +obj.status === 304 || obj.status === 0)) {
          console.log(obj)
          fn.call(this, JSON.parse(obj.responseText))
        }
      }
      obj.send(data)
    },
    // 同步企业基本信息
    synchronizeComInfo(){
      var trade_id = this.$store.state.preset.trade_id
      this.com = this.$store.state.preset.companyInfo.company[trade_id]
    },
    /**
     * 判断日期是否在区间内，在区间内返回true，否返回false
     * @param dateString 日期字符串
     * @param startDateString 区间开始日期字符串
     * @param endDateString 区间结束日期字符串
     * @returns {Number}
     */
    isDateBetween(dateString, startDateString, endDateString) {
      if (dateString == '') {
        console.log("dateString不能为空");
        return;
      }
      if (startDateString == '') {
        console.log("startDateString不能为空");
        return;
      }
      if (endDateString == '') {
        console.log("endDateString不能为空");
        return;
      }
      var flag = false;
      var startFlag = false
      var endFlag = false

      if(Date.parse(dateString) >= Date.parse(startDateString)){
        startFlag = true
      }
      if(Date.parse(dateString) <= Date.parse(endDateString)){
        endFlag = true
      }
      if (startFlag && endFlag) {
        flag = true;
      }
      return flag;
    },
    // 增值税发票信息筛选
    // attr 解析的数组
    // type 返回的数据分类 1:增值税信息 2:机动车销售统一发票信息
    setInvoiceInfo(attr){
      var res = {
        zyfpNum: 0, // 增值税专用发票数量
        zyfpMoney: 0, // 增值税专用发票总金额
        zyfpTax_money: 0, // 增值税专用发票总税额

        jdcNum: 0, // 机动车发票数量
        jdcMoney: 0, // 机动车发票总金额
        jdcTax_money: 0, // 机动车发票总税额

        numTotal: 0, // 数量合计
        moneyTotal: 0, // 金额合计
        tax_moneyTotal: 0, // 税额合计
      }
      for(var i=0; i<attr.length; i++){
        if(attr[i].tax_cate == '增值税专用发票'){
          res.zyfpNum++ // 数量累计增加
          res.zyfpMoney = res.zyfpMoney*1 + attr[i].money*1 // 金额累计增加
          res.zyfpTax_money = res.zyfpTax_money*1 + attr[i].tax_money*1 // 金额累计增加
        }else if(attr[i].tax_cate == '机动车销售统一发票'){
          res.jdcNum++ // 数量累计增加
          res.jdcMoney = res.jdcMoney*1 + attr[i].money*1 // 金额累计增加
          res.jdcTax_money = res.jdcTax_money*1 + attr[i].tax_money*1 // 金额累计增加
        }
      }

      res.numTotal = res.zyfpNum*1 + res.jdcNum*1
      res.moneyTotal = res.zyfpMoney*1 + res.jdcMoney*1
      res.tax_moneyTotal = res.zyfpTax_money*1 + res.jdcTax_money*1

      return res
    },
    // 时间戳转年月日
    conversionTime(time) {
      let date = new Date(parseInt(time) * 1000);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      // let h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // let minute = date.getMinutes();
      // let second = date.getSeconds();
      // minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second;
      // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second)
      // let dates = y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
      let dates = y + '-' + m + '-' + d;
      return dates;
    },
    // 四舍五入自动补零
    changeTwoDecimal_f(x) {
      var f_x = parseFloat(x);
      if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
      }
      var f_x = Math.round(x * 100) / 100;
      var s_x = f_x.toString();
      var pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
      }
      while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
      }
      return s_x;
    }
  }
}

<template>
  <div class="content">
    <!--面包屑-->
    <div class="breadCrumb">
      <div class="width-1200">
        <div class="iconfont rz-iconditu float-left font-24"></div>
        <a class="float-left font-16 ml-25">当前位置：首页-<span class="cl-888">档案信息维护</span></a>
      </div>
    </div>

    <div id="infoarea">
      <!--顶部切换栏-->
      <div class="tbbox">
        <div class="standard">
          <input :class="[status === '0'? 'info-on': '']" @click="editStatus('0')" type="button"
                 value="基本信息维护"></input>
          <input :class="[status === '1'? 'info-on': '']" class="ml-20" @click="editStatus('1')" type="button"
                 value="平台密码维护"></input>
        </div>
      </div>
      <div class="conbox2 standard">
        <!--基本信息维护-->
        <div v-if="status == 0" class="con_tb">
          <div class="T-title">
            <span class="pad15_r font-16">
              <div class="row-top-blue"></div>
              <span class="row-top-text">企业基本信息</span>
            </span>
          </div>
          <!--企业基本信息-->
          <table width="90%" class="height40" style="margin: 0px auto;">
            <tbody>
              <tr>
                <td width="20%" class="text-right">
                  <strong>企业名称：</strong>
                </td>
                <td width="42%" id="qymc">{{com.company}}</td>
                <td width="20%" class="text-right">
                  <strong>企业税号：</strong>
                </td>
                <td width="42%" id="qysh">{{com.tax_no}}</td>
              </tr>
              <tr>
                <td class="text-right">
                  <strong>旧税号：</strong>
                </td>
                <td id="oldsh">{{com.old_no}}</td>
                <td class="text-right">
                  <strong>信用等级：</strong>
                </td>
                <td id="credit">{{com.level}}</td>
              </tr>
              <tr>
                <td class="text-right">
                  <strong>申报周期(增值税)：</strong>
                </td>
                <td id="sbzq">{{com.sub_date}}</td>
                <td class="text-right">
                  <strong>纳税人性质：</strong>
                </td>
                <td>增值税一般纳税人</td>
              </tr>
              <tr>
                <td class="text-right">
                  <strong>出口退税企业类型：</strong>
                </td>
                <td>-</td>
                <td class="text-right">
                  <strong>成品油企业类型：</strong>
                </td>
                <td>非成品油企业</td>
              </tr>
              <tr>
                <td class="text-right">
                  <strong>是否特定企业：</strong>
                </td>
                <td>否</td>
                <td class="text-right">
                  <strong>档案同步时间：</strong>
                </td>
                <td>20xx-xx-xx xx:xx:xx</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--平台密码修改-->
        <div v-else class="con_tb">
          <div class="T-title">
            <span class="pad15_r font-16">
              <div class="row-top-blue"></div>
              <span class="row-top-text">平台密码修改</span>
            </span>
            <span class="pad30_r" style="display: inline-block;"></span>
            <span>
                <input name="setState" type="radio" v-model="plat.editPlat" value="1" @click="editPlatStatus('1')">　是
                <span class="pad30_r"></span>
                <input name="setState" type="radio" v-model="plat.editPlat" value="0" @click="editPlatStatus('0')">　否
              </span>
          </div>
          <table v-show="plat.editPlat == 1" width="90%" class="height40" id="platInfo" style="margin: 0px auto;">
            <tbody>
            <tr>
              <td colspan="2">
                <span style="width: 90px; display: inline-block;">是否启用：</span>
                <span>
                    <input name="plat_pwd_state" type="radio" value="1" v-model="plat.platEnable" @click="editPlatEnable('1')">　是
                    <span class="pad30_r"></span>
                    <input name="plat_pwd_state" type="radio" value="0" v-model="plat.platEnable" checked @click="editPlatEnable('0')">　否
                  </span>
              </td>
            </tr>
            <tr>
              <td>
                  <span style="width: 90px; display: inline-block;">
                    <span class="color_3 pad5_r">*</span>密&nbsp;&nbsp;码:&nbsp;&nbsp;</span>
                <span>
                    <input class="input_1" type="password" :disabled="plat.disabled" style="width: 200px;"
                           v-model="plat.pwdone">
                  </span>
                <span class="explain">6-20位字符,建议由字母/数字/符号两种以上组合</span>
              </td>
            </tr>
            <tr>
              <td>
                  <span style="width: 90px; display: inline-block;">
                    <span class="color_3 pad5_r">*</span>确认密码：</span>
                <span>
                    <input class="input_1" type="password" :disabled="plat.disabled" style="width: 200px;"
                           v-model="plat.pwdtwo">
                  </span>
                <span class="explain">请再次输入密码</span>
              </td>
            </tr>
            <tr>
              <td>
                  <span style="width: 90px; display: inline-block;">
                    <span class="color_3 pad5_r">*</span>提示问题：
                  </span>
                <span>
                    <input class="input_1" style="width: 200px;" :disabled="plat.disabled" type="text"
                           maxlength="20" v-model="plat.platQuestion">
                  </span>
              </td>
            </tr>
            <tr>
              <td>
                  <span style="width: 90px; display: inline-block;">
                    <span class="color_3 pad5_r">*</span>答案：</span>
                <span>
                    <input class="input_1" style="width: 200px;" :disabled="plat.disabled" type="text" maxlength="20"
                           v-model="plat.platAnswer">
                  </span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="font_1 color_3"
                     style="line-height: 20px; padding-top: 15px; margin-top: 20px; border-top: 1px dotted #666;">
                  <strong>说明：</strong>此平台密码非证书密码，为强化平台安全，启用后需同时输入证书密码与平台密码，无此需求可不启用。
                </div>
              </td>
            </tr>
            <tr class="text-center">
              <td colspan="3">
                <a class="mt-20 button button-green" style="height: 30px; line-height: 15px;" @click="savePlatInfo">　保 存　</a>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import common from '../../mixins/common'
  export default {
    mixins:[ common ],
    data() {
      return {
        name: "Info",
        // 表单验证
        personnelRules: {
          name: [
            {required: true, message: '姓名不能为空!', trigger: 'blur'}
          ]
        },
        status: '0', // 基本信息维护 与 平台密码维护 切换依据

        plat: {
          editPlat: 0, //平台密码是否修改
          platEnable: 0, // 平台密码是否启用
          disabled: true,
          pwdone: '',
          pwdtwo: '',
          platQuestion: '', // 提示问题
          platAnswer: '', // 问题答案
        },
        com: {}, // 企业基本信息
      }
    },
    mounted() {

      // 同步企业信息
      this.synchronizeComInfo()
      // 平台密码信息获取
      this.setPlatInfo()
    },
    methods: {
      // 平台密码信息保存
      savePlatInfo(){
        var pwdA = this.plat.pwdone
        var pwdB = this.plat.pwdtwo
        if(pwdA == pwdB){
          var plat = {...this.plat}
          plat.disabled = plat.disabled ? '0':'1'
          this.$store.commit('savePublicData', {name: 'plat', data: plat})
          this.$message.success('保存成功')
        }else{
          this.$message.error('两次密码输入不一致')
        }
      },
      editStatus(res) {
        this.status = res
      },
      editPlatStatus(res) {
        this.plat.editPlat = res
      },
      //平台密码是否开启
      editPlatEnable(res) {
        this.plat.platEnable = res
        if (res == 0) {
          this.plat.disabled = true
        } else {
          this.plat.disabled = false
        }
      },
      // 平台密码信息获取
      setPlatInfo(){
        var pubData = this.$store.state.publicData
        if (pubData['plat'] != undefined) {
          this.plat = pubData['plat']
          this.editPlatEnable(this.plat.platEnable)
        }
      },
    }
  }
</script>

<style>

  .m-l label:nth-child(1) {
    margin-left: -11px;
  }
</style>
<style scoped>
  .info-on{
    color: #ffffff !important;
    font-weight: bold !important;
    background-color: #3bb5ee !important;
    border: 1px solid #3bb5ee !important;
  }
  .tbbox input {
    height: 45px;
    padding: 5px 30px;
    border-radius: 5px;
    color: #666666;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
  .tips p{
    color: #888888;
    margin: 10px 0;
  }
  .tips-con-bz{
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
    line-height: 60px;
    /*border-bottom: 20px solid #F7F7F7;*/
  }

</style>

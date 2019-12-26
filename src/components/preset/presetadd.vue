<template>
  <div class="businessAdd">


    <el-form :model="preset" label-position="right" :rules="presetRuleValidate" ref="preset"
             label-width="100px" class="demo-ruleForm">
      <el-form-item label="业务内容" prop="content">
        <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="preset.content">
        </el-input>
      </el-form-item>
      <el-form-item label="文字解析" prop="text_parse">
        <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="preset.text_parse">
        </el-input>
      </el-form-item>
      <!--<el-form-item label="视频解析">-->
        <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:on-change="handleChange">-->
          <!--&lt;!&ndash;:file-list="preset.video_parse"&ndash;&gt;-->
          <!--<el-button size="small" type="primary">点击上传</el-button>-->
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
      <!--</el-form-item>-->
      <div class="text-center">
        <el-button type="success" @click="saveBusinessInfo">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Presetadd",
    data() {
      return {
        preset: {
          content: '', // 业务内容
          text_parse: '', // 文字解析
          video_parse: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }
          ],
          // 视频解析
          // material: [
          //   {
          //     name: 'food.jpeg',
          //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          //   },
          //   {
          //     name: 'food2.jpeg',
          //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          //   }
          // ] //材料
        },
        presetRuleValidate: {
          content: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ],
        },
        // presetCode: this.$store.state.presetCode
        presetCode: null,
        presetId: null
      }
    },
    watch: {
      presetCode(val) {
        const trade_id = this.$store.state.preset.trade_id
        if(val == null){
          this.preset.content = ''
          this.preset.text_parse = ''
          this.presetId = null
        }
      }
    },
    methods: {
      // 业务信息保存
      saveBusinessInfo() {
        this.$refs['preset'].validate((valid) => {
          if(valid){
            var presetInfo = {...this.preset};
            presetInfo['cid'] = this.$store.state.preset.trade_id

            axios.post(host + 'business', presetInfo).then(res => {
              if(res.data.error_code == 0){
                this.$message.success('保存成功！')
                this.handleReset('preset')
                layer.close(layer.index); //再执行关闭
              }else{
                this.$message.error('保存失败请刷新后重试')
              }
            })
          }else{
            this.$message.error('必填项目能为空!');
          }
        })
      },
      handleChange(file, fileList) {
        // this.fileList = fileList.slice(-3);
        console.log(123)
      },
      // 初始化表单数据
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>

<style scoped>
  /*业务弹窗*/
  .businessAdd {
    width: 100%;
    overflow: auto;
    padding: 10px;
  }
  .businessAdd .row {
    margin: 0px auto;
  }
  .material .success{
    background-color: #93C343;
    border-color: #93C343;
  }
  .material .success:hover{
    background-color: #B4D57C;
    border-color: #B4D57C;
  }
</style>

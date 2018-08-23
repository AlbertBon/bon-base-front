<template>
  <div>
    <input id="excel-upload-input" ref="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div id="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      拖拽文件到此或者
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">{{btnText}}</el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    beforeUpload: Function,
    doUpload: Function,
    btnText: String
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只支持单个文件上传!')
        return
      }
      //只用第一个文件
      const rawFile = files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('只支持.xlsx, .xls, .csv文件')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handleUploadExcel:function(){
      this.$emit("handleUploadExcel");
    },
    handleClick(e) {
      //只用第一个文件
      const files = e.target.files
      const rawFile = files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      //修复不能选择同一个文件
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      //如果没有上传前判断方法，则直接进入上传文件流程
      if (!this.beforeUpload) {
        this.doUpload(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.doUpload(rawFile)
      }
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
#excel-upload-input{
  display: none;
  z-index: -9999;
}
#drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>

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
import XLSX from 'xlsx'

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
      const rawFile = files[0] // only use files[0]

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
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        console.log('x')
        this.doUpload(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        console.log('y')
        this.doUpload(rawFile)
        // axios.post('http://localhost:8080/sys/generateSQLByXLS', rawFile)
        //   .then(function (response) {
        //     alert(response.data);
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     alert("上传失败");
        //     console.log(error);
        //     window.location.reload();
        //   });
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

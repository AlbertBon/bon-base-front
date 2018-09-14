<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatarUrl" alt="head">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="toggleShow" style="display:block;">修改头像</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="300"
               :height="300"
               :url="url"
               :field="file"
               :params="params"
               :headers="headers"
               img-format="png"></my-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import myUpload from '@/components/ImageCropper'

export default {
  data(){
    return{
      baseUrl:process.env.BASE_API,

      //切换头像参数
      show: false,
      url:'/user/uploadAvatar',
      params: {
      },
      headers:{},
      file:'file',
      imgDataUrl: ''
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    myUpload
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo'
    ]),
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      this.avatarUrl = this.baseUrl + '/user/getAvatar?key=' + this.userInfo.userId;
      this.params.key = this.userInfo.userId;
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      let _this=this;
      this.postRequest('/login/loginOut').then(resp => {
        _this.$store.commit('REMOVE_TOKEN')
        _this.$store.commit('REMOVE_USER_INFO')
        _this.$router.push({path: '/generatesql/login'});
      })
    },
    //切换展示
    toggleShow() {
      this.show = !this.show;
    },
    //读取图片成功
    cropSuccess(imgDataUrl, field){
      // console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    //上传成功
    cropUploadSuccess(jsonData, field){
      // console.log('-------- upload success --------');
      //刷新头像
      this.avatarUrl = this.avatarUrl + '&random='+  Math.random();
    },
    //上传失败
    cropUploadFail(status, field){
      // console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>


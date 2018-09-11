<template>
  <div class="page">
    <div class='demos-content-padded'>
      <a href="javascript:;" id='show-alert' class="weui-btn weui-btn_primary">显示 Alert</a>
      <a href="javascript:;" id='show-confirm' class="weui-btn weui-btn_primary">显示 Confirm</a>
      <a href="javascript:;" id='show-prompt' class="weui-btn weui-btn_primary">显示 Prompt</a>
      <a href="javascript:;" id='show-login' class="weui-btn weui-btn_primary">显示登录弹窗</a>
      <a href="javascript:;" id='show-custom' class="weui-btn weui-btn_primary">显示自定义对话框</a>
    </div>
  </div>
</template>

<!--js部分-->
<script>

  export default {
    components: {
    },
    data() {
      return {};
    },
    created() {
      this.login();
    },
    methods: {
      //微信跳转
      login() {
        $(document).on("click", "#show-alert", function() {
          $.actions({
            actions: [{
              text: "编辑",
              onClick: function() {
                //do something
              }
            },{
              text: "删除",
              onClick: function() {
                //do something
              }
            }]
          });
        });
        // let code = this.$route.query.code;
        // console.log(code)
        // this.getRequest('/wechat/login?code='+code).then(res => {
        //   listLoading: false;
        //   if (res.data.code == '00') {
        //
        //   }
        // })
      },
      test(){
        console.log('x')
        this.$message.success('xx')
        $.confirm("自定义的消息内容", function() {
          //点击确认后的回调函数
        }, function() {
          //点击取消后的回调函数
        });

      }
    }
  }

</script>




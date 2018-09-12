<template>
  <div class="bon-page">
    <div class="bon-header bon-flex">
      <div class="bon-header_left"></div>
      <div class="bon-header_center bon-flex__item">账户总览</div>
      <div class="bon-header_right ">
        <span class="fa fa-cogs bon-color_yellow"></span>
      </div>
    </div>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="@/assets/img/swiper-1.jpg" /></div>
        <div class="swiper-slide"><img src="@/assets/img/swiper-2.jpg" /></div>
        <div class="swiper-slide"><img src="@/assets/img/swiper-3.jpg" /></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <!--<div class="swiper-button-prev"></div>-->
      <!--<div class="swiper-button-next"></div>-->
      <!-- 如果需要滚动条 -->
      <!--<div class="swiper-scrollbar"></div>-->
    </div>
    <div class="bon-grids">
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>

      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
      <a href="" class="bon-grid js_grid">
        <div class="bon-grid__icon">
          <span class="fa fa-2x fa-list"></span>
        </div>
        <p class="bon-grid__label">
          Form
        </p>
      </a>
    </div>
    <div class="swiper-container_banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide">123</div>
        <div class="swiper-slide">456</div>
        <div class="swiper-slide">789</div>
      </div>
    </div>
  </div>
</template>

<!--js部分-->
<script>
  import Swiper from 'swiper'

  export default {
    components: {},
    data() {
      return {};
    },
    mounted() {
      this.login();

    },
    methods: {
      //微信跳转
      login() {
        new Swiper ('.swiper-container', {
          loop: true,
          //自动跳转
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          // // 如果需要前进后退按钮
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // },
          // // 如果需要滚动条
          // scrollbar: {
          //   el: '.swiper-scrollbar',
          // },
        })
        new Swiper ('.swiper-container_banner', {
          loop: true,
          direction:'vertical',
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
        })
        // let code = this.$route.query.code;
        // console.log(code)
        // this.getRequest('/wechat/login?code='+code).then(res => {
        //   listLoading: false;
        //   if (res.data.code == '00') {
        //
        //   }
        // })
      },
      test() {
        $.confirm("自定义的消息内容", function () {
          //点击确认后的回调函数
        }, function () {
          //点击取消后的回调函数
        });

      }
    }
  }

</script>

<style scoped>
  .swiper-container {
    width: 100%;
    height: 200px;
  }

  .swiper-container img {
    display: block;
    width: 100%;
  }

  .swiper-container_banner{
    height: 30px;
  }

  .bon-grid{
    width: 25%;
  }
</style>




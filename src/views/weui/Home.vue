<template>
  <div class="bon-page">
    <div class="bon-header bon-flex">
      <div class="bon-header_left"></div>
      <div class="bon-header_center bon-flex__item">账户总览</div>
      <div class="bon-header_right ">
        <span class="fa fa-cogs bon-color_yellow"></span>
      </div>
    </div>

    <div class='chart-container'>
      <circle-chart class="circleChart" id="circle" :option="option"></circle-chart>
      <div class="circleText"><span>234567.5/250000</span></div>
    </div>

    <div class="bon-grids" style="margin-bottom: 200px">
      <a @click="test" class="bon-grid js_grid">
        <div class="bon-grid__icon bon-bg_color_green">
          <span class="fa fa-lg fa-credit-card-alt " style="top:11px;left: 11px;position: relative;"></span>
        </div>
        <p class="bon-grid__label">
          卡片管理
        </p>
      </a>
      <a @click="test" class="bon-grid js_grid">
        <div class="bon-grid__icon bon-bg_color_red">
          <span class="fa fa-2x fa-clock-o" style="top:10px;left: 11px;position: relative;"></span>
        </div>
        <p class="bon-grid__label">
          交易记录
        </p>
      </a>
      <a @click="test" class="bon-grid js_grid">
        <div class="bon-grid__icon bon-bg_color_blue" >
          <span class="fa fa-lg fa-users" style="top:12px;left: 13px;position: relative;"></span>
        </div>
        <p class="bon-grid__label">
          商户号设置
        </p>
      </a>
      <a @click="test" class="bon-grid js_grid">
        <div class="bon-grid__icon bon-bg_color_yellow" >
          <span class="fa fa-lg fa-money" style="top:11px;left: 13px;position: relative;"></span>
        </div>
        <p class="bon-grid__label">
          手续费账单
        </p>
      </a>
    </div>


    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="@/assets/img/swiper-1.jpg" /></div>
        <div class="swiper-slide"><img src="@/assets/img/swiper-2.jpg" /></div>
        <div class="swiper-slide"><img src="@/assets/img/swiper-3.jpg" /></div>
      </div>
      <!-- 如果需要分页器 -->
      <!--<div class="swiper-pagination"></div>-->
      <!-- 如果需要导航按钮 -->
      <!--<div class="swiper-button-prev"></div>-->
      <!--<div class="swiper-button-next"></div>-->
      <!-- 如果需要滚动条 -->
      <!--<div class="swiper-scrollbar"></div>-->
    </div>
  </div>
</template>

<!--js部分-->
<script>
  import circleChart from '@/components/CircleChart'
  import Swiper from 'swiper'

  export default {
    components: { circleChart },
    data() {
      return {
        //圆形进度条设置
        option: {
          value: 85.2,
          color: "#f8b551",//主要颜色
          backgroundColor: "#e6e6e6",//底色
          speed: 2000,//动画完成时间
          animation: "easeInOutCubic",
          text: '85.2%',//文字内容
          size: 200,//圆圈大小
          widthRatio: .1,//边线大小
          startAngle: 25,//起点设置
          textCenter: !0,//文字位置
          textSize: 35,//文字大小
          textWeight: "normal",
          textFamily: "sans-serif",
          relativeTextSize: 1 / 7,
        }
      };
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
          // pagination: {
          //   el: '.swiper-pagination',
          // },
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
        $.confirm("测试信息", function () {
          //点击确认后的回调函数
        }, function () {
          //点击取消后的回调函数
        });

      }
    }
  }

</script>

<style scoped>
  /*重写全局样式   开始*/
  .bon-grids:before{
    border-top:0;
  }
  .bon-grid{
    width: 25%;
  }
  .bon-grid:before{
    border-right:0;
  }
  .bon-grid:after{
    border-bottom:0;
  }
  .bon-grid__icon{
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border-radius: 50%;
    color: #fff;
  }
  .bon-grid__icon + .bon-grid__label {
    margin-top: 10px;
    color: #808080;
  }
  /*重写全局样式   结束*/
  .chart-container{
    position: relative;
    padding:20px;
  }
  .circleText{
    text-align: center;
    padding-top: 20px;
    font-size: .75rem;
  }

  .swiper-container {
    width: 100%;
    height: 200px;
    position: fixed;
    bottom: 0;
  }
  .swiper-container img {
    display: block;
    width: 100%;
  }
  .swiper-container_banner{
    height: 30px;
  }
</style>




<template>
  <div :class="containerClassName" :id="id">
    <div :class="wrapperClassName">
      <div :class="slideClassName"><img src="@/assets/img/swiper-1.jpg" /></div>
      <div :class="slideClassName"><img src="@/assets/img/swiper-2.jpg" /></div>
      <div :class="slideClassName"><img src="@/assets/img/swiper-3.jpg" /></div>
    </div>
    <!-- 如果需要分页器 -->
    <div v-if="pagination=='true'" class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div v-if="prev=='true'" class="swiper-button-prev"></div>
    <div v-if="next=='true'" class="swiper-button-next"></div>
    <!-- 如果需要滚动条 -->
    <div v-if="scrollbar=='true'" class="swiper-scrollbar"></div>
  </div>
</template>

<script>
  import swiperjs from './js/swiper'

  export default {
    props: {
      containerClassName: {
        type: String,
        default: 'swiper-container'
      },
      wrapperClassName: {
        type: String,
        default: 'swiper-wrapper'
      },
      slideClassName: {
        type: String,
        default: 'swiper-slide'
      },
      pagination:{
        type: String,
        default: 'false'
      },
      prev:{
        type: String,
        default: 'false'
      },
      next:{
        type: String,
        default: 'false'
      },
      scrollbar:{
        type: String,
        default: 'false'
      },
      id: {
        type: String,
        default: 'swiper'
      },
      option: Object,
    },
    data() {
      return {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
          new Swiper("#"+this.id, this.option)
      }
    }
  }
</script>

<style>
  @import './css/swiper.css';
</style>

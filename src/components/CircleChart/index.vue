<template>
  <div :class="className" :id="id" :option="option"></div>
</template>

<script>
  import './js/circleChart'
// 还需引入jquery
  export default {
    props: {
      className: {
        type: String,
        default: 'circleChart'
      },
      id: {
        type: String,
        default: 'circleChart'
      },
      option: Object,
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        $("#"+this.id).circleChart(this.option)
      }
    }
  }
</script>

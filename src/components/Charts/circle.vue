<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    // mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))

        const labelTop = {//上层样式
          normal : {
            color :'#f8b551',
            label : {
              show : true,
              position : 'center',
              formatter : '{b}',
              textStyle: {
                baseline : 'bottom',
                fontSize: 22
              }
            },
            labelLine : {
              show : false
            }
          }
        };
        var labelBottom = {//底层样式
          normal : {
            color: '#ccc',
            label : {
              show : false,
              position : 'center',
              color : '#808080' ,
              fontSize:22
            },
            labelLine : {
              show : false
            }
          },
          emphasis: {//悬浮式样式
            // color: 'rgba( 0,0,0,0)'
          }
        };
        const radius = [72,80];// 半径[内半径，外半径]
        this.chart.setOption(
          {
            // title : {
            //   text: '正标题',
            //   subtext: '副标题',
            //   x:'center',
            //   //正标题样式
            //   textStyle: {
            //     fontSize:44,
            //     fontFamily:'Arial',
            //     fontWeight:100,
            //     //color:'#1a4eb0',
            //   },
            //   //副标题样式
            //   subtextStyle: {
            //     fontSize:28,
            //     fontFamily:'Arial',
            //     color:"#1a4eb0",
            //   },
            // },
            animation:false,
            tooltip : {         // 提示框. Can be overwrited by series or data
              trigger: 'axis',
              //show: true,   //default true
              showDelay: 0,
              hideDelay: 50,
              transitionDuration:0,
              borderRadius : 8,
              borderWidth: 2,
              padding: 10,    // [5, 10, 15, 20]
            },
            series : [
              {
                type : 'pie',
                center : ['50%', '70%'],//圆心坐标（div中的%比例）
                radius : radius,//半径
                x: '0%', // for funnel
                itemStyle : labelTop,//graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
                data : [
                  {name:'79%', value:79,itemStyle : labelTop},
                  {name:'', value:21, itemStyle : labelBottom}
                ]
              }
            ]
          })

      }
    }
  }
</script>

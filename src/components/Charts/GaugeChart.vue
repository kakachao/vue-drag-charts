<template>
  <div ref="gaugeChart"></div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import * as echarts from "echarts";
import defaultSetting from "@/components/Charts/common";
// import { useResize } from '@/common/resize.js'
// let { myChart } = useResize();
let myChart = null
const props = defineProps({
  config: Object
})
let gaugeChart = ref();
const initEchart = () => {
  const { title, data } = defaultSetting(props.config);
  // console.log(gaugeChart.value,'gaugeChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(gaugeChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      color: ["#37A2DA", "#32C5E9", "#67E0E3"],
      title: [
        {
          show: title.show,
          text: title.text,
          top: title.top,
          left: title.left,
          textStyle: title.textStyle,
        },
        {
          text: data,
          bottom: "20%",
          left: "center",
          textStyle: {
            color: "#5171fd",
            fontSize: 24,
          },
        },
      ],
      series: [
        {
          type: "gauge",
          center: ["50%", "52%"],
          radius: "83.10%",
          startAngle: 225,
          endAngle: -45,
          min: 0,
          max: 100,
          axisLine: {
            show: true,
            lineStyle: {
              width: 25,
              shadowBlur: 0,
              color: [
                [0.3, "#67e0e3"],
                [0.7, "#37a2da"],
                [1, "#fd666d"],
              ],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: 0,
          },
          axisLabel: {
            show: 0,
          },
          pointer: {
            show: true,
            length: "100%",
            radius: "20%",
            width: 5, //指针粗细
          },
          itemStyle: {
            color: "#4389F6",
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: data,
            },
          ],
        },
        //刻度
        {
          type: "gauge",
          radius: "78%",
          center: ["50%", "52%"],
          splitNumber: 10,
          min: 0,
          max: 100,
          startAngle: 225,
          endAngle: -45,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            length: 12,
            lineStyle: {
              color: "#b3efff",
              width: 2,
              shadowColor: "rgb(58,115,192)",
              shadowBlur: 15,
            },
          },
          pointer: {
            show: 0,
          },
          detail: {
            show: 0,
          },
        },
      ],
    },
    true
  );
}
onMounted(() => {
  nextTick(() => {
    initEchart();
  })
})
watch(props.config, () => {
  initEchart()
}, { deep: true })
</script>

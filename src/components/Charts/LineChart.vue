<template>
  <div ref="lineChart"></div>
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
let lineChart = ref();
const initEchart = () => {
  const { title, legend, grid, xAxis, yAxis, dataZoom, series } =
    defaultSetting(props.config);
  // console.log(lineChart.value,'lineChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(lineChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      title,
      legend,
      grid,
      xAxis,
      yAxis,
      dataZoom,
      series,
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

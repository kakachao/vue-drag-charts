<template>
  <div ref="barChart"></div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import * as echarts from "echarts";
import defaultSetting from "@/components/Charts/common";
let myChart = null;
const props = defineProps({
  config: Object
})
let barChart = ref();
const initEchart = () => {
  const { title, legend, grid, xAxis, yAxis, dataZoom, series } =
    defaultSetting(props.config);
  // console.log(barChart.value,'barChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(barChart.value);
  // console.log(myChart, 'myChart')
  myChart.setOption(
    {
      title,
      grid,
      legend,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        padding: [5, 10],
      },
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

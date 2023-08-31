<template>
  <div ref="pieChart"></div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import * as echarts from "echarts";
import defaultSetting from "@/components/Charts/common";
// import { useResize } from '@/common/resize.js'
// let { myChart } = useResize();
const colorList = [
  "#4FD8FF",
  "#C15FFF",
  "#FF5F55",
  "#FFC935",
  "#767BFB",
  "rgb(248,70,102)",
];
let myChart = null
const props = defineProps({
  config: Object
})
let pieChart = ref();
const initEchart = () => {
  const { title, legend, series } = defaultSetting(props.config);
  // console.log(pieChart.value,'pieChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(pieChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      color: colorList,
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return (
            params.marker +
            " " +
            params.name +
            "：" +
            params.value +
            " (" +
            params.percent +
            "%)"
          );
        },
      },
      title,
      legend,
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

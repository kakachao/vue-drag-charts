<template>
  <div ref="wordChart"></div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import * as echarts from "echarts";
import "echarts-wordcloud";
import defaultSetting from "@/components/Charts/common";
import { message } from 'ant-design-vue';
// import { useResize } from '@/common/resize.js'
// let { myChart } = useResize();
const colorList = ["#4FD8FF", "#C15FFF", "#FF5F55", "#FFC935", "#767BFB"];
let myChart = null
const props = defineProps({
  config: Object
})
let wordChart = ref();
const initEchart = () => {
  const { data, title } = defaultSetting(props.config);
  // console.log(wordChart.value,'wordChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(wordChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      tooltip: {},
      title,
      series: [
        {
          type: "wordCloud",
          sizeRange: [12, 35],
          rotationRange: [0, 0],
          width: "100%",
          shape: "cardioid",
          gridSize: 11,
          top: 0,
          textStyle: {
            fontFamily: "sans-serif",
            color: () => {
              return colorList[
                Math.floor(Math.random() * colorList.length)
              ];
            },
          },
          data: data,
        },
      ],
    },
    true
  );
  myChart.off("click");
  myChart.on("click", (params) => {
    message.success("点击了" + params.name);
  });
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


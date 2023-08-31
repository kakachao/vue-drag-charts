<template>
  <div ref="treeChart"></div>
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
let treeChart = ref();
const initEchart = () => {
  const { title, data } = defaultSetting(props.config);
  // console.log(treeChart.value,'treeChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(treeChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      title,
      color: [
        "#6FFFFF",
        "#FF9244",
        "#7155B7",
        "#0FE7E7",
        "#48C7F2",
        "#4490FF",
      ],
      tooltip: {},
      series: [
        {
          name: "矩形树图",
          type: "treemap",
          roam: false,
          label: {
            show: true,
            formatter: "{b}",
            fontSize: 14,
          },
          nodeClick: false,
          breadcrumb: {
            show: false,
          },
          itemStyle: {
            show: true,
            textStyle: {
              color: "#666",
              fontSize: 14,
            },
            borderWidth: 0,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          data: data,
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
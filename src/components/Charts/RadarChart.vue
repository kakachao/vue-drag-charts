<template>
  <div ref="radarChart"></div>
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
let radarChart = ref();
const initEchart = () => {
  const { keyData, data1, data2, title } = defaultSetting(props.config);
  let maxData = data1.map((item) => {
    return {
      name: item.name,
      value: 100,
    };
  });
  // console.log(radarChart.value,'radarChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(radarChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      title,
      color: ["#FF9E8C", "#00D2C9"],
      tooltip: {
        trigger: "item",
      },
      legend: {
        icon: "circle",
        show: true,
        right: "5",
        top: "10",
        itemWidth: 10,
        itemHeight: 11,
        textStyle: {
          color: "#f1f1f1",
        },
        data: keyData,
      },
      radar: {
        center: ["48%", "50%"],
        radius: "60%",
        axisNameGap: 15,
        startAngle: 90,
        splitNumber: 4,
        axisName: {
          textStyle: {
            color: "#f1f1f1",
            fontSize: 14,
          },
        },
        shape: "circle",
        splitArea: {
          areaStyle: {
            color: ["transparent"],
          },
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(63,133,247,0.3)",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(63,133,247,0.3)",
          },
        },
        indicator: maxData,
      },
      series: [
        {
          name: keyData[1],
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: "rgba(0,0,0,.2)",
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          itemStyle: {
            shadowColor: "rgb(58,115,192)",
            shadowBlur: 15,
          },
          data: [
            {
              value: data2.map((item) => item.value),
              name: keyData[1],
            },
          ],
        },
        {
          name: keyData[0],
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: "rgba(0,0,0,.2)",
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          itemStyle: {
            shadowColor: "rgb(58,115,192)",
            shadowBlur: 15,
          },
          data: [
            {
              value: data1.map((item) => item.value),
              name: keyData[0],
            },
          ],
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


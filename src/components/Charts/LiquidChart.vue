<template>
  <div ref="liquidChart"></div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import * as echarts from "echarts";
import "echarts-liquidfill";
import defaultSetting from "@/components/Charts/common";
// import { useResize } from '@/common/resize.js'
// let { myChart } = useResize();
let myChart = null
const props = defineProps({
  config: Object
})
let liquidChart = ref();
const initEchart = () => {
  const { data } = defaultSetting(props.config);
  // console.log(liquidChart.value,'liquidChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(liquidChart.value);
  // console.log(myChart.value, 'myChart')
  myChart.setOption(
    {
      series: [
        {
          type: "liquidFill",
          radius: "85%",
          center: ["50%", "45%"],
          data: data,
          backgroundStyle: {
            color: {
              type: "linear",
              x: 1,
              y: 0,
              x2: 0.5,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "rgba(168, 218, 247, 0.4)",
                },
                {
                  offset: 0.5,
                  color: "rgba(168, 218, 247, 0.5)",
                },
                {
                  offset: 0,
                  color: "rgba(168, 218, 247, 0.8)",
                },
              ],
              globalCoord: false,
            },
          },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 5,
              borderColor: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(81,142,215, 0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(53,142,215, 0.45)",
                  },
                  {
                    offset: 1,
                    color: "rgba(53,142,215, 0.6)",
                  },
                ],
                globalCoord: false,
              },
              shadowColor: "rgba(66,102,247, 0.55)",
              shadowBlur: 10,
            },
          },
          label: {
            formatter: data[0] + "%",
            fontSize: 35,
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
  
export default {
  width: 300,
  height: 300,
  left: 0,
  top: 0,
  // 标题
  title: {
    show: true,
    text: "柱状图",
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
    },
    left: '50%',
    top: "",
  },
  //图例
  legend: {
    show: false,
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
    },
    left: "75%",
    top: "",
    icon: "circle",
    orient: "horizontal",
    scroll: false,
  },
  grid: {
    left: 50,
    top: 50,
    right: 20,
    bottom: 40,
  },
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      color: "#f1f1f1",
      fontSize: 12,
      interval: false,
      rotate: 0,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
  },
  yAxis: {
    name: "",
    nameTextStyle: {
      fontSize: 12,
      color: "#f1f1f1",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      color: "#f1f1f1",
      fontSize: 12,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
  },
  dataZoom: {
    show: false,
    type: "inside",
  },
  series: {
    name: "日期",
    type: "bar",
    barWidth: "20",
    gradual: true, //是否渐变色
    gradualColor: ["#5171fd", "#c97afd"], //渐变颜色
    color: "#5171fd", //非渐变色颜色
    borderRadius: 0,
    orient: "vertical",
    label: {
      show: false,
      color: "#f1f1f1",
      fontSize: 12,
      position: "inside",
    },
  },
  data: [
    {
      name: "星期一",
      value: "60",
      id: 0,
    },
    {
      name: "星期二",
      value: "100",
      id: 1,
    },
    {
      name: "星期三",
      value: "140",
      id: 2,
    },
    {
      name: "星期四",
      value: "160",
      id: 3,
    },
    {
      name: "星期五",
      value: "130",
      id: 4,
    },
    {
      name: "星期六",
      value: "70",
      id: 5,
    },
    {
      name: "星期日",
      value: "90",
      id: 6,
    },
  ],
};

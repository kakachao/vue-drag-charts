import bar from "./bar";
import line from "./line";
import pie from "./pie";
import liquid from "./liquid";
import gauge from "./gauge";
import word from "./word";
import radar from "./radar";
import tree from "./tree";
import seriesMap from "./seriesMap";
import scatterMap from "./scatterMap";
import date from "./date";
import number from "./number";
import table from "./table";

export default [
  {
    icon: "echarts",
    children: [
      {
        component: "BarChart",
        title: "柱状图",
        img: new URL('@/assets/img/bar.png', import.meta.url).href,
        config: bar,
      },
      {
        component: "LineChart",
        title: "折线图",
        img: new URL('@/assets/img/line.png', import.meta.url).href,
        config: line,
      },
      {
        component: "PieChart",
        title: "饼图",
        img: new URL('@/assets/img/pie.png', import.meta.url).href,
        config: pie,
      },
      {
        component: "LiquidChart",
        title: "水球图",
        img: new URL('@/assets/img/liquid.png', import.meta.url).href,
        config: liquid,
      },
      {
        component: "GaugeChart",
        title: "仪表盘",
        img: new URL('@/assets/img/gauge.png', import.meta.url).href,
        config: gauge,
      },
      {
        component: "WordChart",
        title: "词云图",
        img: new URL('@/assets/img/word.png', import.meta.url).href,
        config: word,
      },
      {
        component: "RadarChart",
        title: "雷达图",
        img: new URL('@/assets/img/radar.png', import.meta.url).href,
        config: radar,
      },
      {
        component: "TreeChart",
        title: "矩形树图",
        img: new URL('@/assets/img/tree.png', import.meta.url).href,
        config: tree,
      },
    ],
  },
  {
    icon: "map",
    children: [
      {
        component: "SeriesMap",
        title: "分布图",
        img: new URL('../component/img/seriesMap.png', import.meta.url).href,
        config: seriesMap,
      },
      {
        component: "ScatterMap",
        title: "散点图",
        img: new URL('../component/img/scatterMap.png', import.meta.url).href,
        config: scatterMap,
      },
    ],
  },
  {
    icon: "table",
    children: [
      {
        component: "BaseTable",
        title: "Table表",
        img: new URL('../component/img/table.png', import.meta.url).href,
        config: table,
      },
    ],
  },
  {
    icon: "tool",
    children: [
      {
        component: "DateComponent",
        title: "日期",
        img: new URL('../component/img/date.png', import.meta.url).href,
        config: date,
      },
      {
        component: "NumberComponent",
        title: "滚动数字",
        img: new URL('../component/img/number.png', import.meta.url).href,
        config: number,
      },
    ],
  },
];

<template>
  <div class="preview" :style="{ backgroundImage: 'url(' + background + ')' }" ref="previewBox">
    <!-- <svg-icon icon="return" class="returnIcon pointer" :size="26" @click.native="$emit('close')"></svg-icon> -->
    <Icon class="returnIcon pointer" @click.native="$emit('close')">
      <template #component>
        <svg t="1623834349357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6232" width="24" height="24">
          <path
            d="M469.1 267.2V119.9c-13.4-61.6-64.3-24.1-64.3-24.1L51.2 398.5c-77.7 53.6-5.4 93.8-5.4 93.8l348.3 300.1c69.7 50.9 75-26.8 75-26.8V628.9c353.7-109.8 498.3 329.5 498.3 329.5 13.4 24.1 21.4 0 21.4 0 136.7-659-519.7-691.2-519.7-691.2z"
            fill="#3A97A7" p-id="6233"></path>
        </svg>
      </template>
    </Icon>

    <component v-for="item in list" :key="item.id" :is="item.component" :config="item.config"
      :style="getStyle(item.config)" class="absolute"></component>
  </div>
</template>
<script>
import Icon from '@ant-design/icons-vue';
import {
  BarChart,
  LineChart,
  PieChart,
  LiquidChart,
  GaugeChart,
  WordChart,
  RadarChart,
  TreeChart,
} from "@/components/Charts";
// import { scatterMap, seriesMap } from "@/components/Map";
// import DateComponent from "@/components/Date";
import html2canvas from "html2canvas";
// import NumberComponent from "@/components/Number";
// import BaseTable from "@/components/Table/baseTable";

export default {
  props: {
    list: {
      type: Array,
    },
    background: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  components: {
    Icon,
    BarChart,
    LineChart,
    PieChart,
    LiquidChart,
    GaugeChart,
    WordChart,
    RadarChart,
    TreeChart,
    // scatterMap,
    // seriesMap,
    // NumberComponent,
    // DateComponent,
    // BaseTable,
  },
  data() {
    return {};
  },

  methods: {
    getStyle(config) {
      const preWidth = window.innerWidth;
      const preHeight = window.innerHeight;
      return {
        left: (config.left / this.width) * preWidth + "px",
        top: (config.top / this.height) * preHeight + "px",
        width: (config.width / this.width) * preWidth + "px",
        height: (config.height / this.height) * preHeight + "px",
      };
    },
    exportImg() {
      const boxDom = this.$refs.previewBox;
      html2canvas(boxDom).then((res) => {
        var dataUrl = res.toDataURL("image/jpeg", 1.0);
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `img_${new Date().getTime()}.png`;
        a.click();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 99999;

  .returnIcon {
    position: absolute;
    right: 35px;
    top: 45px;
  }
}
</style>
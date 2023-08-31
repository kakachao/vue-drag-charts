<template>
  <div class="page-container relative">
    <a-row class="header-container" justify="center" align="middle">
      <a-tooltip placement="bottomLeft">
        <template #title>预览</template>
        <eye-outlined :style="{ fontSize: '24px', marginRight: '25px' }" @click="previewShow = true" />
      </a-tooltip>
      <a-tooltip placement="bottomLeft">
        <template #title>清除</template>
        <clear-outlined :style="{ fontSize: '24px', marginRight: '25px' }" @click="handleClear" />
      </a-tooltip>
      <a-tooltip placement="bottomLeft">
        <template #title>生成图片</template>
        <picture-outlined :style="{ fontSize: '24px', marginRight: '25px' }" @click="exportImg" />
      </a-tooltip>
      <a-tooltip placement="bottomLeft">
        <template #title>数据来源</template>
        <area-chart-outlined :style="{ fontSize: '24px', marginRight: '25px' }" @click="openDialog" />
      </a-tooltip>
      <a-tooltip placement="bottomLeft">
        <template #title>更换背景</template>
        <file-image-outlined
          :style="{ fontSize: '24px', marginRight: '25px', color: backgroundShow ? '#5171fd' : '#fff' }"
          @click="backgroundShow = !backgroundShow" />
      </a-tooltip>
    </a-row>
    <div class="main-container flex">
      <div class="left flex">
        <vuescroll :ops="ops">
          <div class="components-list">
            <Draggable :group="{ name: 'componentDrag', pull: ['clone'] }" :sort="false" animation="300"
              draggable=".components-item" @end="handleEnd" v-model="comList" :clone="cloneComponent" item-key="id">
              <template #item="{ element }">
                <div style="padding: 4px 8px" class="boxder-box relative components-item">
                  <p class="text-center title">{{ element.title }}</p>
                  <img :src="element.img" class="components-img" alt="" />
                </div>
              </template>
            </Draggable>
          </div>
        </vuescroll>
      </div>
      <div class="flex flex-sub" :style="{
        backgroundImage: 'url(' + backgroundList[currentBackIndex] + ')',
      }">
        <!-- :style="{
          backgroundImage: 'url(' + backgroundList[currentBackIndex] + ')',
        }" -->
        <div class="flex-sub relative canvas-container" ref="cutScreen">
          <!-- <h1 style="color: #fff;text-align:center">Hello World</h1> -->
          <Draggable group="componentDrag" animation="340" v-model="drawingList" ghostClass="ghost" style="height: 100%"
            item-key="id">
            <template #item="{ element }">
              <vue-drag-resize :parentLimitation="true" :x="parseFloat(element.config.left || 0)"
                :y="parseFloat(element.config.top || 0)" :w="parseFloat(element.config.width || 300)"
                :h="parseFloat(element.config.height || 300)" @resizestop="(e) => handleResizeStop(e, element)"
                @clicked="handleComponentClick(element)" @dragstop="(e) => handleDragStop(e, element)" @deactivated="() => {
                  showDelete = '';
                }
                  ">
                <component :is="element.component" class="chart-wrapper" :ref="element.id" :config="element.config">
                </component>
                <a-button type="danger" shape="circle" size="small" class="del-button" v-show="showDelete == element.id"
                  @click="removeComponent(element.id)">
                  <template #icon>
                    <delete-outlined />
                  </template>
                </a-button>

              </vue-drag-resize>
            </template>
          </Draggable>
          <div class="center-background" v-if="backgroundShow">
            <img v-for="(item, index) in backgroundList" :key="index" class="background-item" :src="item" alt=""
              @click="changeBacIndex(index)" :class="{ active: currentBackIndex == index }" />
          </div>
        </div>

      </div>
      <div class="right-container">
        <vuescroll :ops="ops">
          <right-setting v-if="currentDel" :config="currentConfig" @changeSize="changeSize">
          </right-setting>
        </vuescroll>
      </div>

    </div>
    <dialog-preview :list="drawingList" :background="backgroundList[currentBackIndex]" @close="previewShow = false"
      :width="$refs.cutScreen.offsetWidth" :height="$refs.cutScreen.offsetHeight" ref="preview" v-if="previewShow">
    </dialog-preview>
    <dialog-table v-model:visible="dialogTableShow" :data="currentConfig.data"></dialog-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useBackIndexStore } from '../../stores/backIndex'
import vuescroll from "vuescroll";
import componentList from "@/config/charts";
import Draggable from "vuedraggable";
import VueDragResize from "vue-drag-resize";
import { deepClone } from "@/utils/index.js";
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
import RightSetting from "./RightSetting.vue";
import DialogTable from "./DialogTable.vue";
import DialogPreview from "./DialogPreview.vue";
import DateComponent from "@/components/Date/index.vue";
import NumberComponent from "@/components/Number/index.vue";
// import BaseTable from "@/components/Table/baseTable.vue";
export default {
  name: "Home",
  components: {
    Draggable,
    VueDragResize,
    BarChart,
    RightSetting,
    // dialogTable,
    LineChart,
    PieChart,
    LiquidChart,
    GaugeChart,
    WordChart,
    RadarChart,
    TreeChart,
    DialogPreview,
    DialogTable,
    DateComponent,
    NumberComponent,
    // BaseTable,
    vuescroll,
  },
  data() {
    return {
      ops: {
        scrollPanel: {
          scrollingX: false,
        },
        bar: {
          // hoverStyle: false,
          // onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#55575d',
          // opacity: 0.5, //滚动条透明度
          // keepShow: true,
        },
      },
      currentIcon: "echarts",
      //当前拖拽的盒子
      currentMove: "",
      //画布盒子list
      drawingList: [],
      //当前显示的delete按钮
      currentDel: null,
      //当前配置项
      currentConfig: {},
      //数据来源dialog
      dialogTableShow: false,
      //预览显示
      previewShow: false,
      //背景图选择
      backgroundShow: false,
      backgroundList: [
        new URL('../../assets/background/a2.png', import.meta.url).href,
        new URL('../../assets/background/a3.jpg', import.meta.url).href,
        new URL('../../assets/background/a4.png', import.meta.url).href,
        new URL('../../assets/background/a8.png', import.meta.url).href,
        new URL('../../assets/background/a13.jpg', import.meta.url).href,
        new URL('../../assets/background/a14.png', import.meta.url).href,
        new URL('../../assets/background/a15.png', import.meta.url).href,
        new URL('../../assets/background/a16.png', import.meta.url).href,

      ],
      showDelete: "",
    };
  },
  computed: {
    leftList() {
      return componentList.map((item) => item.icon);
    },
    comList() {
      let index = this.leftList.indexOf(this.currentIcon);
      if (index !== -1) {
        return componentList[index].children;
      }
      return [];
    },
    ...mapState(useBackIndexStore, {
      currentBackIndex: 'currentBackIndex',
    }),

  },

  methods: {
    //盒子移动到指定盒子
    handleEnd(e) {
      // console.log(this.currentMove)
      let { component, id, config } = this.currentMove;
      const dom = this.$refs.cutScreen;
      const height = dom.offsetHeight - config.height;
      const width = dom.offsetWidth - config.width;
      // console.log(width,height,'==')
      //这里是为了防止拖拽到边界，图形显示不全
      console.log(e.originalEvent, 'e.originalEvent')
      config.left =
        e.originalEvent.offsetX > width ? width : e.originalEvent.offsetX;
      config.top =
        e.originalEvent.offsetY > height ? height : e.originalEvent.offsetY;

      this.drawingList.push({
        component,
        id,
        config: deepClone(config),
      });
    },
    handleSort(e) {
      console.log(e, '=====')
    },
    //克隆盒子
    cloneComponent(e) {
      // console.log(e, '---')
      this.currentMove = {
        id: "box_" + new Date().getTime(),
        ...e,
      };
    },

    //盒子自适应
    handleResizeStop(e, val) {

      this.$nextTick(() => {
        Object.assign(this.currentConfig, {
          width: e.width,
          height: e.height,
        });
        val.config.width = e.width;
        val.config.height = e.height;
        // if (!["date", "table"].includes(val.config.series.type)) {
        //   this.$refs[val.id][0].myChart.resize();
        // }
      });
    },

    //拖拽移动停止
    handleDragStop(e, val) {
      Object.assign(this.currentConfig, {
        left: e.left,
        top: e.top,
      });
      val.config.left = e.left;
      val.config.top = e.top;
    },

    //删除当前图
    removeComponent(id) {
      this.drawingList = this.drawingList.filter((item) => item.id != id);
      this.currentDel = null;
      this.currentConfig = {};
    },

    //点击选中当前拖拽的组件
    handleComponentClick(item) {
      this.showDelete = item.id;
      if (item.id == this.currentDel) return;
      this.currentDel = item.id;
      this.currentConfig = {
        id: item.id,
        ...item.config,
      };
    },

    //修改setting
    changeSize(key, value) {
      // console.log(key,value)
      this.drawingList.forEach((item) => {
        if (item.id == this.currentDel) {
          console.log(item.config[key])
          item.config[key] = value;
          // this.$forceUpdate()
        }
      });
    },
    //pinia使用 mapActions() 将操作属性映射为组件中的方法：
    ...mapActions(useBackIndexStore, ['setBackIndex']),
    //修改背景图片
    changeBacIndex(index) {
      // this.$store.commit("SET_INDEX", index);
      this.setBackIndex(index);
      this.backgroundShow = false
    },

    //打开dialog
    openDialog() {
      // console.log(this.currentDel)
      if (this.currentDel) {
        if (
          ["radar", "scatterMap", "date", "table"].includes(
            this.currentConfig.series.type
          )
        ) {
          this.$message.warning("该图形暂不可编辑数据源");
          return;
        }
        this.dialogTableShow = true;
      } else {
        this.$message.warning("请先选中一个图形!");
      }
    },

    //清除所有
    handleClear() {
      this.drawingList = [];
      this.currentDel = "";
      this.currentConfig = {};
    },

    //生成项目
    exportProject() {
      this.$message.info({
        message: "功能开发中...",
        duration: 2000,
      });
    },

    //导出图片
    exportImg() {
      this.previewShow = true;
      setTimeout(() => {
        this.$refs.preview.exportImg();
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  background-color: #121212;
  color: #fff;
  overflow: hidden;

  .header-container {
    height: 42px;
    line-height: 42px;
    background: #1b1b20;
    border-bottom: 2px solid #000;
  }

  .main-container {
    .components-list {
      height: calc(100vh - 42px);
      // overflow-y: auto;
      // overflow-x: hidden;
    }

    .title {
      // height: 34px;
      // line-height: 40px;
      font-size: 12px;
      color: #fff;
      background: linear-gradient(#000, rgba(0, 0, 0, 0.2));
      position: absolute;
      top: 12px;
      left: 16px;
      right: 16px;
      text-align: center;
    }

    .components-img {
      width: 60px;
      height: auto;
      border-radius: 4px;
      cursor: move;
    }
  }

  .canvas-container {
    // background-image: url('../../assets/background/a2.png');
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
  }

  .del-button {
    position: absolute;
    right: 0;
    top: 0;
  }

  .center-background {
    position: absolute;
    right: 36%;
    top: 0;
    width: 224px;
    height: 570px;
    box-sizing: border-box;
    padding: 12px;
    background: rgba(24, 24, 24, 0.8);
    overflow-y: auto;

    .background-item {
      margin-bottom: 15px;
      position: relative;
      cursor: pointer;
      width: 100%;
      height: auto;
      border-radius: 6px;

      &.active {
        border: 1px solid rgba(81, 113, 253, 1);
      }
    }
  }

  .right-container {
    // position: absolute;
    // top: 42px;
    // right: 0;
    width: 340px;
    height: calc(100vh - 42px);
    overflow-y: auto;
    z-index: 99;
  }
}
</style>
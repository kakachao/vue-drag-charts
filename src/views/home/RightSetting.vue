<template>
  <div class="rightSetting">
    <a-form class="border-box" style="padding: 8px 16px" labelAlign="right">
      <a-form-item label="组件宽度" labelAlign="right">
        <a-input v-model:value="config.width" @change="changeSize($event,'width')" placeholder="请输入组件宽度"></a-input>
      </a-form-item>
      <a-form-item label="组件高度">
        <a-input v-model:value="config.height" @change="changeSize($event,'height')" placeholder="请输入组件高度"></a-input>
      </a-form-item>
      <a-form-item label="X距离">
        <a-input v-model:value="config.left" @change="changeSize($event,'left')"></a-input>
      </a-form-item>
      <a-form-item label="Y距离">
        <a-input v-model:value="config.top" @change="changeSize($event,'top')"></a-input>
      </a-form-item>
      <a-collapse>
        <a-collapse-panel header="标题" v-if="
          !['liquid', 'date', 'number', 'table'].includes(config.series.type)
        ">
          <a-form-item label="显示标题">
            <a-switch v-model:checked="config.title.show"></a-switch>
          </a-form-item>
          <a-form-item label="标题内容" v-if="config.title.show">
            <a-input v-model:value="config.title.text"></a-input>
          </a-form-item>
          <a-form-item label="字体" v-if="config.title.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.title.textStyle.color"></ColorPicker>
              <a-input v-model:value="config.title.textStyle.fontSize" style="margin: 0 8px 0 12px">
              </a-input>px
            </div>
          </a-form-item>
          <a-form-item label="X位置" v-if="config.title.show">
            <a-input v-model:value="config.title.left"></a-input>
          </a-form-item>
          <a-form-item label="Y位置" v-if="config.title.show">
            <a-input v-model:value="config.title.top"></a-input>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel header="网格" v-if="['bar', 'line'].includes(config.series.type)">
          <a-form-item label="left">
            <a-input v-model:value="config.grid.left"></a-input>
          </a-form-item>
          <a-form-item label="top">
            <a-input v-model:value="config.grid.top"></a-input>
          </a-form-item>
          <a-form-item label="right">
            <a-input v-model:value="config.grid.right"></a-input>
          </a-form-item>
          <a-form-item label="bottom">
            <a-input v-model:value="config.grid.bottom"></a-input>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel header="图例" v-if="
          ![
            'liquid',
            'gauge',
            'word',
            'radar',
            'tree',
            'seriesMap',
            'scatterMap',
            'date',
            'table',
            'number',
          ].includes(config.series.type)
        ">
          <a-form-item label="显示图例">
            <a-switch v-model:checked="config.legend.show"></a-switch>
          </a-form-item>

          <a-form-item label="字体" v-if="config.legend.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.legend.textStyle.color" />
              <a-input v-model:value="config.legend.textStyle.fontSize" style="margin: 0 8px 0 12px">
              </a-input>px
            </div>
          </a-form-item>
          <a-form-item label="图标" v-if="config.legend.show">
            <a-select v-model:value="config.legend.icon" :options="iconOption">
            </a-select>
          </a-form-item>

          <a-form-item label="布局方式" v-if="config.legend.show">
            <a-select v-model:value="config.legend.orient" :options="orientOption">
            </a-select>
          </a-form-item>

          <a-form-item label="X位置" v-if="config.legend.show">
            <a-input v-model:value="config.legend.left"></a-input>
          </a-form-item>
          <a-form-item label="Y位置" v-if="config.legend.show">
            <a-input v-model:value="config.legend.top"></a-input>
          </a-form-item>

          <a-form-item label="是否滚动" v-if="config.legend.show">
            <a-switch v-model:checked="config.legend.scroll"></a-switch>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel header="X轴" v-if="['bar', 'line'].includes(config.series.type)">
          <a-form-item label="显示轴线">
            <a-switch v-model:checked="config.xAxis.axisLine.show"></a-switch>
          </a-form-item>
          <a-form-item label="轴线样式" v-if="config.xAxis.axisLine.show">
            <div class="flex align-center">
              <ColorPicker v-model:pureColor="config.xAxis.axisLine.lineStyle.color" />
              <a-input v-model:value="config.xAxis.axisLine.lineStyle.width" style="margin: 0 8px 0 12px">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item label="显示刻度">
            <a-switch v-model:checked="config.xAxis.axisTick.show"></a-switch>
          </a-form-item>
          <a-form-item label="刻度样式" v-if="config.xAxis.axisTick.show">
            <div class="flex align-center">
              <ColorPicker v-model:pureColor="config.xAxis.axisTick.lineStyle.color" />
              <a-input v-model:value="config.xAxis.axisTick.lineStyle.width" style="margin: 0 8px 0 12px">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item label="显示标签">
            <a-switch v-model:checked="config.xAxis.axisLabel.show"></a-switch>
          </a-form-item>
          <a-form-item label="标签样式" v-if="config.xAxis.axisLabel.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.xAxis.axisLabel.color" />
              <a-input v-model:value="config.xAxis.axisLabel.fontSize" style="margin: 0 8px 0 12px">
              </a-input>px
            </div>
          </a-form-item>
          <a-form-item label="强制显示">
            <a-switch v-model:checked="config.xAxis.axisLabel.interval"></a-switch>
          </a-form-item>
          <a-form-item label="旋转角度">
            <a-input v-model:value="config.xAxis.axisLabel.rotate"></a-input>
          </a-form-item>
          <a-form-item label="分割线">
            <a-switch v-model:checked="config.xAxis.splitLine.show"></a-switch>
          </a-form-item>
          <a-form-item label="分割样式" v-if="config.xAxis.splitLine.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.xAxis.splitLine.lineStyle.color" />
              <a-input v-model:value="config.xAxis.splitLine.lineStyle.width" style="margin: 0 8px 0 12px">
              </a-input>px
            </div>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel header="Y轴" v-if="['bar', 'line'].includes(config.series.type)">
          <a-form-item label="轴名称">
            <a-input v-model:value="config.yAxis.name"></a-input>
          </a-form-item>
          <a-form-item label="名称样式" v-if="config.yAxis.name">
            <div class="flex align-center">
              <ColorPicker v-model:pureColor="config.yAxis.nameTextStyle.color" />
              <a-input v-model:value="config.yAxis.nameTextStyle.fontSize" style="margin: 0 8px 0 12px">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item label="显示轴线">
            <a-switch v-model:checked="config.yAxis.axisLine.show"></a-switch>
          </a-form-item>
          <a-form-item label="轴线样式" v-if="config.yAxis.axisLine.show">
            <div class="flex align-center">
              <ColorPicker v-model:pureColor="config.yAxis.axisLine.lineStyle.color" />
              <a-input v-model:value="config.yAxis.axisLine.lineStyle.width" style="margin: 0 8px 0 12px">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item label="显示刻度">
            <a-switch v-model:checked="config.yAxis.axisTick.show"></a-switch>
          </a-form-item>
          <a-form-item label="刻度样式" v-if="config.yAxis.axisTick.show">
            <div class="flex align-center">
              <ColorPicker v-model:pureColor="config.yAxis.axisTick.lineStyle.color" />
              <a-input v-model:value="config.yAxis.axisTick.lineStyle.width" style="margin: 0 8px 0 12px">
              </a-input>
            </div>
          </a-form-item>
          <a-form-item label="显示标签">
            <a-switch v-model:checked="config.yAxis.axisLabel.show"></a-switch>
          </a-form-item>
          <a-form-item label="标签样式" v-if="config.yAxis.axisLabel.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.yAxis.axisLabel.color" />
              <a-input v-model:value="config.yAxis.axisLabel.fontSize" style="margin: 0 8px 0 12px">
              </a-input>px
            </div>
          </a-form-item>
          <a-form-item label="分割线">
            <a-switch v-model:checked="config.yAxis.splitLine.show"></a-switch>
          </a-form-item>
          <a-form-item label="分割样式" v-if="config.yAxis.splitLine.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.yAxis.splitLine.lineStyle.color" />
              <a-input v-model:value="config.yAxis.splitLine.lineStyle.width" style="margin: 0 8px 0 12px">
              </a-input>px
            </div>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel header="缩放" v-if="['bar', 'line'].includes(config.series.type)">
          <a-form-item label="是否缩放">
            <a-switch v-model:checked="config.dataZoom.show"></a-switch>
          </a-form-item>
          <a-form-item label="缩放类型" v-if="config.dataZoom.show">
            <a-select v-model:value="config.dataZoom.type" :options="zoomOption">
            </a-select>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel header="配置项" v-if="
          ![
            'liquid',
            'gauge',
            'word',
            'radar',
            'tree',
            'scatterMap',
            'date',
            'table',
            'number',
          ].includes(config.series.type)
        ">
          <a-form-item label="方向" v-if="['bar', 'line'].includes(config.series.type)">
            <a-select v-model:value="config.series.orient" :options="directionOption">
            </a-select>
          </a-form-item>
          <a-form-item label="系列名称">
            <a-input v-model:value="config.series.name"></a-input>
          </a-form-item>
          <a-form-item label="柱子宽度" v-if="config.series.type == 'bar'">
            <a-input v-model:value="config.series.barWidth"></a-input>
          </a-form-item>
          <a-form-item label="线条宽度" v-if="config.series.type == 'line'">
            <a-input v-model:value="config.series.lineWidth"></a-input>
          </a-form-item>
          <a-form-item label="渐变颜色" v-if="['bar', 'line'].includes(config.series.type)">
            <a-switch v-model:checked="config.series.gradual"></a-switch>
          </a-form-item>
          <a-form-item label="颜色" v-if="['bar', 'line'].includes(config.series.type)">
            <div class="flex align-center" v-if="config.series.gradual">
              <ColorPicker v-model:pureColor="config.series.gradualColor[0]" />
              <span style="margin: 0 5px">-</span>
              <ColorPicker v-model:pureColor="config.series.gradualColor[1]" />
            </div>
            <ColorPicker v-else v-model:pureColor="config.series.color" />
          </a-form-item>
          <a-form-item label="显示填充" v-if="config.series.type == 'line'">
            <a-switch v-model:checked="config.series.areaStyle.show"></a-switch>
          </a-form-item>
          <a-form-item label="填充样式" v-if="config.series.type == 'line' && config.series.areaStyle.show">
            <div class="flex align-center">
              <ColorPicker v-model:pureColor="config.series.areaStyle.gradualColor[0]" />
              <span style="margin: 0 5px">-</span>
              <ColorPicker v-model:pureColor="config.series.areaStyle.gradualColor[1]" />
            </div>
          </a-form-item>
          <a-form-item label="柱子圆角" v-if="config.series.type == 'bar'">
            <a-input v-model:value="config.series.borderRadius"></a-input>
          </a-form-item>

          <a-form-item label="是否实心" v-if="config.series.type == 'pie'">
            <a-switch v-model:checked="config.series.solid"></a-switch>
          </a-form-item>

          <a-form-item label="半径" v-if="config.series.type == 'pie'">
            <div class="flex align-center" v-if="!config.series.solid">
              <a-input v-model:value="config.series.radius[0]"></a-input>
              <a-input v-model:value="config.series.radius[1]"></a-input>
            </div>
            <a-input v-else v-model:value="config.series.solidRadius"></a-input>
          </a-form-item>

          <a-form-item label="南丁格尔" v-if="config.series.type == 'pie'">
            <a-switch v-model:checked="config.series.roseType"></a-switch>
          </a-form-item>

          <a-form-item label="显示label">
            <a-switch v-model:checked="config.series.label.show"></a-switch>
          </a-form-item>
          <a-form-item label="label样式" v-if="config.series.label.show">
            <div class="flex align-center" style="color: #C1C6C8;">
              <ColorPicker v-model:pureColor="config.series.label.color" />
              <a-input v-model:value="config.series.label.fontSize" style="margin: 0 8px 0 12px"></a-input>
              px
            </div>
          </a-form-item>
          <a-form-item label="label位置" v-if="
            config.series.label.show &&
            !['seriesMap'].includes(config.series.type)
          ">
            <a-select v-model:value="config.series.label.position" :options="positionOption">
            </a-select>
          </a-form-item>
          <a-form-item label="引导线" v-if="config.series.type == 'pie'">
            <a-switch v-model:checked="config.series.labelLine.show"></a-switch>
          </a-form-item>
          <a-form-item label="线长度" v-if="config.series.type == 'pie' && config.series.labelLine.show">
            <div class="flex align-center">
              <a-input v-model:value="config.series.labelLine.length"></a-input>
              <a-input v-model:value="config.series.labelLine.length2"></a-input>
            </div>
          </a-form-item>
          <a-form-item label="平滑显示" v-if="['pie', 'line'].includes(config.series.type)">
            <a-switch v-model:checked="config.series.smooth"></a-switch>
          </a-form-item>
          <a-form-item label="显示图标" v-if="config.series.type == 'line'">
            <a-switch v-model:checked="config.series.showSymbol"></a-switch>
          </a-form-item>
          <a-form-item label="图标大小" v-if="config.series.type == 'line' && config.series.showSymbol">
            <a-input v-model:value="config.series.symbolSize"></a-input>
          </a-form-item>
          <a-form-item label="图标颜色" v-if="config.series.type == 'line' && config.series.showSymbol">
            <ColorPicker v-model:pureColor="config.series.itemStyle.color" />
          </a-form-item>
          <a-form-item label="边框颜色" v-if="config.series.type == 'line' && config.series.showSymbol">
            <ColorPicker v-model:pureColor="config.series.itemStyle.borderColor" />
          </a-form-item>
        </a-collapse-panel>

        <a-form-item label="字体样式" v-if="['date', 'number'].includes(config.series.type)">
          <div class="flex align-center" style="color: #C1C6C8;">
            <ColorPicker v-model:pureColor="config.series.color" />
            <a-input v-model:value="config.series.fontSize" style="margin: 0 8px 0 12px"></a-input>px
          </div>
        </a-form-item>
        <a-form-item label="结束值" v-if="config.series.type == 'number'">
          <a-input v-model:value="config.series.end"></a-input>
        </a-form-item>
        <a-form-item label="小数位" v-if="config.series.type == 'number'">
          <a-input v-model:value="config.series.decimals"></a-input>
        </a-form-item>
        <a-form-item label="前缀" v-if="config.series.type == 'number'">
          <a-input v-model:value="config.series.prefix"></a-input>
        </a-form-item>
        <a-form-item label="后缀" v-if="config.series.type == 'number'">
          <a-input v-model:value="config.series.suffix"></a-input>
        </a-form-item>
        <a-form-item label="动画时长" v-if="config.series.type == 'number'">
          <a-input v-model:value="config.series.duration"></a-input>
        </a-form-item>
        <a-form-item label="对齐方式" v-if="config.series.type == 'table'">
          <a-select v-model:value="config.series.align">
            <a-select-option value="left">居左</a-select-option>
            <a-select-option value="center">居中</a-select-option>
            <a-select-option value="right">居有</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="显示序号" v-if="config.series.type == 'table'">
          <a-switch v-model:checked="config.series.indexShow"></a-switch>
        </a-form-item>
        <a-form-item label="斑马纹" v-if="config.series.type == 'table'">
          <a-switch v-model:checked="config.series.stripe"></a-switch>
        </a-form-item>
        <a-form-item label="主题" v-if="config.series.type == 'table'">
          <a-radio-group v-model:value="config.series.mode">
            <a-radio-button label="dark">黑色</a-radio-button>
            <a-radio-button label="white">白色</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="表数据源" v-if="config.series.type == 'table'">
        </a-form-item>
        <!-- <b-code-editor v-model:value="config.data" theme="material-darker" v-if="config.series.type == 'table'"
          ref="editor" @on-change="
            (val) => {
              $emit('changeSize', 'data', val);
            }
          " /> -->
      </a-collapse>
    </a-form>
  </div>
</template>
<script setup>
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
defineProps({
  config: Object
})
const emit = defineEmits(['changeSize'])
const iconOption = [
  {
    label: "圆形",
    value: "circle",
  },
  {
    label: "矩形",
    value: "rect",
  },
  {
    label: "圆矩形",
    value: "roundRect",
  },
  {
    label: "三角形",
    value: "triangle",
  },
  {
    label: "菱形",
    value: "diamond",
  },
  {
    label: "椭圆形",
    value: "pin",
  },
];
const orientOption = [
  {
    label: "水平",
    value: "horizontal",
  },
  {
    label: "垂直",
    value: "vertical",
  },
];
const directionOption = [
  {
    label: "纵向",
    value: "vertical",
  },
  {
    label: "横向",
    value: "horizontal",
  },
];
const zoomOption = [
  {
    label: "滚动",
    value: "inside",
  },
  {
    label: "拖动",
    value: "slider",
  },
];
const formOption = [
  {
    label: "静态数据",
    value: "static",
  },
  {
    label: "接口数据",
    value: "api",
  },
];
const positionOption = [
  {
    label: "内部",
    value: "inside",
  },
  {
    label: "外部",
    value: "outside",
  },
];
const changeSize = (e, key) => {
  if (e.target.value && !isNaN(e.target.value)) {
    let value = parseFloat(e.target.value)
    emit('changeSize',key,value)
  }
}
</script>
<style lang="less">
.rightSetting {

  .ant-form-item-label>label {
    color: #C1C6C8 !important;
    width: 85px;
    padding: 0 12px 0 0;
    display: flex;
    justify-content: flex-end;
  }

  .ant-input {
    background: transparent !important;
    border: 1px solid #434343 !important;
    color: #c1c6c8 !important;
    height: 28px;
    line-height: 28px;
  }

  .ant-select-selector {
    background: transparent !important;
    border: 1px solid #434343 !important;
    color: #c1c6c8 !important;


  }

  .ant-collapse {
    background: #121212 !important;
    box-sizing: border-box !important;
    border: none;
  }

  .ant-collapse-item {
    border: none;
  }

  .ant-collapse-header {
    color: #c1c6c8 !important;
    flex-direction: row-reverse;
    padding: 12px 0 !important;
    justify-content: space-between;

  }

  .ant-collapse-content {
    background: #1b1b20 !important;
    color: #c1c6c8 !important;
    padding: 0 16px;
    border: none;
  }

  .ant-collapse-content-box {
    padding: 0;
  }
}
</style>

import { debounce } from "@/utils/index.js";
import { ref, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
export function useResize() {
  const myChart = ref(null)
  const resizeHandler = ref(null)
  const initResizeEvent = () => {
    window.addEventListener("resize", resizeHandler.value);
  }
  //移除resize
  const destroyResizeEvent = () => {
    window.removeEventListener("resize", resizeHandler.value);
  }

  //监听resize
  onMounted(() => {
    resizeHandler.value = () => {
      if (myChart.value) {
        myChart.value.resize();
      }
      console.log('=====', myChart.value)
    }
    initResizeEvent();
  })
  onBeforeUnmount(() => {
    destroyResizeEvent();
    if (!myChart.value) {
      return;
    }
    myChart.value.dispose();
    myChart.value.off("click");
    myChart.value = null;
  })
  onActivated(() => {
    initResizeEvent();
    if (myChart.value) {
      myChart.value.resize();
    }
  })
  onDeactivated(() => {
    destroyResizeEvent();
  })

  return { myChart, resizeHandler }
}
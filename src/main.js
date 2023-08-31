import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import App from './App.vue'
import router from './router'
import * as Icons from "@ant-design/icons-vue";
const icons = Icons;

import './assets/styles/common.less'
const app = createApp(App)
// 全局注册图标
for (const i in icons) {
  app.component(i, icons[i]);
}
app.use(createPinia())

app.use(Antd).use(router).mount('#app')

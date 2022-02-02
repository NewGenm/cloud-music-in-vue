import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/toast';
// 按需引入el组件
import './plugin/element-ui.js'

// 引入自定义的icon图标
import 'assets/icon/iconfont.css';

// 引入网络请求
import { request } from 'network/request.js'

// 使用toast组件
Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$request = request
    Vue.prototype.$bus = this
  }
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import mavonEditor from 'mavon-editor'
import router from './router'
import './registerServiceWorker'
import api from './axios/install'
import ElementUI from 'element-ui';
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import './utils/route'
import './style/index.styl';
Vue.use(api);
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios 
Vue.use(ViewUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

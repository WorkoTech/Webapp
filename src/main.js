import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

library.add(faPhone);

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = true

Vue.use(BootstrapVue);
Vue.use(ArgonDashboard);
Vue.use(moment);
Vue.use(VueFilterDateParse);
Vue.use(VueFilterDateFormat);


store.commit('SET_ROUTER', router);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

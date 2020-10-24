import Vue from 'vue'
import Vuex from 'vuex'

import workspace from './modules/workspace'
import document from './modules/document'
import users from './modules/users'
import ui from './modules/ui'
import chat from './modules/chat'
import storage from './modules/storage'
import billing from './modules/billing'
import notifications from './modules/notifications'
import gamification from './modules/gamification'

import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    workspace,
    document,
    users,
    ui,
    chat,
    storage,
    billing,
    notifications,
    gamification
  },
  getters
});

export default store

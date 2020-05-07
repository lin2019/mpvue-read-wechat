import Vue from 'vue'
import App from './read'
import '@/assets/resetCss.scss'
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)

const app = new Vue(App)
app.$mount()

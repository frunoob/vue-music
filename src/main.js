// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import 导入
//import 变量名称（自定义） from '地址或者插件'
//在vue脚手架中，可以省略.js 和 .vue 后缀
//引入核心库
import Vue from 'vue'
//引入主组件
import App from './App'
//引入路由文件
// import router from './router'
//调用路由配置
import router from './router'
//引入全局样式
import './assets/css/reset.css'
// 引入less库
import less from 'less'
/* 全局引入轮播图样式 */
import 'swiper/css/swiper.min.css'
/* 引入全局轮播图js */
import 'swiper/js/swiper.min'
// 全局引入axios库
import axios from 'axios'
/* 挂载引入的axios库到vue原型上 */
Vue.prototype.$axios = axios
Vue.use(less)

//提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', //挂载点
  router , //路由 当key值和value 值相等的时候我们可以省略
  components: { App },//components 组件，可以注册N个组件，App:App，组件的名称可以当作标签名去渲染
  template: '<App/>' //template 模板，template它的优先级要高于html(创建好的那个容器) 
})

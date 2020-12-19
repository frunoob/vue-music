//这里全部是路由的配置
//第一、引入核心库
import Vue from 'vue'
//第二、引入路由插件
import VueRouter from 'vue-router'
//引入要渲染的组件
import Index from '../pages/index.vue'
import Play from '../pages/play.vue'
//引入二级路由
import Recommend from '../views/recommend.vue'
import Rank from '../views/rank.vue'
import Search from '../views/search.vue'
import list from '../pages/list'
import login from '../views/login'
import axiosDemo from '../components/axiosDemo'

//第三步 vue调用这个插件
Vue.use(VueRouter)

console.log(new VueRouter(),'路由配置对象')
//第四步、导出我路由的所有配置
export default new VueRouter({
    //调用路线
    //routes 多条路线
    //router 控制器
    routes:[//配置我的路线
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path:'/recommend',
                    component:Recommend
                },
                {
                    path:'/rank',
                    component:Rank
                },
                {
                    path:'/search',
                    component:Search
                }
            ]
        },
        {
            path:'/play',
            component:Play
        },
        {
            path:'/',
            redirect:'/index'
        },
        {
            path:'/list',
            component:list
        },
        {
            path:'/login',
            component: login
        },
        {
            path:'/axiosDemo',
            component:axiosDemo
        }
    ]
})
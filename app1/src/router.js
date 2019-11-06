import Router from 'vue-router'
import Home from './views/Home.vue'
import Home1 from './views/Home1.vue'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/app1',
            name: 'home',
            component: Home
        },
        {
            path: '/app1/home1',
            name: 'home1',
            component: Home1
        },
    ]
})

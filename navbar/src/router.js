import Router from 'vue-router'
import Home from './views/Home.vue'
import Home1 from './views/Home1.vue'

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home
        // },
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: Home
        // },
        // {
        //     path: '/home1',
        //     name: 'home1',
        //     component: Home1
        // },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginRegis from "../components/LoginRegis";
import homepage from "@/components/homepage";
import Personal from "@/components/Personal"
import Select from "@/components/Select"
import School from "@/components/School"
import Noti from "@/components/Noti"
import Addnotice from "@/components/Addnotice"
import Manager from "@/components/Manager"
import Comment from '@/components/comment'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginRegis,
    },
    {
        path: '/home',
        name: 'Home',
        component: homepage,
    },
    {
        path:'/personal',
        name:'Personal',
        component:Personal,
    },
    {
        path:'/select',
        name:'Select',
        component:Select,
    },
    {
        path:'/school',
        name:'School',
        component:School,
    },
    {
        path:'/noti',
        name:'Noti',
        component:Noti,
    },
    {
        path:'/addnotice',
        name:'Addnotice',
        component:Addnotice,

    },
    {
        path:'/manager',
        name:'Manager',
        component:Manager,
    },
    {
        path:'/comment',
        name:'Comment',
        component:Comment,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router


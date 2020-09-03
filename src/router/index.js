import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";
import CookbookIndex from "@/pages/Cookbook/CookbookIndex.vue";
import CookbookList from "@/pages/Cookbook/CookbookList.vue";
import DynamicComponents from "@/pages/Cookbook/DynamicComponents.vue";
import AsyncComponents from "@/pages/Cookbook/AsyncComponents.vue";
import ManualListen from "@/pages/Cookbook/ManualListen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/cookbook",
        name: "Cookbook",
        component: CookbookIndex,
        redirect:"/cookbook/cookbookList",
        children: [
            {
                path: "/cookbook/cookbookList",
                name: "CookbookList",
                component: CookbookList
            },
            {
                path: "/cookbook/dynamicComponents",
                name: "DynamicComponents",
                component: DynamicComponents
            },
            {
                path: "/cookbook/asyncComponents",
                name: "AsyncComponents",
                component: AsyncComponents
            },
            {
                path: "/cookbook/manualListen",
                name: "ManualListen",
                component: ManualListen
            }
        ]
    },
    {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "about" */ "../pages/About.vue") //异步组件的方式分包加载组件
    }
];

const router = new VueRouter({
    routes
});

export default router;

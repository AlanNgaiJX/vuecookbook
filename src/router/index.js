import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";

import CookbookIndex from "@/pages/Cookbook/CookbookIndex.vue";
import CookbookList from "@/pages/Cookbook/CookbookList.vue";
import DynamicComponents from "@/pages/Cookbook/DynamicComponents.vue";
import AsyncComponents from "@/pages/Cookbook/AsyncComponents.vue";
import ManualListen from "@/pages/Cookbook/ManualListen.vue";
import StaticProb from "@/pages/Cookbook/StaticProb.vue";
import RecursionComponents from "@/pages/Cookbook/RecursionComponents.vue";
import Slot from "@/pages/Cookbook/Slot.vue";
import Transition from "@/pages/Cookbook/Transition.vue";

import HearthIndex from "@/pages/Hearth/HearthIndex.vue";
import HearthList from "@/pages/Hearth/HearthList.vue";
import BubbleZoom from "@/pages/Hearth/BubbleZoom.vue";
import ExamNextTick from "@/pages/Hearth/ExamNextTick.vue";
import GridLayout from "@/pages/Hearth/GridLayout.vue";


import JsApiIndex from "@/pages/JsApi/JsApiIndex.vue";
import JsApiList from "@/pages/JsApi/JsApiList.vue";
import WebAudioApi from "@/pages/JsApi/WebAudioApi.vue";

import ServiceApiIndex from "@/pages/ServiceApi/ServiceApiIndex.vue";
import ServiceApiList from "@/pages/ServiceApi/ServiceApiList.vue";
import YoudaoOcrApi from "@/pages/ServiceApi/YoudaoOcrApi.vue";
import GetExifData from "@/pages/ServiceApi/GetExifData.vue";
import NewGetExifData from "@/pages/ServiceApi/newGetExifData.vue";

import LodashIndex from "@/pages/Lodash/LodashIndex.vue";
import LodashList from "@/pages/Lodash/LodashList.vue";
import Debounce from "@/pages/Lodash/Debounce.vue";

// import 
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
        redirect: "/cookbook/cookbookList",
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
            },
            {
                path: "/cookbook/staticProb",
                name: "StaticProb",
                component: StaticProb
            },
            {
                path: "/cookbook/recursionComponents",
                name: "RecursionComponents",
                component: RecursionComponents
            },
            {
                path: "/cookbook/slot",
                name: "Slot",
                component: Slot
            },
            {
                path: "/cookbook/transition",
                name: "Transition",
                component: Transition
            }
        ]
    },
    {
        path: "/hearth",
        name: "Hearth",
        component: HearthIndex,
        redirect: "/hearth/hearthList",
        children: [
            {
                path: "/hearth/hearthList",
                name: "HearthList",
                component: HearthList
            },
            {
                path: "/hearth/bubbleZoom",
                name: "BubbleZoom",
                component: BubbleZoom
            },
            {
                path: "/hearth/examNextTick",
                name: "ExamNextTick",
                component: ExamNextTick
            },
            {
                path: "/hearth/gridLayout",
                name: "GridLayout",
                component: GridLayout
            }
        ]
    },
    {
        path: "/jsApi",
        name: "JsApi",
        component: JsApiIndex,
        redirect: "/jsApi/jsApiList",
        children: [
            {
                path: "/jsApi/jsApiList",
                name: "JsApiList",
                component: JsApiList
            },
            {
                path: "/jsApi/webAudioApi",
                name: "WebAudioApi",
                component: WebAudioApi
            }
        ]
    },
    {
        path: "/serviceApi",
        name: "ServiceApi",
        component: ServiceApiIndex,
        redirect: "/serviceApi/serviceApiList",
        children: [
            {
                path: "/serviceApi/serviceApiList",
                name: "ServiceApiList",
                component: ServiceApiList
            },
            {
                path: "/serviceApi/youdaoOcrApi",
                name: "YoudaoOcrApi",
                component: YoudaoOcrApi
            },
            {
                path: "/serviceApi/getExifData",
                name: "GetExifData",
                component: GetExifData
            },
            {
                path: "/serviceApi/newGetExifData",
                name: "NewGetExifData",
                component: NewGetExifData
            }
        ]
    },
    {
        path:"/lodash",
        name: "Lodash",
        component: LodashIndex,
        redirect: "/lodash/lodashList",
        children: [
            {
                path: "/lodash/lodashList",
                name: "LodashList",
                component: LodashList
            },
            {
                path: "/lodash/debounce",
                name: "Debounce",
                component: Debounce
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;

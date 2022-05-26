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
import KeepAliveTest from "@/pages/Cookbook/KeepAliveTest.vue";
import NavGuard from "@/pages/Cookbook/NavGuard.vue";
import NavA from "@/components/cookbook/navGuard/navA.vue";
import NavB from "@/components/cookbook/navGuard/navB.vue";
import NavC from "@/components/cookbook/navGuard/navC.vue";

import HearthIndex from "@/pages/Hearth/HearthIndex.vue";
import HearthList from "@/pages/Hearth/HearthList.vue";
import BubbleZoom from "@/pages/Hearth/BubbleZoom.vue";
import ExamNextTick from "@/pages/Hearth/ExamNextTick.vue";
import GridLayout from "@/pages/Hearth/GridLayout.vue";
import WaterProgress from "@/pages/Hearth/WaterProgress.vue";
import Triangle from "@/pages/Hearth/Triangle.vue";
import Scoped from "@/pages/Hearth/Scoped.vue";

import JsApiIndex from "@/pages/JsApi/JsApiIndex.vue";
import JsApiList from "@/pages/JsApi/JsApiList.vue";
import WebAudioApi from "@/pages/JsApi/WebAudioApi.vue";
import GaodeMapApi from "@/pages/JsApi/GaodeMapApi/index.vue";
import BasicMap from "@/pages/JsApi/GaodeMapApi/BasicMap.vue";
import SelectPosition from "@/pages/JsApi/GaodeMapApi/SelectPosition.vue";

import ServiceApiIndex from "@/pages/ServiceApi/ServiceApiIndex.vue";
import ServiceApiList from "@/pages/ServiceApi/ServiceApiList.vue";
import YoudaoOcrApi from "@/pages/ServiceApi/YoudaoOcrApi.vue";
import GetExifData from "@/pages/ServiceApi/GetExifData.vue";
import NewGetExifData from "@/pages/ServiceApi/newGetExifData.vue";
import JuejinSearch from "@/pages/ServiceApi/JuejinSearch.vue";

import LodashIndex from "@/pages/Lodash/LodashIndex.vue";
import LodashList from "@/pages/Lodash/LodashList.vue";
import Debounce from "@/pages/Lodash/Debounce.vue";

import AlgorithmIndex from "@/pages/Algorithm/AlgorithmIndex.vue";
import AlgorithmList from "@/pages/Algorithm/AlgorithmList.vue";
import DFS from "@/pages/Algorithm/DFS.vue";
import BFS from "@/pages/Algorithm/BFS.vue";

import KeepAliveRefreshIndex from "@/pages/keepAliveRefresh/KeepAliveRefreshIndex.vue";

import refreshListHelper from "./refreshListHelper";

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
            },
            {
                path: "/cookbook/keepAliveTest",
                name: "KeepAliveTest",
                component: KeepAliveTest
            },
            {
                path: "/cookbook/navGuard",
                name: "NavGuard",
                component: NavGuard,
                children: [
                    {
                        path: "/cookbook/navGuard/a",
                        name: "a",
                        component: NavA,
                        beforeEnter(to, from, next) {
                            console.log("**** beforeEnter ****");
                            next();
                        }
                    },
                    {
                        path: "/cookbook/navGuard/b",
                        name: "b",
                        component: NavB
                    },
                    {
                        path: "/cookbook/navGuard/c",
                        name: "c",
                        component: NavC
                    }
                ]
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
            },
            {
                path: "/hearth/waterProgress",
                name: "WaterProgress",
                component: WaterProgress
            },
            {
                path: "/hearth/triangle",
                name: "Triangle",
                component: Triangle
            },
            {
                path: "/hearth/scoped",
                name: "Scoped",
                component: Scoped
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
            },
            {
                path: "/jsApi/gaodeMapApi",
                name: "GaodeMapApi",
                component: GaodeMapApi,
                children: [
                    {
                        path: "/jsApi/gaodeMapApi/basicMap",
                        name: "BasicMap",
                        component: BasicMap
                    },
                    {
                        path: "/jsApi/gaodeMapApi/selectPosition",
                        name: "SelectPosition",
                        component: SelectPosition,
                        meta: {
                            noCommonHead: true
                        }
                    }
                ]
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
            },
            {
                path: "/serviceApi/juejinSearch",
                name: "JuejinSearch",
                component: JuejinSearch
            }
        ]
    },
    {
        path: "/lodash",
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
    },
    {
        path: "/algorithm",
        name: "Algorithm",
        component: AlgorithmIndex,
        redirect: "/algorithm/algorithmList",
        children: [
            {
                path: "/algorithm/algorithmList",
                name: "Algorithm",
                component: AlgorithmList
            },
            {
                path: "/algorithm/DFS",
                name: "DFS",
                component: DFS
            },
            {
                path: "/algorithm/BFS",
                name: "BFS",
                component: BFS
            }
        ]
    },
    {
        path: "/keepAliveRefresh",
        name: "KeepAliveRefresh",
        component: KeepAliveRefreshIndex,
        redirect: "/keepAliveRefresh/index",
        children: [
            {
                path: "/keepAliveRefresh/index",
                name: "index",
                component: () => import("../pages/keepAliveRefresh/index.vue")
            },
            {
                path: "/keepAliveRefresh/list",
                name: "list",
                component: () => import("../pages/keepAliveRefresh/list.vue"),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "/keepAliveRefresh/detail",
                name: "detail",
                component: () => import("../pages/keepAliveRefresh/detail.vue")
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

refreshListHelper.install(router);

router.beforeEach((to, from, next) => {
    console.log("**** beforeEach ****");
    next((vm)=>{
        console.log(vm);
        debugger
    });
});

router.beforeResolve((to, from, next) => {
    console.log("**** beforeResolve ****");
    next((vm)=>{
        console.log(vm);
        debugger
    });
});

router.afterEach(() => {
    console.log("**** afterEach ****");
});

export default router;

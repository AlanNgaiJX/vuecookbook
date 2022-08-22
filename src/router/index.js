import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";

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
        path: "/about",
        name: "about",
        component: () => import("../pages/About.vue")
    },
    {
        path: "/cookbook",
        name: "cookbook",
        component: () => import("@/pages/cookbook/index.vue"),
        redirect: "/cookbook/list",
        children: [
            {
                path: "/cookbook/list",
                name: "list",
                component: () => import("@/pages/cookbook/list.vue")
            },
            {
                path: "/cookbook/dynamic_components",
                name: "dynamic_components",
                component: () => import("@/pages/cookbook/dynamic_components/index.vue")
            },
            {
                path: "/cookbook/async_components",
                name: "async_components",
                component: () => import("@/pages/cookbook/async_components/index.vue")
            },
            {
                path: "/cookbook/manual_Listen",
                name: "manual_Listen",
                component: () => import("@/pages/cookbook/manual_Listen/index.vue")
            },
            {
                path: "/cookbook/static_prob",
                name: "static_prob",
                component: () => import("@/pages/cookbook/static_prob/index.vue")
            },
            {
                path: "/cookbook/recursion_components",
                name: "recursion_components",
                component: () => import("@/pages/cookbook/recursion_components/index.vue")
            },
            {
                path: "/cookbook/slot",
                name: "slot",
                component: () => import("@/pages/cookbook/slot/index.vue")
            },
            {
                path: "/cookbook/transition",
                name: "transition",
                component: () => import("@/pages/cookbook/transition/index.vue")
            },
            {
                path: "/cookbook/keep-alive-test",
                name: "keep-alive-test",
                component: () => import("@/pages/cookbook/keep-alive-test/index.vue")
            },
            {
                path: "/cookbook/nav-guard",
                name: "nav-guard",
                component: () => import("@/pages/cookbook/nav-guard/index.vue"),
                children: [
                    {
                        path: "/cookbook/navGuard/a",
                        name: "a",
                        component: () => import("@/pages/cookbook/nav-guard/navA.vue"),
                        beforeEnter(to, from, next) {
                            console.log("**** beforeEnter ****");
                            next();
                        }
                    },
                    {
                        path: "/cookbook/navGuard/a",
                        name: "b",
                        component: () => import("@/pages/cookbook/nav-guard/navB.vue")
                    },
                    {
                        path: "/cookbook/navGuard/a",
                        name: "c",
                        component: () => import("@/pages/cookbook/nav-guard/navC.vue")
                    }
                ]
            }
        ]
    },
    {
        path: "/hearth",
        name: "hearth",
        component: ()=> import("@/pages/hearth/index.vue"),
        redirect: "/hearth/list",
        children: [
            {
                path: "/hearth/list",
                name: "list",
                component: ()=> import("@/pages/hearth/list.vue"),
            },
            {
                path: "/hearth/bubble_zoom",
                name: "bubble_zoom",
                component: ()=> import("@/pages/hearth/bubble_zoom/index.vue"),
            },
            {
                path: "/hearth/exam_next_tick",
                name: "exam_next_tick",
                component: ()=> import("@/pages/hearth/exam_next_tick/index.vue"),
            },
            {
                path: "/hearth/grid_layout",
                name: "grid_layout",
                component: ()=> import("@/pages/hearth/grid_layout/index.vue"),
            },
            {
                path: "/hearth/flexible_grid",
                name: "flexible_grid",
                component: ()=> import("@/pages/hearth/flexible_grid/index.vue"),
            },
            {
                path: "/hearth/water_progress",
                name: "water_progress",
                component: ()=> import("@/pages/hearth/water_progress/index.vue"),
            },
            {
                path: "/hearth/triangle",
                name: "triangle",
                component: ()=> import("@/pages/hearth/triangle/index.vue"),
            },
            {
                path: "/hearth/scoped",
                name: "scoped",
                component: ()=> import("@/pages/hearth/scoped/index.vue"),
            },
            {
                path: "/hearth/pie_chart_css",
                name: "pie_chart_css",
                component: ()=> import("@/pages/hearth/pie_chart_css/index.vue"),
            },
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
                    },
                    {
                        path: "/jsApi/gaodeMapApi/districtMap",
                        name: "DistrictMap",
                        component: () => import("../pages/JsApi/GaodeMapApi/districtMap.vue")
                    },
                    {
                        path: "/jsApi/gaodeMapApi/locaPointMap",
                        name: "LocaPointMap",
                        component: () => import("../pages/JsApi/GaodeMapApi/locaPointMap.vue")
                    },
                    {
                        path: "/jsApi/gaodeMapApi/locaDistrictMap",
                        name: "LocaDistrictMap",
                        component: () => import("../pages/JsApi/GaodeMapApi/locaDistrictMap.vue")
                    },
                    {
                        path: "/jsApi/colorThief",
                        name: "colorThief",
                        component: () => import("../pages/JsApi/ColorThief.vue")
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
    },
    {
        path: "/echart",
        name: "Echart",
        component: () => import("../pages/Echart/index.vue"),
        redirect: "/echart/list",
        children: [
            {
                path: "/echart/index",
                name: "index",
                component: () => import("../pages/Echart/index.vue")
            },
            {
                path: "/echart/list",
                name: "list",
                component: () => import("../pages/Echart/list.vue")
            },
            {
                path: "/echart/map",
                name: "map",
                component: () => import("../pages/Echart/map.vue")
            }
        ]
    },
    {
        path: "/other_demo",
        name: "OtherDemo",
        component: () => import("../pages/other_demo/index.vue"),
        redirect: "/other_demo/list_page",
        children: [
            {
                path: "/other_demo/list_page",
                name: "listPage",
                component: () => import("../pages/other_demo/ListPage.vue")
            },
            {
                path: "/other_demo/poster_make",
                name: "poster_make",
                component: () => import("../pages/other_demo/poster_make/index.vue")
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
    next(vm => {
        console.log(vm);
        debugger;
    });
});

router.beforeResolve((to, from, next) => {
    console.log("**** beforeResolve ****");
    next(vm => {
        console.log(vm);
        debugger;
    });
});

router.afterEach(() => {
    console.log("**** afterEach ****");
});

export default router;

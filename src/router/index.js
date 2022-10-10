import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";
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
                name: "cookbook_list",
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
        component: () => import("@/pages/hearth/index.vue"),
        redirect: "/hearth/list",
        children: [
            {
                path: "/hearth/list",
                name: "hearth_list",
                component: () => import("@/pages/hearth/list.vue")
            },
            {
                path: "/hearth/bubble_zoom",
                name: "bubble_zoom",
                component: () => import("@/pages/hearth/bubble_zoom/index.vue")
            },
            {
                path: "/hearth/exam_next_tick",
                name: "exam_next_tick",
                component: () => import("@/pages/hearth/exam_next_tick/index.vue")
            },
            {
                path: "/hearth/grid_layout",
                name: "grid_layout",
                component: () => import("@/pages/hearth/grid_layout/index.vue")
            },
            {
                path: "/hearth/flexible_grid",
                name: "flexible_grid",
                component: () => import("@/pages/hearth/flexible_grid/index.vue")
            },
            {
                path: "/hearth/water_progress",
                name: "water_progress",
                component: () => import("@/pages/hearth/water_progress/index.vue")
            },
            {
                path: "/hearth/triangle",
                name: "triangle",
                component: () => import("@/pages/hearth/triangle/index.vue")
            },
            {
                path: "/hearth/scoped",
                name: "scoped",
                component: () => import("@/pages/hearth/scoped/index.vue")
            },
            {
                path: "/hearth/pie_chart_css",
                name: "pie_chart_css",
                component: () => import("@/pages/hearth/pie_chart_css/index.vue")
            },
            {
                path: "/hearth/custom_border",
                name: "custom_border",
                component: () => import("@/pages/hearth/custom_border/index.vue")
            },
            {
                path: "/hearth/prevent_mobile_keyboard",
                name: "prevent_mobile_keyboard",
                component: () => import("@/pages/hearth/prevent_mobile_keyboard/index.vue")
            }
        ]
    },
    {
        path: "/js_api",
        name: "js_api",
        component: () => import("@/pages/js_api/index.vue"),
        redirect: "/js_api/list",
        children: [
            {
                path: "/js_api/list",
                name: "js_api_list",
                component: () => import("@/pages/js_api/list.vue")
            },
            {
                path: "/js_api/web_audio_api",
                name: "web_audio_api",
                component: () => import("@/pages/js_api/web_audio_api/index.vue")
            },
            {
                path: "/js_api/gaode_map_api",
                name: "gaode_map_api",
                component: () => import("@/pages/js_api/gaode_map_api/index.vue"),
                children: [
                    {
                        path: "/js_api/gaode_map_api/basicMap",
                        name: "BasicMap",
                        component: () => import("@/pages/js_api/gaode_map_api/BasicMap.vue")
                    },
                    {
                        path: "/js_api/gaode_map_api/selectPosition",
                        name: "selectPosition",
                        component: () => import("@/pages/js_api/gaode_map_api/SelectPosition.vue")
                    },
                    {
                        path: "/js_api/gaode_map_api/districtMap",
                        name: "districtMap",
                        component: () => import("@/pages/js_api/gaode_map_api/districtMap.vue")
                    },
                    {
                        path: "/js_api/gaode_map_api/locaDistrictMap",
                        name: "locaDistrictMap",
                        component: () => import("@/pages/js_api/gaode_map_api/locaDistrictMap.vue")
                    },
                    {
                        path: "/js_api/gaode_map_api/locaPointMap",
                        name: "locaPointMap",
                        component: () => import("@/pages/js_api/gaode_map_api/locaPointMap.vue")
                    }
                ]
            },
            {
                path: "/js_api/colorthief",
                name: "colorthief",
                component: () => import("@/pages/js_api/colorthief/index.vue")
            }
        ]
    },
    {
        path: "/service_api",
        name: "service_api",
        component: () => import("@/pages/service_api/index.vue"),
        redirect: "/service_api/list",
        children: [
            {
                path: "/service_api/list",
                name: "service_api_list",
                component: () => import("@/pages/service_api/list.vue")
            },
            {
                path: "/service_api/youdao_ocr_api",
                name: "youdao_ocr_api",
                component: () => import("@/pages/service_api/youdao_ocr_api/index.vue")
            },
            {
                path: "/service_api/get_exif_data",
                name: "get_exif_data",
                component: () => import("@/pages/service_api/get_exif_data/index.vue")
            },
            {
                path: "/service_api/new_get_exif_data",
                name: "new_get_exif_data",
                component: () => import("@/pages/service_api/new_get_exif_data/index.vue")
            },
            {
                path: "/service_api/juejin_search",
                name: "juejin_search",
                component: () => import("@/pages/service_api/juejin_search/index.vue")
            }
        ]
    },
    {
        path: "/lodash",
        name: "lodash",
        component: () => import("@/pages/lodash/index.vue"),
        redirect: "/lodash/list",
        children: [
            {
                path: "/lodash/list",
                name: "lodash_list",
                component: () => import("@/pages/lodash/list.vue")
            },
            {
                path: "/lodash/debounce",
                name: "debounce",
                component: () => import("@/pages/lodash/debounce/index.vue")
            }
        ]
    },
    {
        path: "/algorithm",
        name: "algorithm",
        component: () => import("@/pages/algorithm/index.vue"),
        redirect: "/algorithm/list",
        children: [
            {
                path: "/algorithm/list",
                name: "algorithm_list",
                component: () => import("@/pages/algorithm/list.vue")
            },
            {
                path: "/algorithm/DFS",
                name: "DFS",
                component: () => import("@/pages/algorithm/DFS/index.vue")
            },
            {
                path: "/algorithm/BFS",
                name: "BFS",
                component: () => import("@/pages/algorithm/BFS/index.vue")
            }
        ]
    },
    {
        path: "/keep_alive_refresh",
        name: "keep_alive_refresh",
        component: () => import("@/pages/keep_alive_refresh/index.vue"),
        redirect: "/keep_alive_refresh/module_index",
        children: [
            {
                path: "/keep_alive_refresh/module_index",
                name: "index",
                component: () => import("../pages/keep_alive_refresh/module_index.vue")
            },
            {
                path: "/keep_alive_refresh/list",
                name: "keep_alive_refresh_list",
                component: () => import("../pages/keep_alive_refresh/list.vue"),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "/keep_alive_refresh/detail",
                name: "detail",
                component: () => import("../pages/keep_alive_refresh/detail.vue")
            }
        ]
    },
    {
        path: "/echart",
        name: "echart",
        component: () => import("../pages/echart/index.vue"),
        redirect: "/echart/list",
        children: [
            {
                path: "/echart/index",
                name: "index",
                component: () => import("../pages/echart/index.vue")
            },
            {
                path: "/echart/list",
                name: "list",
                component: () => import("../pages/echart/list.vue")
            },
            {
                path: "/echart/map",
                name: "map",
                component: () => import("../pages/echart/map/index.vue")
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
    },
    {
        path: "/javascript",
        name: "javascript",
        component: () => import("../pages/javascript/index.vue"),
        redirect: "/javascript/list",
        children: [
            {
                path: "/javascript/list",
                name: "list",
                component: () => import("../pages/javascript/list.vue")
            },
            {
                path: "/javascript/base64_to_file",
                name: "base64_to_file",
                component: () => import("../pages/javascript/base64_to_file.vue")
            },
            {
                path: "/javascript/locale_compare",
                name: "locale_compare",
                component: () => import("../pages/javascript/locale_compare.vue")
            },
            {
                path: "/javascript/intl_segmenter",
                name: "intl_segmenter",
                component: () => import("../pages/javascript/intl_segmenter.vue")
            },
            {
                path: "/javascript/data_view",
                name: "data_view",
                component: () => import("../pages/javascript/data_view.vue")
            },
            {
                path: "/javascript/exif",
                name: "exif",
                component: () => import("../pages/javascript/exif/index.vue")
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

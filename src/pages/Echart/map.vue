<template>
    <div>
        <div id="map" style="width: 1000px;height: 1000px;"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import JiangxiMap from "./mapData/province/jiangxi.json";
import testMap from "./mapData/test.json";
import ProvinceMap from "./test/provinceMap.json";

const option = {
  // tooltip: {
  //   trigger: 'item',
  //   formatter: '{b}'
  // }
}

export default {
    name: "map",
    data() {
        return {
            cityMap: null
        };
    },
    methods: {
        // 返回主视图
        rendHEAD() {
            const mapName = [];
            JiangxiMap.features.forEach(city => {
                // 或许市名称
                mapName.push({
                    name: city.properties.name,
                    value: city.id,
                    zoom: 1
                });
            });
            echarts.registerMap("江西省", ProvinceMap);
            this.renderMap("江西省", mapName);
        },
        // 运行地图
        renderMap(mapName, cityNameList) {
            option.series = [
                {
                    name: mapName,
                    type: "map",
                    mapType: mapName,
                    nameMap: mapName,
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: "#303753",
                                fontSize: 13
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: "#2a8ab3",
                                fontSize: 16
                            }
                        }
                    },
                    data: cityNameList,
                    itemStyle: {
                        normal: {
                            areaColor: "rgb(78, 163, 151)",
                            borderWidth: 2,
                            borderColor: "rgb(34, 195, 170)",
                            label: {
                                show: true,
                                textStyle: {
                                    color: "rgb(0, 152, 217)",
                                    fontSize: 12
                                }
                            }
                        },
                        emphasis: {
                            areaColor: "#0f6471",
                            label: {
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 15
                                }
                            }
                        }
                    }
                }
            ];
            this.cityMap.setOption(option);
        },
        registerMap() {
            console.log("开始注册地图");
            this.rendHEAD();
        }
    },
    mounted() {
        this.cityMap = echarts.init(document.getElementById("map"));
        this.registerMap();
    }
};
</script>

<template>
    <div class="loca-district-map">
        <div id="container" tabindex="0"></div>
        <button id="up-btn" class="button" @click="upLayer">行政区上浮</button>
    </div>
</template>

<script>
import axios from "axios";

let _infoWin;
let _vLayer;
window.go2Adcode = function(event, code) {
    event.stopPropagation();
    _infoWin.close();
    _vLayer.goto(code);
};

export default {
    name: "loca-district-map",
    data() {
        return {
            vLayer: null
        };
    },
    methods: {
        upLayer() {
            this.vLayer.goto(-1);
        },
        go2Adcode(event, code) {
            event.stopPropagation();
            this.infoWin.close();
            this.vLayer.goto(code);
        }
    },
    mounted() {
        var map = new AMap.Map("container", {
            mapStyle: "amap://styles/db9efe6a1745ac24b7269b862f359536",
            viewMode: "3D",
            features: ["bg", "road"],
            // center: [107.4976, 32.1697],
            zoom: 3,
            // zooms: [3, 18]
        });

        var infoWin;

        infoWin = new AMap.InfoWindow({
            closeWhenClickMap: true
            // offset: new AMap.Pixel(0, -100) 偏移
        });

        this.infoWin = _infoWin = infoWin;

        var vLayer = new Loca.DistrictLayer({
            fitView: true,
            eventSupport: true,
            drillDown: false,
            map: map
        });

        this.vLayer = _vLayer = vLayer;

        vLayer.on("click", function(ev) {
            console.log(ev);
            var originalEv = ev.originalEvent;

            var lnglat = map.containerToLngLat(
                new AMap.Pixel(originalEv.clientX, originalEv.clientY)
            );
            var feature = ev.feature;
            var value = ev.value;
            var property = feature.subFeature.properties;

            infoWin.open(map, lnglat);
            var content = [
                "行政区：" + property.name,
                "<br>",
                "数据：" + value,
                "<br>",
                property.childrenNum
                    ? '<button onclick="go2Adcode(event, ' + property.adcode + ')">下钻</button>'
                    : ""
            ];
            infoWin.setContent(content.join(""));
        });

        axios.get("https://alanngai1996.xyz/temp/test1.csv").then(res => {
            vLayer.setData(res.data, {
                type: "csv",
                lnglat: "经纬度",
                value: "省内5A景区数量"
            });
            vLayer.setOptions({
                mode: "count",
                style: {
                    color: [
                        "#0c2c84",
                        "#225ea8",
                        "#225ea8",
                        "#41b6c4",
                        "#7fcdbb",
                        "#c7e9b4",
                        "#ffffcc"
                    ],
                    text: {
                        content: obj => {
                            return obj.value.subFeature.properties.name;
                        }, // 文字内容
                        direction: "center", // 文字方位
                        offset: [10, -10], // 偏移大小
                        fontSize: 16, // 文字大小
                        fillColor: "#E67E22", //文字颜色
                        strokeColor: "rgba(255,255,255,0.85)", // 文字描边颜色
                        strokeWidth: 1 // 文字描边宽度
                    }
                },
                selectStyle: false
            });
            vLayer.render();
        });
    }
};
</script>

<style lang="scss">
.loca-district-map {
    #container {
        height: 100vh;
        width: 100%;
        // margin: 100px;
    }

    .button {
        position: fixed;
        bottom: 0;
        right: 0;
    }
}

.amap-info-content.amap-info-outer {
    background-color: #27272b;
    color: #f0f2ff;
    width: 100px;
}
.bottom-center .amap-info-sharp {
    border-top: 8px solid #27272b;
}
.bottom-center button {
    border: none;
    color: #2181ff;
    float: right;
    background: transparent;
}
.amap-info-close {
    color: #606166;
}
</style>

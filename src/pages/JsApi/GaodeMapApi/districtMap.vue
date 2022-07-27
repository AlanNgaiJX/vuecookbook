<template>
    <div class="district-map">
        <div id="container" class="map" tabindex="0"></div>
    </div>
</template>

<script>
var SOC = "CHN";
var colors = {};
var GDPSpeed = {
    "520000": 10, //贵州
    "540000": 10, //西藏
    "530000": 8.5, //云南
    "500000": 8.5, //重庆
    "360000": 8.5, //江西
    "340000": 8.0, //安徽
    "510000": 7.5, //四川
    "350000": 8.5, //福建
    "430000": 8.0, //湖南
    "420000": 7.5, //湖北
    "410000": 7.5, //河南
    "330000": 7.0, //浙江
    "640000": 7.5, //宁夏
    "650000": 7.0, //新疆
    "440000": 7.0, //广东
    "370000": 7.0, //山东
    "450000": 7.3, //广西
    "630000": 7.0, //青海
    "320000": 7.0, //江苏
    "140000": 6.5, //山西
    "460000": 7, // 海南
    "310000": 6.5, //上海
    "110000": 6.5, // 北京
    "130000": 6.5, // 河北
    "230000": 6, // 黑龙江
    "220000": 6, // 吉林
    "210000": 6.5, //辽宁
    "150000": 6.5, //内蒙古
    "120000": 5, // 天津
    "620000": 6, // 甘肃
    "610000": 8.5, // 甘肃
    "710000": 2.64, //台湾
    "810000": 3.0, //香港
    "820000": 4.7 //澳门
};

export default {
    name: "district-map",
    mounted() {
        var getColorByDGP = function(adcode) {
            if (!colors[adcode]) {
                var gdp = GDPSpeed[adcode];
                if (!gdp) {
                    colors[adcode] = "rgb(227,227,227)";
                } else {
                    var rg = 255 - Math.floor(((gdp - 5) / 5) * 255);
                    colors[adcode] = "rgb(" + rg + "," + rg + ",255)";
                }
            }
            return colors[adcode];
        };

        var disCountry = new AMap.DistrictLayer.Country({
            zIndex: 10,
            SOC: "CHN",
            depth: 2,
            styles: {
                "nation-stroke": "red",
                "province-stroke": "blue",
                "city-stroke": "pink",
                fill: "yellow"
                // "nation-stroke": "#22ffff",
                // "coastline-stroke": [0.85, 0.63, 0.94, 1],
                // "province-stroke": "white",
                // "city-stroke": "rgba(255,255,255,0.15)", //中国特有字段
                // fill: function(props) {
                //     //中国特有字段
                //     return getColorByDGP(props.adcode_pro);
                // }
            }
        });

        this.$nextTick(() => {
            var map = new AMap.Map("container", {
                zooms: [3, 10],
                showIndoorMap: false,
                zoom: 3,
                isHotspot: false,
                defaultCursor: "pointer",
                touchZoomCenter: 1,
                pitch: 0,
                layers: [disCountry, new AMap.TileLayer.Satellite()],
                viewMode: "3D"
            });
            map.addControl(new AMap.Scale());
            map.addControl(new AMap.ToolBar({ liteStyle: true }));
            document.getElementsByClassName("amap-mcode")[0].innerHTML =
                "-GS(2020)617号、GS(2019)756号";

            map.on("click", function(ev) {
                console.log(ev);
                // 触发事件的对象
                var target = ev.target;
                // 触发事件的地理坐标，AMap.LngLat 类型
                var lnglat = ev.lnglat;
                // 触发事件的像素坐标，AMap.Pixel 类型
                var pixel = ev.pixel;
                // 触发事件类型
                var type = ev.type;
            });
        });
    }
};
</script>

<style lang="scss">
.district-map {
    #container {
        width: 100%;
        height: 100vh;
        background-color: rebeccapurple;
    }
}
</style>

<template>
    <div id="BasicMap">
        <div id="container"></div>
        <div class="input-wrap">
        <!-- <input id="input" type="text" /> -->
        <div id="panel"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BasicMap",
    mounted() {
        // 例一：
        // 最基础
        // const map = new AMap.Map('container');

        // 例二：
        // 添加参数
        // var map = new AMap.Map('container', {
        //   zoom:11,//级别
        //   center: [116.397428, 39.90923],//中心点坐标
        //   viewMode:'3D'//使用3D视图
        // });

        // 例三：
        // 增加图层
        // var map = new AMap.Map("container", {
        //     center: [116.397428, 39.90923],
        //     zoom: 13
        // });

        // // 添加实时路况图层
        // var trafficLayer = new AMap.TileLayer.Traffic({
        //     zIndex: 10
        // });
        // map.add(trafficLayer); //添加图层到地图

        // // 添加标记
        // var marker = new AMap.Marker({
        //     position: [116.39, 39.9] //位置
        // });
        // map.add(marker); //添加到地图

        // // 移除标记
        // // map.remove(marker);

        // 例四：
        var map = new AMap.Map("container", {
            zoom: 12,
            center: [116.39, 39.9]
        });

        // 加载单个组件
        // AMap.plugin("AMap.ToolBar", function() {
        //     //异步加载插件
        //     var toolbar = new AMap.ToolBar();
        //     map.addControl(toolbar);
        // });

        // 加载多个组件
        // AMap.plugin(["AMap.ToolBar", "AMap.Driving"], function() {
        //     //异步同时加载多个插件
        //     var toolbar = new AMap.ToolBar();
        //     map.addControl(toolbar);
        //     var driving = new AMap.Driving(); //驾车路线规划
        //     driving.search(/*参数*/);
        // });

        map.plugin(["AMap.PlaceSearch"], function() {
            var PlaceSearchOptions = {
                //设置PlaceSearch属性
                city: "北京", //城市
                type: "", //数据类别
                pageSize: 10, //每页结果数,默认10
                pageIndex: 1, //请求页码，默认1
                extensions: "base", //返回信息详略，默认为base（基本信息）
            };
            var MSearch = new AMap.PlaceSearch(PlaceSearchOptions); //构造PlaceSearch类
            MSearch.on('complete', (status, result)=>{
              console.log(status, result); //返回结果
            })
            MSearch.search("厦门美东"); //关键字查询
        });
    }
};
</script>

<style lang="scss">
#BasicMap {
    #container {
        width: 100%;
        height: 100vh;
        background-color: rebeccapurple;
    }

    .input-wrap{
      position: fixed;
      top: 1rem;
      width: 100%;
      height: .8rem;

    }
}
</style>

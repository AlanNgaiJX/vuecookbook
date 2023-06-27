<template>
  <div class="sticky">
    <div class="scroll-view">
      <div
        v-for="i in 10"
        :key="i"
        :style="{
          'background-color': color()
        }"
        class="rect-a"
      ></div>
    </div>

    <div class="scroll-view">
      <div
        v-for="i in 10"
        :key="i"
        :style="{
          'background-color': color()
        }"
        class="rect-b"
      >
        <h4>
          湖人捧奖杯致敬科比鲁UT4923乘客请检测进博会实行核酸检测丰田c_hr青岛已排查密接132人
        </h4>
        <div>
          http.createServer(function (request, response) {
          console.log(request.url,request.pathname,'---------') //var
          pathname=url.parse(request.url).pathname; var
          pathname=(request.url).slice(1)||"drag.html"; console.log(" 请求 "+pathname+"收到了");
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    color() {
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 16).toString(16);
      }
      return color;
    }
  }
};
</script>

<style lang="scss">
.sticky {
  overflow: scroll;
  .scroll-view {
    width: 300px;
    height: 500px;
    overflow: scroll;
    background-color: pink;
    display: inline-block;
  }

  .rect-a {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    position: sticky;
    top: 10px;
  }

  .rect-b {
    h4 {
      position: sticky;
      background-color: lightseagreen;
      color: #fff;
      padding: 10px;
      top: 0;
    }

    div {
      background-color: lightskyblue;
    }
  }
}
</style>

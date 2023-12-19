<template>
  <div class="infinity">
    <div class="template">
      <li ref="message" class="infinity-item">
        <img class="infinity-avatar" width="48" height="48" />
        <div class="infinity-bubble">
          <p></p>
          <img width="300" height="300" />
          <div class="infinity-meta">
            <time class="infinity-posted-date"></time>
          </div>
        </div>
      </li>
      <li ref="tombstone" class="infinity-item tombstone">
        <img class="infinity-avatar" width="48" height="48" :src="require('./image/unknown.jpg')" />
        <div class="infinity-bubble">
          <p></p>
          <p></p>
          <p></p>
          <div class="infinity-meta">
            <time class="infinity-posted-date"></time>
          </div>
        </div>
      </li>
    </div>
    <div class="pulldown-wrapper">
      <div v-show="beforePullDown">
        <span>Pull Down and load more</span>
      </div>
      <div v-show="!beforePullDown">
        <div v-show="isPullingDown">
          <span>Loading...</span>
        </div>
        <div v-show="!isPullingDown">
          <span>Load success</span>
        </div>
      </div>
    </div>
    <div ref="chat" class="infinity-timeline">
      <ul></ul>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import InfinityScroll from "@better-scroll/infinity";
import message from "./data/message.json";
import PullDown from "@better-scroll/pull-down";

BScroll.use(InfinityScroll);
BScroll.use(PullDown);

const NUM_AVATARS = 4;
const NUM_IMAGES = 77;
const INIT_TIME = new Date().getTime();

function getItem(id) {
  function pickRandom(a) {
    return a[Math.floor(Math.random() * a.length)];
  }

  return new Promise(function(resolve) {
    let item = {
      id: id,
      avatar: Math.floor(Math.random() * NUM_AVATARS),
      self: Math.random() < 0.1,
      image: Math.random() < 1.0 / 20 ? Math.floor(Math.random() * NUM_IMAGES) : "",
      time: new Date(Math.floor(INIT_TIME + id * 20 * 1000 + Math.random() * 20 * 1000)),
      message: pickRandom(message)
    };
    if (item.image === "") {
      resolve(item);
    } else {
      let image = new Image();
      image.src = require(`./image/image${item.image}.jpg`);
      image.addEventListener("load", function() {
        item.image = image;
        resolve(item);
      });
      image.addEventListener("error", function() {
        item.image = "";
        resolve(item);
      });
    }
  });
}

export default {
  name: "infinity",
  data() {
    return {
      scroll: null,
      beforePullDown: true,
      isPullingDown: false
    };
  },
  created() {
    this.nextItem = 0;
    this.pageNum = 0;
  },
  mounted() {
    this.createInfinityScroll();
  },
  methods: {
    createInfinityScroll() {
      this.scroll = new BScroll(this.$refs.chat, {
        infinity: {
          render: (item, div) => {
            div = div || this.$refs.message.cloneNode(true);
            div.dataset.id = item.id;
            div.querySelector(".infinity-avatar").src = require(`./image/avatar${item.avatar}.jpg`);
            div.querySelector(".infinity-bubble p").textContent = item.id + "  " + item.message;
            div.querySelector(
              ".infinity-bubble .infinity-posted-date"
            ).textContent = item.time.toString();

            let img = div.querySelector(".infinity-bubble img");
            if (item.image !== "") {
              img.style.display = "";
              img.src = item.image.src;
              img.width = item.image.width;
              img.height = item.image.height;
            } else {
              img.src = "";
              img.style.display = "none";
            }

            if (item.self) {
              div.classList.add("infinity-from-me");
            } else {
              div.classList.remove("infinity-from-me");
            }
            return div;
          },
          createTombstone: () => {
            return this.$refs.tombstone.cloneNode(true);
          },
          fetch: count => {
            console.log("fetch");
            // Fetch at least 30 or count more objects for display.
            count = Math.max(30, count);
            return new Promise((resolve, reject) => {
              // Assume 50 ms per item.
              setTimeout(() => {
                if (++this.pageNum > 20) {
                  resolve(false);
                } else {
                  console.log("pageNum", this.pageNum);
                  let items = [];
                  for (let i = 0; i < Math.abs(count); i++) {
                    items[i] = getItem(this.nextItem++);
                  }
                  console.log(items);
                  resolve(Promise.all(items));
                }
              }, 500);
            });
          }
        },
        scrollY: true,
        bounceTime: 800,
        useTransition: false,
        pullDownRefresh: {
          threshold: 70,
          stop: 56
        }
      });
      this.scroll.on("scroll", () => {
        // console.log("is scrolling");
      });
      this.scroll.on("scrollEnd", () => {
        // console.log("scrollEnd");
      });

      this.scroll.on("pullingDown", () => {
        console.log("pullingDown");
        this.beforePullDown = false;
        this.isPullingDown = true;

        setTimeout(() => {
          this.isPullingDown = false;
          this.beforePullDown = true;
          this.scroll.refresh();
          this.scroll.finishPullDown();
        }, 1000);
      });
    }
  }
};
</script>

<style lang="scss">
.infinity {
  height: 100%;
  height: 100vh;

  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999;
  }

  .template {
    display: none;
  }

  .infinity-timeline {
    position: relative;
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
    will-change: transform;
    background-color: #efeff5;

    ul {
      position: relative;
      -webkit-backface-visibility: hidden;
      -webkit-transform-style: flat;
    }
  }

  .infinity-item {
    display: flex;
    left: 0;
    padding: 10px 0;
    width: 100%;
    contain: layout;
    will-change: transform;
    list-style: none;

    p {
      margin: 0;
      word-wrap: break-word;
      font-size: 13px;
    }

    .infinity-avatar {
      border-radius: 500px;
      margin-left: 20px;
      margin-right: 6px;
      min-width: 48px;
    }

    .infinity-bubble {
      padding: 7px 10px;
      color: #333;
      background: #fff;
      /*box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);*/
      position: relative;
      max-width: 420px;
      min-width: 80px;
      margin: 0 5px;

      &::before {
        content: "";
        border-style: solid;
        border-width: 0 10px 10px 0;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        top: 0;
        left: -10px;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      .infinity-meta {
        font-size: 0.8rem;
        color: #999;
        margin-top: 3px;

        .infinity-posted-date {
        }
      }
    }
  }

  .infinity-item.tombstone {
    p {
      width: 100%;
      height: 0.5em;
      background-color: #ccc;
      margin: 0.5em 0;
    }
  }
}
</style>

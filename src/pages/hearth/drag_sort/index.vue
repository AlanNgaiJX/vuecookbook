<template>
  <div class="drag-sort">
    <transition-group class="wrap" name="sort">
      <div
        class="item drag-sort-item"
        :class="getItemClass(item)"
        v-for="(item, index) in list"
        :key="index"
        :draggable="true"
        @dragstart="dragstart(item)"
        @dragover="dragover($event, item)"
        @dragend="dragEnd(list)"
      >
        <div>
          {{ item }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "drag-sort",
  data() {
    return {
      command: null, // "unshift" "push"
      dragItem: null,
      hoverItem: null,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  computed: {
    getItemClass() {
      return function(item) {
        if (item === this.hoverItem) {
          if (this.command === "unshift") {
            return "unshift";
          } else if (this.command === "push") {
            return "push";
          }
        } else {
          return "default";
        }
      };
    }
  },
  methods: {
    dragstart(item) {
      this.dragItem = item;
    },
    dragover(e, item) {
      this.hoverItem = item;
      const itemEl = this.closest(e.target, "drag-sort-item");
      const { width, height, pageX, pageY } = this.getElementRectInfo(itemEl);
      const mousePageX = e.pageX;

      if (mousePageX < pageX + width / 2) {
        // 中线左边
        this.command = "unshift";
      } else {
        // 中线右边
        this.command = "push";
      }
    },
    dragEnd(listData) {
      if (this.dragItem !== this.hoverItem) {
        let dragIndex = listData.indexOf(this.dragItem);
        let hoverIndex = listData.indexOf(this.hoverItem);
        let _list = [...listData];

        const dragItem = _list[dragIndex];
        const hoverItem = _list[hoverIndex];
        const head = _list.slice(0, hoverIndex);
        const tail = _list.slice(hoverIndex + 1);

        if (dragIndex < hoverIndex) {
          head.splice(dragIndex, 1);
        } else {
          tail.splice(dragIndex - hoverIndex - 1, 1);
        }

        if (this.command === "unshift") {
          head.push(dragItem);
        } else {
          tail.unshift(dragItem);
        }

        this.list = head.concat([hoverItem], tail);
      }

      this.hoverItem = null;
      this.dragItem = null;
    },
    getElementRectInfo(element) {
      function getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        return actualLeft;
      }
      function getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }

        return actualTop;
      }

      const { width, height, x, y } = element.getBoundingClientRect();

      return {
        width,
        height,
        screenX: x,
        screenY: y,
        pageX: getElementLeft(element),
        pageY: getElementTop(element)
      };
    },
    closest(el, selector) {
      if (el.classList) {
        if (el.classList.contains(selector)) {
          return el;
        } else {
          return this.closest(el.parentNode, selector);
        }
      }
      return null;
    }
  }
};
</script>

<style lang="scss">
.drag-sort {
  .wrap {
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(3, 50px);
    margin: 100px;

    .item {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #333;

      &.unshift {
        border-left: 2px solid red;
      }

      &.push {
        border-right: 2px solid red;
      }
    }
  }
  .sort-move {
    transition: transform 1s;
  }
}
</style>

<template>
    <div id="gridLayout">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <div class="gridWrap">
                <div style="background:blanchedalmond" class="item-1">1</div>
                <div style="background:palegreen">2</div>
                <div style="background:fuchsia">3</div>
                <div style="background:orange">4</div>
                <div style="background:darkgray">5</div>
                <div style="background:burlywood">6</div>
                <div style="background:cadetblue">7</div>
                <div style="background:brown">8</div>
                <div style="background:blue">9</div>

                <!-- <div style="background:brown">10</div>
                <div style="background:blue">11</div>
                <div style="background:burlywood">12</div> -->
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "gridLayout",
    components: {
        FixedScrollView
    }
};
</script>

<style lang="scss">
// 优点：grid提供了一种比flex更高维度的布局，在布局一个列表 或 实现简单的布局，显然flex比较容易理解、高效
//      而面对表单，网状，复杂的布局，仍使用flex布局则会利用很多div和嵌套来完成
//      grid布局可以使用 容器>项目 两层div即可胜任以上的工作

// ### 容器属性：
// grid-template-columns    列宽
// grid-template-rows       行宽

// grid-auto-columns        为所有没有设置到列宽的列，给予一个统一的列宽，默认为元素自己的宽度
// grid-auto-rows           同理，行宽

// column-gap               列间距
// row-gap                  行间距
// gap                      行，列间距

// grid-template-areas      划分区域 'a b c' 'd e f' 'g h i'; 某些区域不用利用则用 . 占位
//                          划分区域影响网格线，和grid-auto-flow的布局

// grid-auto-flow           排列方式：默认row 先行后列, column 先列后行，以对角线 左上 到 右下 对折转换 （有点类似flex-direction）
//                          row desen | column desen

// justify-items 这两个属性都是设置单元格内内容的排列方式，相当于给每个单元格设置 flex justify-content 和 align-items属性,
// align-items   默认值为stretch(拉伸)，其他 start end center
// place-items: <align-items> <justify-items>; 以上两个属性的简写

// justify-content 这两个属性相当于设置整个内容区域在容器里的水平和垂直位置
// align-content
// place-content : <justi> <justify-items>; 以上两个属性的简写

// 简写们:
// grid-template  是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。
// grid           是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。

// ### 项目属性：
// grid-column-start    左边框所在的垂直网格线
// grid-column-end      右边框所在的垂直网格线
// grid-row-start       上边框所在的水平网格线
// grid-row-end         下边框所在的水平网格线
//                                                  除了指定为第几个网格线，还可以指定为网格线的名字。
//                                                  grid-template-areas，指定了格子名，自此有了网线名
//                                                  比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做header-start，终止位置的水平网格线和垂直网格线叫做header-end
// 简写：  grid-column: <start-line> / <end-line>;
//        grid-row: <start-line> / <end-line>;

// grid-area 指定当前块要放在哪个区域, 也可以用作以上两个属性的简写
// grid-area: <row-start> / <column-start> / <row-end> / <column-end>;

// 指定内容块 在单元格内的位置, 与容器属性中的 xx-items表现一致，不过-self只是排版当前内容的
// justify-self
// align-self
// place-self
#gridLayout {
    .gridWrap {
        background-color: black;
        display: grid;

        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px 100px 100px;

        // grid-template-columns: repeat(3,100px);
        // grid-template-rows: repeat(3,100px);

        // grid-template-columns: repeat(3,33.333%);
        // grid-template-rows: repeat(3,100px);

        // grid-template-columns: repeat(3, 1fr);
        // grid-template-rows: repeat(3, 1fr);

        // grid-template-columns: 1fr 1fr 1fr;// fr在column上表现为容器最大宽度的多少等分（如果有某个具体值则先减去，再等分）
        // grid-template-rows: 100px 100px 100px;

        // grid-template-columns: 100px 1fr 2fr;
        // grid-template-rows: 100px 100px 100px;

        // grid-template-columns: 1fr 1fr minmax(50px, 1fr); // 不小于50px ，不大于一等分，缩小和放大查看一下变化
        // grid-template-rows: 50px 50px 50px;

        // grid-column-gap:10px;//百分比, px都行 ， fr不行
        // grid-row-gap:10px;

        // justify-items: stretch; // start center end
        // align-items: stretch;

        // 需要先为grid容器设置一个宽高,且当容器的宽高大于 内容们的宽高总和才看得到效果
        // width: 300px;
        // height: 300px;
        // grid-template-columns: 50px 50px 50px;
        // grid-template-rows: 50px 50px 50px;
        // justify-content: center;
        // align-content: center;
        // 或
        // justify-content: center;

        // grid-auto-flow: column;

        // 需要将模板中的 10、11、12打开才能看到效果
        // grid-auto-rows: 30px;

        grid-template-areas:
            "a b c"
            "d e f"
            "g h i";

        .item-1 {
            // 没有指定row-start row-end 使用当前所在位置即 1 ，2
            // grid-column-start: 2;
            // grid-column-end: 4;

            //利用grid-template-areas划分区域可使用命名 areaName-start来表示网格线，同效果有： 
            // grid-column-start: b-start;
            // grid-column-end: c-end;

            // 同效果有
            // grid-column-start: 2;
            // grid-column-end: span 2;//还可以使用span 2 表示跨越两个网格

            // 将1放到中间
            // grid-area: e;

            // justify-self: center;
        }
    }
}
</style>

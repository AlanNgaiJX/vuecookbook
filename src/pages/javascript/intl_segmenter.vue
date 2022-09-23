<template>
    <div class="intl-segmenter">
        {{ zhCut() }}
    </div>
</template>

<script>
export default {
    name: "intl-segmenter",
    methods: {
        zhCut(str = "坚守三条控制线 服务高质量发展") {
            const segmenterZh = new Intl.Segmenter("zh", { granularity: "word" }); //  granularity: "grapheme" 默认单字 | "word" 词语 | "sentence" 句子
            const result = segmenterZh.segment(str);
            console.table(Array.from(result));
            return Array.from(result);
        }
    },
    mounted() {
        this.zhCut();
    }
};
</script>

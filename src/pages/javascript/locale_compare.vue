<!--
  string.localeCompare的应用（文字拼音排序）
  参考 : https://www.cnblogs.com/goloving/p/7662676.html
        https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
-->
<template>
    <div class="locale-compare">
        <!-- 例一 -->
        <div>
            <h1>例二：根据首字拼音归类词语排序</h1>
            <p>[ "白鸽", "麻雀", "黑", "大象", "狗", "猫", "妈妈", "马", "鸡", "瘦", "胖" ]</p>
            <p>{{ result1 }}</p>
        </div>
        <div style="margin: 100px;"></div>
        <!-- 例二 -->
        <div>
            <h1>例二：根据首字拼音归类词语并排序</h1>
            <p>[ "白鸽", "麻雀", "黑", "大象", "狗", "猫", "妈妈", "马", "鸡", "瘦", "胖" ]</p>
            <p>{{ result2 }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "locale-compare",
    computed: {
        result1() {
            return ["白鸽", "麻雀", "黑", "大象", "狗", "猫", "妈妈", "马", "鸡", "瘦", "胖"].sort(
                (a, b) => {
                    return a.localeCompare(b, "zh");
                }
            );
        },
        result2() {
            return JSON.stringify(
                this.pySortTextArray([
                    "白鸽",
                    "麻雀",
                    "黑",
                    "大象",
                    "狗",
                    "猫",
                    "妈妈",
                    "马",
                    "鸡",
                    "瘦",
                    "胖"
                ]),
                null,
                4
            );
        }
    },
    methods: {
        /**
         * 根据首字拼音归类词语并排序
         * @param  {array} textArr - 词语列表，eg. ["白鸽","麻雀","黑"]
         * @param  {boolean} allowEmpty - 结果是否返回有空结果的字母项
         * @return {array} - eg. [{letter: 'a', data: ['安宁', '啊这']},...]
         */
        pySortTextArray(textArr, allowEmpty) {
            if (!String.prototype.localeCompare) return null;

            const letters = "*abcdefghjklmnopqrstwxyz".split("");
            const zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");

            const result = [];
            let curr;
            letters.forEach((letter, index) => {
                curr = { letter, data: [] }; // 从 a 遍历到 z

                textArr.forEach(text => {
                    // 遍历每个输入的字词
                    // 当 letter 为 a 时，对比 '阿' 和 '八'，如果 text 排在 '阿' 的后面(或中)，且排在 '八'的前面，则 true
                    // 当 letter 为 b 时，对比 '八' 和 '嚓'，如果 text 排在 '八' 的后面(或中)，且排在 '嚓'的前面，则 true
                    // 有 '安'.localeCompare('八')  -1
                    // 有 '安'.localeCompare('阿')  1
                    // 有 '阿'.localeCompare('阿')  0

                    if (
                        (!zh[index - 1] || zh[index - 1].localeCompare(text, "zh") <= 0) &&
                        text.localeCompare(zh[index], "zh") == -1
                    ) {
                        curr.data.push(text);
                    }
                });

                if (allowEmpty || curr.data.length) {
                    // 需要全部字典时 || 有命中值时
                    result.push(curr);
                    curr.data.sort(function(a, b) {
                        // 二次排序
                        return a.localeCompare(b, "zh");
                    });
                }
            });
            return result;
        }
    },
    mounted() {}
};
</script>

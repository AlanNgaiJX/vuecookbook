<template>
    <div>
        <list-menu
            title="javascript"
            :list="[
                {
                    path: '/javascript/base64_to_file',
                    name: '二进制处理，base64转文件'
                },
                {
                    path: '/javascript/locale_compare',
                    name: 'string.localeCompare的应用（文字拼音排序）'
                },
                {
                    path: '/javascript/intl_segmenter',
                    name: 'js原生中文分词'
                },
                {
                    path: '/javascript/exif',
                    name: '手写Exif'
                },
                {
                    path: '/javascript/image_trans',
                    name: 'image转换大全'
                },
                {
                    path: '/javascript/dispatch_event',
                    name: '自定义点击事件'
                },
                {
                    path: '/javascript/transparent_canvas',
                    name: 'canvas抠图'
                },
            ]"
        />
    </div>
</template>

<script>
import ListMenu from "@/components/common/ListMenu.vue";

export default {
    name: "list",
    components: {
        ListMenu
    }
};
</script>

<template>
    <div>
        <list-menu
            title="javascript"
            :list="[
                {
                    path: 'base64_to_file',
                    name: '二进制处理，base64转文件'
                }
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

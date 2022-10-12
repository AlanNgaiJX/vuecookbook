<template>
    <div class="dispatch_event">
        <button @click="planA">方案一</button>
        <button @click="planB">方案二</button>
        <input type="file" id="fileInput" @change="handleFileSelect" v-show="false" />
    </div>
</template>

<script>
export default {
    name: "dispatch_event",
    methods: {
        planA() {
            const inputEl = document.getElementById("fileInput");
            const clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            clickEvent.stopPropagation;
            inputEl.dispatchEvent(clickEvent);
        },
        planB() {
            const inputEl = document.getElementById("fileInput");
            const clickEvent = new MouseEvent("click", {
                bubbles: false
            });
            inputEl.dispatchEvent(clickEvent);
        },
        handleFileSelect(e) {
            console.log(e.target.files);
            e.target.value = null;
        }
    }
};
</script>

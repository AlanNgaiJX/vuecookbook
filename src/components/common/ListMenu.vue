<template>
    <div class="list-menu">
        <h1 class="bigTitle">{{ title }}</h1>
        <ul class="list">
            <li v-for="(item, index) in list" :key="index" @click="routeTo(item.path)">
                <span v-text="index + 1 + '.'" class="num"></span
                ><span class="name" v-text="item.name"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "list-menu",
    props: {
        title: {
            type: String,
            default: "Title"
        },
        list: {
            type: Array,
            require: true
            // [{name, path}]
        }
    },
    methods: {
        routeTo(path) {
            this.$router.push({
                path
            });
        }
    }
};
</script>

<style lang="scss">
.list-menu {
    display: flex;
    justify-content: center;
    padding-top: 60px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    .bigTitle {
        margin-bottom: 30px;
        font-size: 20px;
    }

    .list {
        font-size: 16px;
        width: 300px;

        li {
            color: #ffffff;
            background-color: blue;
            margin-top: 10px;
            padding: 10px;
            box-sizing: border-box;
            cursor: pointer;

            .num {
                margin-right: 20px;
            }

            .name {
                font-weight: bold;
            }
        }
    }
}
</style>

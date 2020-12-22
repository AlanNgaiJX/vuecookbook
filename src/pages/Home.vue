<template>
    <div id="home">
        <h1 class="bigTitle">Home</h1>
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
    name: "Home",
    data() {
        return {
            list: [
                {
                    name: "Cookbook",
                    path: "/cookbook"
                },
                {
                    name: "Hearth",
                    path: "/hearth"
                },
                {
                    name: "JsApi",
                    path: "/jsApi"
                },
                {
                    name: "ServiceApi",
                    path: "/serviceApi"
                },
                {
                    name: "Lodash",
                    path: "/lodash"
                }
            ]
        };
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

<style lang="scss" scoped>
#home {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    .bigTitle {
        margin-bottom: 0.8rem;
    }

    .list {
        font-size: 0.32rem;
        width: 3rem;

        li {
            color: #ffffff;
            background-color: blue;
            margin-top: 0.1rem;
            padding: 0.1rem;
            box-sizing: border-box;
            cursor: pointer;

            .num {
                margin-right: 0.2rem;
            }

            .name {
                font-weight: bold;
            }
        }
    }
}
</style>

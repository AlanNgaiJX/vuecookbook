<template>
    <div id="navHead">
        <div class="btn-group">
            <div class="btn btn-back" @click="$router.go(-1)"></div>
            <div class="btn btn-home" @click="routeTo('/')"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "navHead",
    methods:{
        routeTo(path){
            this.$router.push({
                path
            })
        }
    }
};
</script>

<style lang="scss" scoped>
#navHead {
    width: 100%;
    height: 0.8rem;
    box-shadow: 0.02rem 0.02rem 0.16rem 0.02rem rgba(212, 212, 212, 0.5);
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    position: fixed;
    z-index: 2;

    .btn-group {
        display: flex;

        .btn {
            cursor: pointer;
            width: 0.65rem;
            height: 0.65rem;
            background-position: center;
            background-size: 60%;
            background-repeat: no-repeat;
        }

        .btn-back {
            background-image: url(~@/assets/image/icon/back.png);
        }

        .btn-home {
            background-image: url(~@/assets/image/icon/home.png);
            margin-left: .3rem;
        }
    }
}
</style>

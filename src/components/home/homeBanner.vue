<template>
    <div class="home-banner" @click="onClick">
        <div 
            class="bg-img"
            :style="{backgroundImage: bgImage}">
            <div class="title">{{title}}</div>
            <div class="sub-title">{{subTitle}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        subTitle: String,
        img: String
    },
    methods: {
        onClick () {
            this.$emit('onClick')
        }
    },
    computed: {
        bgImage () {
            return 'url(' + this.img + ')'
        }
    }
}
</script>

<style lang="scss" scoped>
.home-banner{
    margin: 20px 20px 0 20px;
    .bg-img{
        height: 125px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            color: #fff;
            font-size: 18px;
            font-weight: 500;
        }
        .sub-title{
            padding: 5px 15px;
            background: #4585ff;
            border: 1px solid #ccc;
            border-radius: 50px;
            margin-top: 10px;
            color: #fff;
            font-size: 14px;
        }
    }
}
</style>
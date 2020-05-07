<template>
    <div class="search-item-wrapper" @click="onClick">
        <div class="search-item-icon">
            <div class="icon-wrapper">
                <van-icon 
                    :name="icon" 
                    color="rgba(0,0,0,.5)"
                    :style="{lineHeight: 0}">
                </van-icon>
            </div>
        </div>
        <div class="search-item-info">
            <div class="search-item-title">{{title}}</div>
            <div class="search-item-sub-item">{{subTitle}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        subTitle: String,
        icon: String
    },
    methods: {
        onClick () {
            this.$emit('onClick')
        }
    }
}
</script>

<style lang="scss" scoped>
.search-item-wrapper{
    display: flex;
    align-items: center;
    height: 36.5px;
    padding: 15px;
    .search-item-icon{
        .icon-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #F7F7F9;
        }
    }
    .search-item-info{
        width: 80%;
        margin-left: 10px;
        .search-item-title{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            font-size: 14px;
            line-height: 20px;
        }
        .search-item-sub-item{
            color: rgba(0,0,0,.45);
            font-size: 12px;
            line-height: 16.5px;
        }
    }
}
</style>
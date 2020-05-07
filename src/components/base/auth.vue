<template>
    <div class="auth-wrapper">
        <div class="auth-inner-wrapper">
            <div class="auth-info-wrapper">
                <div class="auth-img">
                    <imageView 
                        round
                        src="https://www.youbaobao.xyz/mpvue-res/logo.jpg" />
                </div>
                <div class="auth-title">登录小慕读书</div>
                <div class="auth-sub-title">全场好书免费读</div>
            </div>
            <button
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                class="auth-btn">授权登录</button>
        </div>
    </div>
</template>

<script>
import imageView from './imageView'
export default {
    components: {
        imageView
    },
    methods: {
        getUserInfo () {
            this.$emit('getUserInfo')
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    background: #999999;
    z-index: 1000;
    .auth-inner-wrapper{
        position: relative;
        width: 270px;
        height: 248px;
        background: #f5f5f5;
        border-radius: 18px;
        .auth-info-wrapper{
            display: flex;
            position: relative;
            flex-direction: column;
            align-items: center;
            margin-top: 22.5px;
            .auth-img{
                width: 74px;
                height: 74px;
            }
            .auth-title{
                font-size: 13px;
                color: #999;
                line-height: 18.5px;
                margin-top: 18px;
            }
            .auth-sub-title{
                font-size: 16px;
                color: #333;
                line-height: 22.5px;
                font-weight: 400;
                margin-top: 3.5px;
            }
        }
        .auth-btn{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 49px;
            line-height: 49px;
            font-size: 15px;
            color: #fff;
            background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
            border-radius: 0 0 18px 18px;
        }
    }
}
</style>

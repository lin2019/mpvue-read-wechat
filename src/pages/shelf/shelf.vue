<template>
    <div>
        <shelfUserInfo
        :userInfo="userInfo"
        :readDay="readDay"
        :num="shelfList.length - 1" />
    <shelfList 
        :shelfList="shelfList" />
    </div>
</template>

<script>
import shelfUserInfo from '../../components/shelf/shelfUserInfo'
import shelfList from '../../components/shelf/shelfList'
import {getUserDay, getBookShelf} from '../../api/service'
import {getStorageSync} from '../../api/wechat'
export default {
    components: {
        shelfUserInfo,
        shelfList
    },
    data () {
        return {
            userInfo: {},
            readDay: 0,
            shelfList: [{}]
        }
    },
    onShow () {
        this.userInfo = getStorageSync('userInfo')
        const openId = getStorageSync('openId')
        getUserDay({openId}).then(res => {
            this.readDay = res.data.data.day
        })
        getBookShelf({openId}).then(res => {
            this.shelfList = res.data.data
            this.shelfList.push({})
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
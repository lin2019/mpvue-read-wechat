<template>
    <div>
        <searchTable
            :data="data" />
    </div>
</template>

<script>
import searchTable from '../../components/search/searchTable'
import {getBookList} from '../../api/service'
import {setNavigationBarTitle, showToast} from '../../api/wechat'
export default {
    components: {
        searchTable
    },
    data () {
        return {
            data: [],
            page: 1
        }
    },
    methods: {
        getSearchList () {
            const {text, key} = this.$route.query
            const params = {}
            if (key && text) {
                params[key] = text
            }
            params.page = this.page
            getBookList(params).then(res => {
                const {data} = res.data
                if (data.length > 0) {
                    this.data.push(...data)
                } else {
                    showToast('没有更多数据了')
                }
            })
        }
    },
    mounted () {
        this.page = 1
        this.getSearchList()
        const {title} = this.$route.query
        setNavigationBarTitle(title)
    },
    onReachBottom () {
        this.page++
        this.getSearchList()
    }
}
</script>

<style lang="scss" scoped>

</style>
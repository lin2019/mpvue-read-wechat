<template>
    <div>
        <searchBar
            ref="searchBar"
            :focus="searchFocus"
            :hotSearch="hotSearchKeyWord"
            @onChange="onChange"
            @onClick="onClear"
            @onConfirm="onConfirm" />
        <tagGroup
            :value="hotSearchArray"
            headerText="热门搜索"
            btnText="换一批"
            @onTagClick="showBookDetail"
            @onBtnClick="changeHotSearch" 
            v-if="hotSearchArray.length > 0 && !showList" />
        <tagGroup
            :value="historySearch"
            headerText="历史搜索"
            btnText="清空"
            @onTagClick="searchKeyWord"
            @onBtnClick="clearHistorySearch"
            v-if="historySearch.length > 0 && !showList" />
        <searchList 
           :data="searchList"
           v-if="showList" />
    </div>
</template>

<script>
import searchBar from '../../components/home/searchBar'
import tagGroup from '../../components/base/tagGroup'
import searchList from '../../components/search/searchList'
import {search, hotSearch} from '../../api/service'
import {getStorageSync, setStorageSync, showToast} from '../../api/wechat'
const KEY_HISTORY_WORD = 'historySearch'
export default {
    components: {
        tagGroup,
        searchList,
        searchBar
    },
    data () {
        return {
            hotSearch: [],
            hotSearchKeyWord: '',
            historySearch: [],
            searchList: {},
            searchFocus: true,
            openId: '',
            page: 1,
            hotSearchKey: []
        }
    },
    computed: {
        showList () {
            const key = Object.keys(this.searchList)
            return key.length > 0
        },
        hotSearchArray () {
            const _hotSearch = []
            this.hotSearchKey = []
            this.hotSearch.forEach(item => {
                _hotSearch.push(item.title)
                this.hotSearchKey.push(item.fileName)
            })
            return _hotSearch
        }
    },
    methods: {
        changeHotSearch (text, index) {
            hotSearch().then(res => {
                this.hotSearch = res.data.data
            })
        },
        showBookDetail (keyword, index) {
            const fileName = this.hotSearch[index].fileName
            this.$router.push({ path: '/pages/detail/main', query: { fileName } })
        },
        searchKeyWord (text) {
            this.$refs.searchBar.setValue(text)
            this.onSearch(text)
        },
        clearHistorySearch () {
            this.historySearch = []
            setStorageSync(KEY_HISTORY_WORD, [])
        },
        onChange (keyword) {
            if (!keyword || keyword.trim().length === 0) {
                this.searchList = {}
                return
            }
            this.page = 1
            this.onSearch(keyword)
        },
        onSearch (keyword) {
            search({
                keyword,
                openId: this.openId,
                page: this.page}).then(res => {
                this.searchList = res.data.data
            })
        },
        onClear () {
            this.searchList = {}
        },
        onConfirm (keyword) {
            if (!keyword || keyword.trim().length === 0) {
                keyword = this.hotSearchKeyWord
                this.$refs.searchBar.setValue(keyword)
            }
            this.onSearch(keyword)
            if (!this.historySearch.includes(keyword)) {
                this.historySearch.push(keyword)
                setStorageSync(KEY_HISTORY_WORD, this.historySearch)
            }
            this.searchFocus = false
        }
    },
    mounted () {
        this.page = 1
        this.openId = getStorageSync('openId')
        this.hotSearchKeyWord = this.$route.query.hotSearch
        hotSearch().then(res => {
            this.hotSearch = res.data.data
        })
        this.historySearch = getStorageSync(KEY_HISTORY_WORD) || []
    },
    onPageScroll () {
        if (this.searchFocus) {
            this.searchFocus = false
        }
    },
    onReachBottom () {
        if (this.showList) {
            this.page++
            const keyword = this.$refs.searchBar.getValue()
            search({
                keyword,
                openId: this.openId,
                page: this.page
            }).then(res => {
                const book = res.data.data
                if (book && book.length > 0) {
                    this.searchList.book.push(...book)
                } else {
                    showToast('没有更多数据了')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

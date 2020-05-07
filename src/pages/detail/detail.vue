<template>
    <div>
        <detailBook
            :book="book" />
        <detailStat 
            :readers="book.readers"
            :readerNum="book.readerNum"
            :rankNum="rankNum"
            :rankAvg="book.rankAvg" />
        <detailRate 
            :rateValue="book.rateValue"
            @onRateChange="onRateChange" />
        <detailContents 
            :contents="contents"
            @readBook="readBook" />
        <!-- <detailBottom 
            :isInShelf="isInShelf"
            @handleShelf="handleToShelf"
            @readBook="onReadBook" /> -->
        <div class="detail-bottom">
            <div class="detail-btn-wrapper">
                <van-button
                    :custom-class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
                    round
                    @click="handleShelf"
                >
                    {{isInShelf ? '移出书架' : '加入书架'}}
                </van-button>
            </div>
            <div class="detail-btn-wrapper">
                <van-button
                    custom-class="detail-btn-read"
                    round
                    @click="() => readBook()"
                >
                    阅读
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import detailBook from '../../components/detail/detailBook'
import detailStat from '../../components/detail/detailStat'
import detailRate from '../../components/detail/detailRate'
import detailContents from '../../components/detail/detailContents'
import detailBottom from '../../components/detail/detailBottom'
import {getBookDetail, getBookRate, getBookShelf, addBookShelf, removeBook, getBookContent} from '../../api/service'
import {getStorageSync} from '../../api/wechat'
export default {
    components: {
        detailBook,
        detailStat,
        detailRate,
        detailContents,
        detailBottom
    },
    data () {
        return {
            book: {},
            contents: [],
            isInShelf: false
        }
    },
    methods: {
        onRateChange (value) {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            getBookRate({openId, fileName, rank: value}).then(() => {
                this.getBook()
            })
        },
        getBook () {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            if (openId && fileName) {
                getBookDetail({openId, fileName}).then(res => {
                    this.book = res.data.data
                })
            }
        },
        getBookShelf () {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            if (openId && fileName) {
                getBookShelf({openId, fileName}).then(res => {
                    const {data} = res.data
                    data.length === 0 ? this.isInShelf = false : this.isInShelf = true
                })
            }
        },
        handleShelf () {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            if (!this.isInShelf) {
                addBookShelf({openId, fileName}).then(this.getBookShelf)
            } else {
                const _this = this
                mpvue.showModal({
                    title: '提示',
                    content: `是否确认将《${this.book.title}》移出书架`,
                    success (res) {
                        if (res.confirm) {
                            removeBook({openId, fileName}).then(_this.getBookShelf)
                        }
                    }
                })
            }
        },
        readBook (url) {
            const query = {
                fileName: this.book.fileName,
                opf: this.book.opf
            }
            if (url) {
                const index = url.indexOf('/')
                if (index >= 0) {
                    query.navigation = url.slice(index + 1)
                } else {
                    query.navigation = url
                }
            }
            if (this.book && this.book.fileName) {
                this.$router.push({
                    path: '/pages/read/main',
                    query
                })
            }
        },
        getContents () {
            const {fileName} = this.$route.query
            getBookContent({fileName}).then(res => {
                this.contents = null
                this.contents = res.data.data
                this.$forceUpdate()
            })
        }
    },
    mounted () {
        this.getBook()
        this.getBookShelf()
        this.getContents()
        console.log(this, this.$root.$mp.query)
    },
    onUnload () {
        this.contents = []
    }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss" scoped>
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);
    z-index: 100 !important;
    .detail-btn-wrapper {
      flex: 1;
    }
  }
</style>

<style lang="scss">
  .detail-bottom {
    .detail-btn-read {
      width: 100%;
      border: none;
      color: #fff;
      background: #1EA3F5;
      margin-left: 7.5px;
    }

    .detail-btn-shelf {
      width: 100%;
      color: #1EA3F5;
      background: #fff;
      border: 1px solid #1EA3F5;
      margin-right: 7.5px;
    }

    .detail-btn-remove {
      width: 100%;
      color: #F96128;
      background: rgba(255, 175, 155, .3);
      border: 1px solid #FFAF9B;
      margin-right: 7.5px;
    }
  }
</style>
<template>
    <div>
        <div class="home" v-if="isAuth">
            <searchBar 
                    disabled
                    :hotSearch="hotSearch"
                    @onClick="onSearchBarClick" />
            <homeCard 
                :data="homeCard"
                @onClick="onBookClick" />
            <homeBanner 
                    title="mpvue2.0" 
                    subTitle="立即体验" 
                    img="http://www.youbaobao.xyz/book/res/bg.jpg"
                    @onClick="onBannerClick" />
            <div
                :style="{marginTop: '23px'}">
                <homeBook 
                    title="为你推荐" 
                    :row="1"
                    :col="3"
                    :data="recommend"
                    mode="col"
                    btn-text="换一批"
                    @onBookClick="onBookClick"
                    @onMoreClick="onBookChange('recommend')" />
            </div>
            <div
                :style="{marginTop: '23px'}">
                <homeBook 
                    title="免费阅读" 
                    :row="2"
                    :col="2"
                    :data="freeRead"
                    mode="row"
                    btn-text="换一批"
                    @onBookClick="onBookClick"
                    @onMoreClick="onBookChange('freeRead')" />
            </div>
            <div
                :style="{marginTop: '23px'}">
                <homeBook 
                    title="当前最热" 
                    :row="1"
                    :col="4"
                    :data="hotBook"
                    mode="col"
                    btn-text="换一批"
                    @onBookClick="onBookClick"
                    @onMoreClick="onBookChange('hotBook')" />
            </div>
            <div
                :style="{marginTop: '23px'}">
                <homeBook 
                    title="分类" 
                    :row="3"
                    :col="2"
                    :data="category"
                    mode="category"
                    btn-text="全部"
                    @onBookClick="onCategoryClick"
                    @onMoreClick="onMoreClick" />
            </div>
        </div>
        <auth v-else @getUserInfo="init" />
    </div>
</template>

<script>
/* eslint-disable */
import searchBar from '../../components/home/searchBar'
import homeCard from '../../components/home/homeCard'
import homeBanner from '../../components/home/homeBanner'
import homeBook from '../../components/home/homeBook'
import auth from '../../components/base/auth'
import {getHomeData, getRecommend, getFreeRead, getHotBook} from '../../api/service'
import {getSetting, getUserInfo, setStorageSync, getStorageSync, getOpenUserId, showLoading, hideLoading} from '@/api/wechat'
export default{
    components: {
        searchBar,
        homeCard,
        homeBanner,
        homeBook,
        auth
    },
    data () {
        return {
            hotSearch: '',
            banner: {},
            recommend: [],
            freeRead: [],
            category: [],
            hotBook: [],
            homeCard: {},
            isAuth: true
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        getHomeDate (openId, userInfo) {
            getHomeData(openId).then((res) => {
                const {
                    data: {
                        hotSearch: {
                            keyword
                        },
                        banner,
                        recommend,
                        freeRead,
                        category,
                        hotBook,
                        shelfCount,
                        shelf
                    }
                } = res.data
                this.hotSearch = keyword
                this.banner = banner
                this.recommend = recommend
                this.freeRead = freeRead
                this.category = category
                this.hotBook = hotBook
                this.homeCard = {
                    bookList: shelf,
                    num: shelfCount,
                    userInfo
                }
                hideLoading()
            }).catch((err) => {
                hideLoading()
            })
        },
        onBookChange (key) {
            switch (key) {
                case 'recommend':
                    getRecommend().then((res) => {
                        this.recommend = res.data.data
                    })
                    break;
                case 'freeRead':
                    getFreeRead().then((res) => {
                        this.freeRead = res.data.data
                    })
                    break;
                case 'hotBook':
                    getHotBook().then((res) => {
                        this.hotBook = res.data.data
                    })
                    break;
                default:
                    break;
            }
        },
        onSearchBarClick () {
            this.$router.push({
                path: '/pages/search/main',
                query: {
                    hotSearch: this.hotSearch
                }
            })
        },
        onBannerClick () {
            console.log('banner点击事件')
        },
        onBookClick (book) {
            this.$router.push({
                path: '/pages/detail/main',
                query: {
                    fileName: book.fileName
                }
            })
        },
        onMoreClick () {
            this.$router.push({
                path: '/pages/categoryList/main'
            })
        },
        getSetting () {
            getSetting ('userInfo',
                (res) => {
                    this.isAuth = true
                    showLoading('正在加载')
                    this.getUserInfo()
                },
                (error) => {
                    this.isAuth = false
                })
        },
        getUserInfo () {
            const onOpenIdComplete = (openId, userInfo) => {
                this.getHomeDate(openId, userInfo)
                // getRegister(openId, userInfo)
            }
            getUserInfo (
                (userInfo) => {
                    setStorageSync('userInfo', userInfo)
                    const openId = getStorageSync('openId')
                    if (!openId || openId.length === 0) {
                        getOpenUserId(openId => onOpenIdComplete(openId, userInfo))
                    } else {
                        onOpenIdComplete(openId, userInfo)
                    }
                },
                () => {
                    console.log('fail...')
                }
            )
        },
        init () {
            this.getSetting()
        },
        onCategoryClick (book) {
            this.$router.push({
                path: '/pages/list/main',
                query: {
                    key: 'categoryId',
                    text: book.category,
                    title: book.categoryText
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.msg{
  color: red;
  font-size: 20px;
}
.home-book{
    margin-top: 23px;
}
</style>

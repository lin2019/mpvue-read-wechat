<template>
    <div class="home-book">
        <div class="home-book-header" v-if="showTitle">{{title}}</div>
        <div class="home-book-content">
            <div class="home-book-row" v-for="(item,index) in bookData" :key="index">
                <div 
                    :style="{flex: '0 0 ' + (100/col) + '%'}"
                    class="home-book-col" 
                    v-for="(book,bookIndex) in item" 
                    :key="bookIndex">
                    <div 
                        v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW"
                        :style="{flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row'}"
                        class="book-wrapper"
                        @click="onBookClick(book)">
                        <imageView 
                           :src="book.cover" />
                        <div class="book-title-wrapper book-title-col" v-if="mode === HOME_BOOK_MODE.COL">
                            <div class="book-title">{{book.title}}</div>
                        </div>
                        <div class="book-title-wrapper book-title-row" v-else>
                            <div class="book-title">{{book.title}}</div>
                            <div class="book-title-author-wrapper">
                                <div class="book-title book-author">{{book.author}}</div>
                                <div class="book-title book-author">{{book.categoryText}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="category-wrapper" v-else @click="onBookClick(book)">
                        <div class="category-text">{{book.text}}</div>
                        <div class="category-num">{{book.num}}本书</div>
                        <div class="category-img-wrapper">
                            <div class="category-img1">
                                <imageView 
                                    :src="book.cover" />
                            </div>
                             <div class="category-img2">
                                <imageView 
                                    :src="book.cover2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-book-footer" v-if="showBtn" @click="onMoreClick">
            <van-button round custom-class="home-book-btn">{{btnText}}</van-button>
        </div>
    </div>
</template>

<script>
import {HOME_BOOK_MODE, CATEGORY} from '@/utils/const'
import imageView from '@/components/base/imageView'
export default {
    components: {
        imageView
    },
    props: {
        title: String,
        data: {
            type: Array,
            default: []
        },
        btnText: String,
        row: {
            type: Number,
            default: 0
        },
        col: {
            type: Number,
            default: 1
        },
        mode: {
            type: String,
            default: HOME_BOOK_MODE.ROW
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showBtn: {
            type: Boolean,
            default: true
        },
        linearBg: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        HOME_BOOK_MODE () {
            return HOME_BOOK_MODE
        },
        CATEGORY () {},
        bookData () {
            const {data, row, col} = this
            if (data && data.length > 0) {
                data.forEach(book => {
                    book.text = CATEGORY[book.categoryText.toLowerCase()]
                })
                const number = row * col
                const _bookData = data.slice(0, number)
                const _bookDataRow = []
                let _row = 0
                while (_row < row) {
                    _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
                    _row++
                }
                return _bookDataRow
            } else {
                return []
            }
        }
    },
    methods: {
        onMoreClick () {
            this.$emit('onMoreClick')
        },
        onBookClick (book) {
            this.$emit('onBookClick', book)
        }
    }
}
</script>

<style lang="scss" scoped>
.home-book{
    .home-book-header{
        font-size: 21px;
        padding: 13px 0 0 20.5px;
        color: #212933;
    }
    .home-book-content{
        padding: 0 12px;
        margin-top: 10.5px;
        .home-book-row{
            display: flex;
            flex-grow: row nowrap;
            margin-top: 12px;
            .home-book-col{
                padding: 0 8px;
                box-sizing: border-box;
                .book-wrapper{
                    display: flex;
                    .book-title-wrapper{
                        &.book-title-col{
                            .book-title{
                                font-size: 12px;
                                font-weight: 500;
                                color: #212731;
                                line-height: 16.5px;
                                max-height: 33px;
                                overflow: hidden;
                                word-break: break-word;
                            }
                        }
                        &.book-title-row{
                            display: flex;
                            flex: 0 0 50%;
                            padding: 10px;
                            flex-direction: column;
                            justify-content: space-between;
                            .book-title{
                                font-size: 14px;
                                color: #1F1F1F;
                                line-height: 18px;
                                max-height: 36px;
                                overflow: hidden;
                                word-break: break-word;
                            }
                            .book-author{
                                font-size: 12px;
                                font-weight: 500;
                                color: #868686;
                                line-height: 14px;
                                max-height: 14px;
                            }
                        }
                    }
                }
                .category-wrapper{
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: #F8F9FB;
                    border-radius: 10px;
                    padding: 13px 0 14.5px 16px;
                    box-sizing: border-box;
                    height: 96px;
                    .category-text{
                        color: #212832;
                        font-size: 16px;
                        line-height: 22.5px;
                        width: 150px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .category-num{
                        color: #868686;
                        font-size: 12px;
                        line-height: 16.5px;
                    }
                    .category-img-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        .category-img1{
                            position: absolute;
                            right: 0;
                            bottom: -5px;
                            z-index: 100;
                            width: 48px;
                            border-radius: 0 0 10px 0;
                        }
                        .category-img2{
                            position: absolute;
                            right: 30px;
                            bottom: -5px;
                            z-index: 90;
                            width: 36px;
                        }  
                    }
                }
            }
        }
    }
    .home-book-footer{
        padding: 12px 20px 20px;
    }
}
</style>
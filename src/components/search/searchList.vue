<template>
    <div class="search-list-wrapper">
        <searchItem
            icon="apps-o"
            :title="category"
            subTitle="Category"
            @onClick="showList(category,'category')"
            v-if="category" />
        <searchItem
            icon="user-o"
            :title="author"
            subTitle="Author"
            @onClick="showList(author,'author')"
            v-if="author" />
        <searchItem
            icon="newspaper-o"
            :title="publisher"
            subTitle="Publisher"
            @onClick="showList(publisher,'publisher')"
            v-if="publisher" />
        <searchTable
            :data="data.book" />
    </div>
</template>

<script>
import searchItem from '../search/searchItem'
import searchTable from '../search/searchTable'
export default {
    components: {
        searchItem,
        searchTable
    },
    props: {
        data: Object
    },
    computed: {
        category () {
            if (this.data && this.data.category && this.data.category.length > 0) {
                return this.data.category[0].categoryText
            } else {
                return null
            }
        },
        author () {
            if (this.data && this.data.author && this.data.author.length > 0) {
                return this.data.author[0].author
            } else {
                return null
            }
        },
        publisher () {
            if (this.data && this.data.publisher && this.data.publisher.length > 0) {
                return this.data.publisher[0].publisher
            } else {
                return null
            }
        }
    },
    methods: {
        showList (text, key) {
            this.$router.push({
                path: '/pages/list/main',
                query: {text, key, title: text}
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
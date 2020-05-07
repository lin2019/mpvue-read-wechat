<template>
    <div>
        <homeBook 
            :row="category.length / 2"
            :col="2"
            :data="category"
            mode="category"
            :showTitle="false"
            :showBtn="false"
            @onBookClick="onCategoryClick" />
    </div>
</template>

<script>
import homeBook from '../../components/home/homeBook'
import {getCategoryList} from '../../api/service'
export default {
    components: {
        homeBook
    },
    data () {
        return {
            category: []
        }
    },
    mounted () {
        getCategoryList().then(res => {
            this.category = res.data.data
        })
    },
    methods: {
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

</style>
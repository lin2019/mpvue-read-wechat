<template>
    <div class="search-bar">
        <div class="search-bar-wrapper" @click="onSearchBarClick">
            <van-icon name="search" class="search" size="16px" color="#858C96" />
            <input
                class="search-bar-input"
                v-model="searchWord"
                @input="onChange"
                @confirm="onConfirm"
                confirm-type="search"
                :focus="focus"
                :disabled="disabled"
                :maxlength="limit"
                :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch" 
                placeholder-style="color: #ADB4BE;font-size: 15px;" />
            <van-icon name="clear" 
                v-if="searchWord.length > 0"
                @click="onClearClick"
                class="clear" 
                size="16px" 
                color="#ccc" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        focus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 50
        },
        hotSearch: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            searchWord: ''
        }
    },
    methods: {
        onSearchBarClick () {
            this.$emit('onClick')
        },
        onClearClick () {
            this.searchWord = ''
            this.$emit('onClear')
        },
        onChange (e) {
            const {value} = e.mp.detail
            this.$emit('onChange', value)
        },
        onConfirm (e) {
            const {value} = e.mp.detail
            this.$emit('onConfirm', value)
        },
        setValue (value) {
            this.searchWord = value
        },
        getValue () {
            return this.searchWord
        }
    }
}
</script>

<style lang="scss" scoped>
.search-bar{
    padding: 15px 15.5px;
    .search-bar-wrapper{
        background: #F5F7F9;
        border-radius: 40px;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 12px 17px;
        .search-bar-input{
            flex: 1;
            margin: 0 8px;
            color: #333;
            font-size: 15px;
        }
        .search,.clear{
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
}
</style>
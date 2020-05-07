import {get, post} from '@/utils/request'
import {APP_ID, APP_SECRET} from '@/utils/const'
// const BASE_URL = 'https://test.youbaobao.xyz:18081'

export const getHomeData = (openId) => {
    return get('/book/home/v2', {
        openId
    })
}

export const getRecommend = () => {
    return get('/book/home/recommend/v2')
}

export const getFreeRead = () => {
    return get('/book/home/freeRead/v2')
}

export const getHotBook = () => {
    return get('/book/home/hotBook/v2')
}

export const getOpenID = (code) => {
    return get('/openId/get', {
        appId: APP_ID,
        secret: APP_SECRET,
        code
    })
}

export const getRegister = (openId, userInfo) => {
    return post('/user/register', {
        openId,
        platform: mpvuePlatform,
        ...userInfo
    })
}

export const search = (params) => {
    return get('/book/search', params)
}

export const hotSearch = () => {
    return get('/book/hot-search')
}

export const getBookDetail = (params) => {
    return get('/book/detail', params)
}

export const getBookRate = (params) => {
    return get('/book/rank/save', params)
}

export const getBookContent = (params) => {
    return get('/book/contents', params)
}

export const getBookShelf = (params) => {
    return get('/book/shelf/get', params)
}

export const addBookShelf = (params) => {
    return get('/book/shelf/save', {
        shelf: JSON.stringify(params)
    })
}

export const removeBook = (params) => {
    return get('/book/shelf/remove', {
        shelf: JSON.stringify(params)
    })
}

export const getBookList = (params) => {
    return get('/book/search-list', params)
}

export const getCategoryList = () => {
    return get('/book/category/list/v2')
}

export const getUserDay = (params) => {
    return get('/user/day', params)
}

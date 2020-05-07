import {getOpenID} from './service'

export function getSetting (auth, onSuccess, onFail) {
    mpvue.getSetting({
        success (res) {
            if (res.authSetting[`scope.${auth}`]) {
                onSuccess(res)
            } else {
                onFail(res)
            }
        },
        fail (error) {
            console.log(error)
        }
    })
}

export function getUserInfo (onSuccess, onFail) {
    mpvue.getUserInfo({
        success (res) {
            const {userInfo} = res
            if (userInfo) {
                onSuccess(userInfo)
            } else {
                onFail('fail...')
            }
        },
        fail (error) {
            console.log(error)
        }
    })
}

export function setStorageSync (key, data) {
    mpvue.setStorageSync(key, data)
}

export function getStorageSync (key) {
    return mpvue.getStorageSync(key)
}

export function getOpenUserId (callback) {
    mpvue.login({
        success (res) {
            if (res.code) {
                console.log(res)
                const {code} = res
                getOpenID(code).then((res) => {
                    const {data: {data: {openid}}} = res
                    setStorageSync('openId', openid)
                    callback && callback(openid)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log(res)
            }
        },
        fail (error) {
            console.log(error)
        }
    })
}

export function showLoading (title) {
    mpvue.showLoading({
        title,
        mask: true
    })
}

export function hideLoading () {
    mpvue.hideLoading()
}

export function showToast (title) {
    mpvue.showToast({
        title,
        duration: 2000
    })
}

export function setNavigationBarTitle (title) {
    mpvue.setNavigationBarTitle({title})
}

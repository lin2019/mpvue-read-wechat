function createFly () {
    if (mpvuePlatform === 'wx') {
        const Fly = require('flyio/dist/npm/wx')
        var fly = new Fly()
        fly.config.timeout = 10000
        fly.config.baseURL = 'https://test.youbaobao.xyz:18081'
        return fly
    } else {
        return null
    }
}

function handleError (error) {
    console.log(error)
}

export function get (url, params = {}, showError = true) {
    const fly = createFly()
    if (fly) {
        return new Promise((resolve, reject) => {
            fly.get(url, params).then(response => {
                if (response && response.data && response.data.error_code === 0) {
                    resolve(response)
                } else {
                    if (showError) {
                        const msg = (response && response.data && response.data.msg) || '请求失败'
                        mpvue.showToast({
                            title: msg,
                            duration: 2000
                        })
                    }
                    reject(response)
                }
            }).catch(err => {
                handleError(err)
                reject(err)
            })
        })
    }
}

export function post (url, params = {}, showError = true) {
    const fly = createFly()
    if (fly) {
        return new Promise((resolve, reject) => {
            fly.post(url, params).then(response => {
                if (response && response.data && response.data.error_code === 0) {
                    resolve(response)
                } else {
                    if (showError) {
                        const msg = (response && response.data && response.data.msg) || '请求失败'
                        mpvue.showToast({
                            title: msg,
                            duration: 2000
                        })
                    }
                    reject(response)
                }
            }).catch(err => {
                handleError(err)
                reject(err)
            })
        })
    }
}

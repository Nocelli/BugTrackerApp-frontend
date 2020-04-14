var Decode = require('jwt-decode')

function CheckAuth() {
    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')

    if (!token || !tokenRefresh)
        return false

    try {
        const { exp } = Decode(tokenRefresh)
        if ((Math.floor(exp * 1000)) < new Date().getTime())
            return false
    } catch (error) {
        return false
    }
    return true
}

export default CheckAuth
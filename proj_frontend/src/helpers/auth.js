import cookie from 'js-cookie'
import { GoogleLogout } from 'react-google-login'

export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        }) 
    }
}

export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGN IN RESPONSE', response)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}
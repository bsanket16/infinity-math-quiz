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

export const authenticated = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGN IN RESPONSE', response)
    setLocalStorage('user', response.data.user)
    next()
}

export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGN IN RESPONSE', response)
    localStorage.setItem("user", JSON.stringify(response))       
    next()
}

export const isAuth = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"))
    }
}

export const signout = next => {
    removeLocalStorage('user')
    next()
}
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  if(Cookies.get('userInfo') != undefined){
    return JSON.parse(Cookies.get('userInfo'))
  }
  return null;
}

export function setUser(token) {
  return Cookies.set('userInfo', token)
}

export function removeUser() {
  return Cookies.remove('userInfo')
}

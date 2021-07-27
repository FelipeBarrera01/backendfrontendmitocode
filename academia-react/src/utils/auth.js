import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"
import { tokenName } from './constants'

export const setTokenSession = (token, expiration) => {
  Cookies.set(
    tokenName,
    token,
    {
      expires: expiration
    })
}

export const getTokenSession = () => {
  return Cookies.get(tokenName)
}


export const removeToken = () => {
  return Cookies.remove(tokenName)
}

export const decodeToken = () => {
  const token = getTokenSession()
  const decoded = jwt_decode(token)
  return decoded
}
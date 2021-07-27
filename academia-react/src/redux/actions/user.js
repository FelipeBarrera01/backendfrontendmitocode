import { removeToken, setTokenSession } from '../../utils/auth'
import * as userTypes from '../types/user'
import http from '../../services/api'

export const doLogin = (request, callback) => async(dispatch) => {
  try {
    dispatch({ type: userTypes.DO_LOGIN_START })

    const { data: response } = await http.postLogin('/v2/login', request)


    dispatch({
      type: userTypes.DO_LOGIN_SUCESS,
      payload: response.token
    })

    const dateExpiration = new Date(response.expiracion)

    setTokenSession(response.token, dateExpiration)
    callback()
  } catch (error) {
    dispatch({
      type: userTypes.DO_LOGIN_FAIL,
      payload: {
        error: true,
        message: 'Ocurrió un error'
      }
    })
  } finally {
    dispatch({ type: userTypes.DO_LOGIN_FINALLY })
  }
}

export const signOut = () => (dispatch) => {
  dispatch({ type: userTypes.SIGN_OUT })
  removeToken()
}

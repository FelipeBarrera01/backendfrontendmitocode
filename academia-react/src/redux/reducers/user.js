/* eslint-disable default-case */
import * as userTypes from '../types/user'

const initialState = {
  authenticated: false,
  loading: false,
  data: null,
  error: {
    error: false,
    message: '',
  },
}

export default function usuarios(state = initialState, action) {
  switch (action.type) {
    case userTypes.DO_LOGIN_START:
      return {
        ...state,
        loading: true,
      }
    case userTypes.DO_LOGIN_SUCESS:
      return {
        ...state,
        data: action.payload,
        authenticated: true
      }
    case userTypes.DO_LOGIN_FAIL:
      return {
        ...state,
        error: {
          ...state.error,
          error: action.payload.error,
          message: action.payload.message
        }
      }
    case userTypes.DO_LOGIN_FINALLY:
      return {
        ...state,
        loading: false
      }
    case userTypes.SIGN_OUT:
      return initialState
    default:
      return state
  }
}

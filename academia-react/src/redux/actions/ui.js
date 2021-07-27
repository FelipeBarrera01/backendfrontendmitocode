import * as uiTypes from '../types/ui'

export const changeStateAlert = (state, issuccess, message) => ({

    type: uiTypes.CHANGE_STATE_ALERT,
    payload: {
        state: state,
        issuccess: issuccess,
        message: message
    }
})
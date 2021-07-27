/* eslint-disable default-case */
import * as uiTypes from '../types/ui'

const initialState = {

    state: false,
    issuccess: false,
    message: ""

}

export default function ui(state = initialState, action) {
    switch (action.type) {
        case uiTypes.CHANGE_STATE_ALERT:
            return {
                state: action.payload.state,
                issuccess: action.payload.issuccess,
                message: action.payload.message,
            }

        default:
            return state
    }
}
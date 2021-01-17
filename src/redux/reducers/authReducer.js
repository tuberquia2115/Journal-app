import { types } from '../../types/types'

const initialState = {
    uid: '',
    name: ''
}

export const authReducer = (state = initialState, { type, payload }) => {
    console.log("payload:", payload);
    switch (type) {
        case types.login:
            return {
                ...state,
                uid: payload.uid,
                name: payload.displayName
            }

        case types.logout:
            return {}

        default:
            return state
    }
}

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        // case typeName:
        //     return { ...state, ...payload }

        default:
            return state
    }
}

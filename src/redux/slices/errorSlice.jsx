import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
    name: 'errorSlice',
    
    initialState: {
        errorCode: 0, 
        errorMessage: '', 
        detalle: null
    },

    reducers: {
        setError:(state, action) =>{ 
            state = action.payload
        },
        getError:(state) => {
            return state
        },
        cleanState: (state) => {
            state = state.initialState
        } 
    }
})

export const {setError, getError, cleanState} = errorSlice.actions
export default errorSlice.reducer

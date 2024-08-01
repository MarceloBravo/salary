import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'loginSlice',
    
    initialState: {uid: null, name: null, token: null},

    reducers: {
        setLogin: (state, action) => {
            state.uid = action.payload.uid;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        setLogOut: (state) => {
            state.uid = null;
            state.name = null;
            state.token = null;
        }
    }
})

export const {setLogin, setLogOut} = loginSlice.actions
export default loginSlice.reducer

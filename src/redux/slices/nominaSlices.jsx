import { createSlice } from '@reduxjs/toolkit'

const nominaSlices = createSlice({
    name: 'nominaSlices',
    
    initialState: {list: []},

    reducers: {
        setList: (state, action) => {
            state.list = action.payload.list;
        },
        setAdd: (state, action) => {
            state.list.push(action.payload)
        },
        setDelete: (state, action) => {
            state.list = state.list.filter(e => e.id !== action.payload)
        },
        cleanState: (state) => {
            state.list = []
        }    
    }
})

export const {setList, setAdd, setDelete, cleanState} = nominaSlices.actions
export default nominaSlices.reducer

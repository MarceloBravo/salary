import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slices/loginSlice'
import errorSlice from './slices/errorSlice'
import nominaSlices from './slices/nominaSlices'

export default configureStore({
    reducer: {
        loginSlice,
        errorSlice,
        nominaSlices
    }
})
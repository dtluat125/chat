import {configureStore} from "@reduxjs/toolkit"
import appReducer from "../features/appSlice"

export const app = configureStore({
    reducer:{
        app: appReducer
    }
})
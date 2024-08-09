import {configureStore} from '@reduxjs/toolkit'
import typingReducer from './features/typingSlice'
import textReducer from './features/textSlice'

export const store = configureStore({
    reducer: {
        typing: typingReducer,
        texts: textReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
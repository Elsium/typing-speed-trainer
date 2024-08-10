import {configureStore} from '@reduxjs/toolkit'
import typingReducer from './features/typingSlice'
import textReducer from './features/textSlice'
import textTypeReducer from './features/textTypeSlice'

export const store = configureStore({
    reducer: {
        typing: typingReducer,
        texts: textReducer,
        textType: textTypeReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
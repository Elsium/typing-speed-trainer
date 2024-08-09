import {configureStore} from "@reduxjs/toolkit";
import typingReducer from './features/typingSlice';

const store = configureStore({
    reducer: {
        typing: typingReducer,
    }
})
export default store
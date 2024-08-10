import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TextType} from '@/services/constants.ts'

interface TextTypeState {
    language: TextType.en | TextType.ru
    textLength: TextType.short | TextType.long
}

const initialState: TextTypeState = {
    language: TextType.ru,
    textLength: TextType.short
}

const textTypeSlice = createSlice({
    name: 'textType',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<TextType.en | TextType.ru>) => {
            state.language = action.payload
        },
        setTextLength: (state, action: PayloadAction<TextType.short | TextType.long>) => {
            state.textLength = action.payload
        }
    }
})

export const {setLanguage, setTextLength} = textTypeSlice.actions
export default textTypeSlice.reducer
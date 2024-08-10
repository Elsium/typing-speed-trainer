import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Texts} from '@/services/types.ts'

const initialState: Texts = {
    longTextsEn: [],
    shortTextsEn: [],
    longTextsRu: [],
    shortTextsRu: [],
}

// Установка текстов для печати
const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        setLongTextsEn: (state, action: PayloadAction<string[]>) => {
            state.longTextsEn = action.payload
        },
        setShortTextsEn: (state, action: PayloadAction<string[]>) => {
            state.shortTextsEn = action.payload
        },
        setLongTextsRu: (state, action: PayloadAction<string[]>) => {
            state.longTextsRu = action.payload
        },
        setShortTextsRu: (state, action: PayloadAction<string[]>) => {
            state.shortTextsRu = action.payload
        },
    }
})

export const {setLongTextsEn, setShortTextsEn, setLongTextsRu, setShortTextsRu} = textSlice.actions
export default textSlice.reducer
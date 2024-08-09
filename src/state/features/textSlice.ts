import {createSlice} from '@reduxjs/toolkit'

interface TextState {
    longTextsEn: string[]
    shortTextsEn: string[]
    longTextsRu: string[]
    shortTextsRu: string[]
}

const initialState: TextState = {
    longTextsEn: [],
    shortTextsEn: [],
    longTextsRu: [],
    shortTextsRu: [],
}

const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        setLongTextsEn: (state, action) => {
            state.longTextsEn = action.payload
        },
        setShortTextsEn: (state, action) => {
            state.shortTextsEn = action.payload
        },
        setLongTextsRu: (state, action) => {
            state.longTextsRu = action.payload
        },
        setShortTextsRu: (state, action) => {
            state.shortTextsRu = action.payload
        },
    }
})

export const {setLongTextsEn, setShortTextsEn, setLongTextsRu, setShortTextsRu} = textSlice.actions
export default textSlice.reducer
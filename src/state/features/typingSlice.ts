import {createSlice} from "@reduxjs/toolkit";

interface TypingState {
    targetText: string
    userInput: string
    startTime: number | null
    endTime: number | null
    errors: number
    wpm: number
    isFinished: boolean
}

const initialState: TypingState = {
    targetText: '',
    userInput: '',
    startTime: null,
    endTime: null,
    errors: 0,
    wpm: 0,
    isFinished: false,
}

const typingSlice = createSlice({
    name: 'typing',
    initialState,
    reducers: {
        setTargetText: (state, action) => {
            state.targetText = action.payload
        },
        updateUserInput: (state, action) => {
            if (state.startTime === null) {
                state.startTime = Date.now()
            }
            state.userInput = action.payload

            // Подсчет ошибок
            let errors = 0
            for (let i = 0; i < state.userInput.length; i++) {
                if (state.userInput[i] !== state.targetText[i]) {
                    errors++
                }
            }
            state.errors = errors

            if (state.userInput === state.targetText) {
                state.isFinished = true
                state.endTime = Date.now()

                const timeTakenInMinutes = (state.endTime - state.startTime) / 60000
                state.wpm = Math.round(state.userInput.length / 5 / timeTakenInMinutes)
            }
        },
        reset: (state) => {
            state.userInput = ''
            state.startTime = null
            state.endTime = null
            state.errors = 0
            state.wpm = 0
            state.isFinished = false
        },
    },
})
export const { setTargetText, updateUserInput, reset } = typingSlice.actions
export default typingSlice.reducer
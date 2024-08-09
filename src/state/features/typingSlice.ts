import {createSlice} from '@reduxjs/toolkit'

interface TypingState {
    targetText: string
    userInput: string
    startTime: number | null
    endTime: number | null
    errors: number
    spm: number
    isFinished: boolean
    elapsedTime: number
    accuracy: number
}

const initialState: TypingState = {
    targetText: '',
    userInput: '',
    startTime: null,
    endTime: null,
    errors: 0,
    spm: 0,
    isFinished: false,
    elapsedTime: 0,
    accuracy: 100
}

const typingSlice = createSlice({
    name: 'typing',
    initialState,
    reducers: {
        setTargetText: (state, action) => {
            state.targetText = action.payload
        },
        startTimer: (state) => {
            state.startTime = Date.now()
        },
        updateUserInput: (state, action) => {
            state.userInput = action.payload

            // Подсчет ошибок
            let errors = 0
            for (let i = 0; i < state.userInput.length; i++) {
                if (state.userInput[i] !== state.targetText[i]) {
                    errors++
                }
            }
            state.errors = errors

            if (state.userInput.length === state.targetText.length) {
                state.isFinished = true
                state.endTime = Date.now()
            }
        },
        updateStatistics: (state) => {
            if (state.startTime !== null) {
                const currentTime = Date.now()
                const timeTakenInMinutes = (currentTime - state.startTime) / 60000
                state.spm = Math.round(state.userInput.length / timeTakenInMinutes)

                // Обновление времени
                state.elapsedTime = Math.floor((currentTime - state.startTime) / 1000)

                // Обновление точности
                const totalTyped = state.userInput.length
                state.accuracy = totalTyped > 0 ? Math.round(((totalTyped - state.errors) / totalTyped) * 100) : 100
            }
        },
        reset: (state) => {
            state.userInput = ''
            state.startTime = Date.now()
            state.endTime = null
            state.errors = 0
            state.spm = 0
            state.isFinished = false
            state.elapsedTime = 0
            state.accuracy = 100
        },
    },
})

export const { setTargetText, startTimer, updateUserInput, updateStatistics, reset } = typingSlice.actions
export default typingSlice.reducer


import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface TypingState {
    targetText: string // Текст, который нужно напечатать
    userInput: string // Текст, который ввел пользователь
    startTime: number | null // Время начала печати
    endTime: number | null // Время окончания печати
    errors: number // Количество ошибок
    spm: number // Средняя скорость печати символов в минуту
    isFinished: boolean // Флаг окончания
    elapsedTime: number // Продолжительность печати в секундах
    accuracy: number // Точность печати
    hasStarted: boolean // Флаг начала печати
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
    accuracy: 100,
    hasStarted: false
}

const typingSlice = createSlice({
    name: 'typing',
    initialState,
    reducers: {
        // Установка текста для печати
        setTargetText: (state, action: PayloadAction<string>) => {
            state.targetText = action.payload
        },
        // Установка таймера на текущее время
        startTimer: (state) => {
            state.startTime = Date.now()
        },
        // Обновление пользовательского ввода, считывание ошибок (сравнением с начальным текстом), проверка окончания печати (по длине текста)
        updateUserInput: (state, action: PayloadAction<string>) => {
            state.userInput = action.payload

            let errors = 0
            for (let i = 0; i < state.userInput.length; i++) {
                if (state.userInput[i] !== state.targetText[i]) {
                    errors++
                }
            }
            state.errors = errors

            if (state.userInput.length === state.targetText.length) {
                state.isFinished = true
                state.hasStarted = false
                state.endTime = Date.now()
            }
        },
        /* Обновление статистики:
            время для скорости печати - сохраняем текущее время, отнимает от него время начала печати, делим на 60000 для получения минут
            скорость печати - делим количество введенных символов на время в минутах
            затраченное время - тоже, что и время для скорости печати, но делим на 1000 для получения секунд
            точность печати - делим количество корректных символов на общее количество введенных символов, умножаем на 100, округляем и делим на 100 для получения %
        */
        updateStatistics: (state) => {
            if (state.startTime !== null) {
                const currentTime = Date.now()
                const timeTakenInMinutes = (currentTime - state.startTime) / 60000
                state.spm = Math.round(state.userInput.length / timeTakenInMinutes)

                state.elapsedTime = Math.floor((currentTime - state.startTime) / 1000)

                const totalTyped = state.userInput.length
                state.accuracy = totalTyped > 0 ? Math.round(((totalTyped - state.errors) / totalTyped) * 100) : 100
            }
        },
        // Установка флага начала печати
        setHasStarted: (state, action: PayloadAction<boolean>) => {
            state.hasStarted = action.payload
        },
        // сброс статистики
        reset: (state) => {
            state.userInput = ''
            state.startTime = Date.now()
            state.endTime = null
            state.errors = 0
            state.spm = 0
            state.isFinished = false
            state.elapsedTime = 0
            state.accuracy = 100
            state.hasStarted = false
        },
    },
})

export const { setHasStarted, setTargetText, startTimer, updateUserInput, updateStatistics, reset } = typingSlice.actions
export default typingSlice.reducer


import {useDispatch, useSelector} from 'react-redux'
import React from 'react'
import {RootState} from '@/state/store.ts'
import {reset, setHasStarted, setTargetText, startTimer, updateStatistics} from '@/state/features/typingSlice.ts'
import {Texts} from '@/services/types.ts'
import {TextType} from '@/services/constants.ts'

interface Props {
    texts: Texts
    language: TextType.ru | TextType.en
    textLength: TextType.short | TextType.long
}
// Выбирает случайную строку из массива
const selectRandomText = (texts: string[]): string => {
    return texts[Math.floor(Math.random() * texts.length)]
}
// Возвращает массив текстов в зависимости от языка и длины выбранных в choose-text-type.tsx
const getTextsByLanguageAndLength = ({texts, language, textLength}: Props): string[] => {
    return language === TextType.ru
        ? textLength === TextType.short ? texts.shortTextsRu : texts.longTextsRu
        : textLength === TextType.short ? texts.shortTextsEn : texts.longTextsEn
}

export const useTyping = ({texts, language, textLength}: Props) => {
    const dispatch = useDispatch()
    const [targetText, setTargetTextState] = React.useState<string>('')
    const isFinished = useSelector((state: RootState) => state.typing.isFinished)
    const hasStarted = useSelector((state: RootState) => state.typing.hasStarted)

    // Создает интервал обновления статистики
    React.useEffect(() => {
        let interval: NodeJS.Timeout

        if (hasStarted && !isFinished) {
            interval = setInterval(() => {
                dispatch(updateStatistics())
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [hasStarted, isFinished, dispatch])

    // Функция старта: очищает стейт, выбирает случайную строку, привязывает ее к стейту, запускает таймер
    const handleStart = () => {
        dispatch(reset())
        const textsList = getTextsByLanguageAndLength({texts, language, textLength})
        const randomText = selectRandomText(textsList)
        setTargetTextState(randomText)
        dispatch(setTargetText(randomText))
        dispatch(setHasStarted(true))
        dispatch(startTimer())
    }

    return {
        hasStarted,
        targetText,
        handleStart,
        isFinished,
    }
}
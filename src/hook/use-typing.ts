import {useDispatch, useSelector} from 'react-redux'
import React from 'react'
import {RootState} from '@/state/store.ts'
import {reset, setTargetText, startTimer, updateStatistics} from '@/state/features/typingSlice.ts'
import {Texts} from '@/services/types.ts'
import {TextType} from '@/services/constants.ts'

interface Props {
    texts: Texts
    language: TextType.ru | TextType.en
    textLength: TextType.short | TextType.long
}

export const useTyping = ({texts, language, textLength}: Props) => {
    const dispatch = useDispatch()
    const [targetText, setTargetTextState] = React.useState<string>('')
    const [hasStarted, setHasStarted] = React.useState<boolean>(false)
    const isFinished = useSelector((state: RootState) => state.typing.isFinished)

    React.useEffect(() => {
        let interval: NodeJS.Timeout
        if (hasStarted && !isFinished) {
            interval = setInterval(() => {
                dispatch(updateStatistics())
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [hasStarted, isFinished, dispatch])

    const handleStart = () => {
        dispatch(reset())
        const textsList = language === TextType.ru
            ? textLength === TextType.short ? texts.shortTextsRu : texts.longTextsRu
            : textLength === TextType.short ? texts.shortTextsEn : texts.longTextsEn

        const randomText = textsList[Math.floor(Math.random() * textsList.length)]
        setTargetTextState(randomText)
        dispatch(setTargetText(randomText))
        setHasStarted(true)
        dispatch(startTimer())
    }

    return {
        hasStarted,
        targetText,
        handleStart,
        isFinished,
    }
}
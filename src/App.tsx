import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store.ts'
import { setTargetText, startTimer, updateStatistics, reset } from '@/state/features/typingSlice.ts'
import { setShortTextsEn, setLongTextsEn, setLongTextsRu, setShortTextsRu } from '@/state/features/textSlice.ts'
import axios from 'axios'
import { TextDisplay, TextInput, Statistics, ResultScreen } from '@/components/shared'
import {Button} from '@/components/ui'


const App: React.FC = () => {
    const dispatch = useDispatch()
    const isFinished = useSelector((state: RootState) => state.typing.isFinished)
    const texts = useSelector((state: RootState) => state.texts.longTextsRu)
    const [hasStarted, setHasStarted] = React.useState(false)
    const [targetText, setTargetTextState] = React.useState('')

    React.useEffect(() => {
        const fetchTexts = async () => {
            try {
                const response1 = await axios.get('/texts-short-en.json')
                const response2 = await axios.get('/texts-long-en.json')
                const response3 = await axios.get('/texts-short-ru.json')
                const response4 = await axios.get('/texts-long-ru.json')
                dispatch(setShortTextsEn(response1.data))
                dispatch(setLongTextsEn(response2.data))
                dispatch(setShortTextsRu(response3.data))
                dispatch(setLongTextsRu(response4.data))
            } catch (error) {
                console.error('Error fetching texts:', error)
            }
        }
        fetchTexts()
    }, [dispatch])

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
        const randomText = texts[Math.floor(Math.random() * texts.length)]
        setTargetTextState(randomText)
        dispatch(setTargetText(randomText))
        setHasStarted(true)
        dispatch(startTimer())
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold mb-8'>Typing Speed Trainer</h1>
            {!hasStarted ? (
                <Button onClick={handleStart}>
                    Старт
                </Button>
            ) : (
                <div className='relative w-full max-w-xl transition-opacity duration-500'>
                    {isFinished ? (
                        <ResultScreen onRestart={handleStart} />
                    ) : (
                        <>
                            <TextDisplay targetText={targetText} />
                            <TextInput />
                            <Statistics />
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default React.memo(App)

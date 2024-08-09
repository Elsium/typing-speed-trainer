import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTargetText, startTimer, updateStatistics, reset } from '@/state/features/typingSlice.ts'
import { TextDisplay, TextInput, Statistics, ResultScreen } from '@/components/shared'
import { RootState } from '@/state/store.ts'
import {Button} from '@/components/ui'

const App: React.FC = () => {
    const dispatch = useDispatch()
    const targetText = 'This is a sample text for typing test'
    const isFinished = useSelector((state: RootState) => state.typing.isFinished)
    const [hasStarted, setHasStarted] = React.useState(false)

    React.useEffect(() => {
        dispatch(setTargetText(targetText))
    }, [dispatch, targetText])

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

import React from 'react'
import {useSelector} from 'react-redux'
import { RootState } from '@/state/store.ts'
import {TextDisplay, TextInput, Statistics, ResultScreen, ChooseTextType} from '@/components/shared'
import {Button} from '@/components/ui'
import {useTextType, useFetchTexts, useTyping} from '@/hook'


const App: React.FC = () => {
    const texts = useSelector((state: RootState) => state.texts)
    const {language, textLength} = useTextType()
    const { hasStarted, targetText, handleStart, isFinished } = useTyping({texts, language, textLength})

    useFetchTexts()

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold mb-8'>Typing Speed Trainer</h1>
                <ChooseTextType />
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

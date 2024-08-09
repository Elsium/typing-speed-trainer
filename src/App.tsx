import React from 'react'
import {useDispatch} from 'react-redux'
import {setTargetText} from '@/state/features/typingSlice.ts'
import {TextDisplay, TextInput} from '@/components/shared'

const App: React.FC = () => {
    const dispatch = useDispatch()
    const targetText = 'This is a sample text for typing test'

    React.useEffect(() => {
        dispatch(setTargetText(targetText))
    }, [dispatch, targetText])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold mb-8'>Typing Speed Trainer</h1>
            <div className='relative w-full max-w-xl'>
                <TextDisplay targetText={targetText} />
                <TextInput />
            </div>
        </div>
    )
}

export default App

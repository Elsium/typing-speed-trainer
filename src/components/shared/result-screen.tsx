import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/state/store.ts'
import { reset } from '@/state/features/typingSlice.ts'
import {Button} from '@/components/ui'

interface ResultScreenProps {
    onRestart: () => void
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onRestart }) => {
    const dispatch = useDispatch()
    const { errors, spm, accuracy } = useSelector((state: RootState) => state.typing)

    const handleRestart = () => {
        dispatch(reset())
        onRestart()
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className='text-3xl font-bold mb-8'>Результаты</h1>
            <p>Ошибки: {errors}</p>
            <p>Символов в минуту: {spm}</p>
            <p>Точность: {accuracy}%</p>
            <Button onClick={handleRestart}>
                Перезапустить упражнение
            </Button>
        </div>
    )
}

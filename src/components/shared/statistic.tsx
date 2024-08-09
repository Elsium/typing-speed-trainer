import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store.ts'

export const Statistics: React.FC = () => {
    const { errors, spm, elapsedTime, accuracy} = useSelector((state: RootState) => state.typing)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60

    return (
        <div className='mt-4'>
            <p>Ошибки: {errors}</p>
            <p>Символов в минуту: {spm}</p>
            <p>Точность: {accuracy}%</p>
            <p>Время: {minutes} минут {seconds} секунд</p>
        </div>
    )
}

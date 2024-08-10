import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store.ts'
import {cn} from '@/lib/utils.ts'

interface Props {
    className?: string
}

export const Statistics: React.FC<Props> = ({className}) => {
    const { errors, spm, elapsedTime, accuracy} = useSelector((state: RootState) => state.typing)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60

    return (
        <div className={cn('mt-4 bg-gray-100 rounded p-4 mx-2 md:mx-0', className)}>
            <p>Ошибки: {errors}</p>
            <p>Символов в минуту: {spm}</p>
            <p>Точность: {accuracy}%</p>
            <p>Время: {minutes} минут {seconds} секунд</p>
        </div>
    )
}

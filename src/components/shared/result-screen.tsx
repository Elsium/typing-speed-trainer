import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/state/store.ts'
import { reset } from '@/state/features/typingSlice.ts'
import {Button} from '@/components/ui'
import {TextDisplay} from '@/components/shared/text-display.tsx'

interface ResultScreenProps {
    onRestart: () => void
    targetText: string
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onRestart, targetText }) => {
    const dispatch = useDispatch()
    const { errors, spm, accuracy } = useSelector((state: RootState) => state.typing)

    const handleRestart = () => {
        dispatch(reset())
        onRestart()
    }

    return (
        <div className={'flex flex-col items-center justify-center bg-gray-100 p-4'}>
            <h1 className={'text-3xl font-bold mb-8'}>Результаты</h1>
            <TextDisplay targetText={targetText} className={'mb-4'}/>

            <table className={'min-w-full'}>
                <thead className={'bg-gray-100'}>
                <tr>
                    <th className={'py-3 px-6 font-medium text-gray-900'}>Ошибки</th>
                    <th className={'py-3 px-6 font-medium text-gray-900'}>Символов в минуту</th>
                    <th className={'py-3 px-6 font-medium text-gray-900'}>Точность</th>
                </tr>
                </thead>
                <tbody>
                <tr className={'bg-gray-100'}>
                    <td className={'py-4 px-6'}> {errors} </td>
                    <td className={'py-4 px-6'}> {spm} </td>
                    <td className={'py-4 px-6'}> {accuracy}%</td>
                </tr>
                </tbody>
            </table>
            <Button className={'mt-4'} onClick={handleRestart}>
                Перезапустить упражнение
            </Button>
        </div>
    )
}

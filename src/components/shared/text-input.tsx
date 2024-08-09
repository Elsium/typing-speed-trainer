import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@/state/store.ts'
import {updateUserInput} from '@/state/features/typingSlice.ts'

export const TextInput: React.FC = () => {
    const dispatch = useDispatch()
    const userInput = useSelector((state: RootState) => state.typing.userInput)
    const isFinished = useSelector((state: RootState) => state.typing.isFinished)

    React.useEffect(() => {
        if (isFinished) {
            const inputElement = document.getElementById('textInput') as HTMLInputElement
            inputElement.disabled = true
        }
    }, [isFinished])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUserInput(e.target.value))
    }

    return (
        <input
            id='textInput'
            type='text'
            value={userInput}
            onChange={handleChange}
            className='border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full text-xl mt-4'
            disabled={isFinished}
            autoComplete='off'
        />
    )
}
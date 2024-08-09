import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@/state/store.ts'
import {updateUserInput} from '@/state/features/typingSlice.ts'

export const TextInput: React.FC = () => {
    const dispatch = useDispatch()
    const userInput = useSelector((state: RootState) => state.typing.userInput)
    const isFinished = useSelector((state: RootState) => state.typing.isFinished)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateUserInput(e.target.value))
    }

    return (
        <input
            autoFocus={true}
            type='text'
            value={userInput}
            onChange={handleChange}
            className='absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent focus:outline-none select-none'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck={false}
            disabled={isFinished}
        />
    )
}
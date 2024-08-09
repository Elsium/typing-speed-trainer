import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '@/state/store.ts'

interface TextDisplayProps {
    targetText: string
}

export const TextDisplay: React.FC<TextDisplayProps> = ({targetText}) => {
    const userInput = useSelector((state: RootState) => state.typing.userInput)

    return (
        <div className="relative text-xl font-mono">
            {targetText.split('').map((char, index) => {
                const isCorrect = userInput[index] === char
                const color = isCorrect ? 'text-green-500' : 'text-red-500'
                return (
                    <span key={index} className={index < userInput.length ? color : 'text-gray-500'}>
                        {char}
                    </span>
                )
            })}
            <span
                className={`absolute top-0 ${userInput.length < targetText.length ? 'visible' : 'invisible'}`}
                style={{
                    left: `${userInput.length}ch`,
                }}
            >
                <span className="block w-0.5 h-6 bg-gray-500 animate-blink"/>
            </span>
        </div>
    )
}
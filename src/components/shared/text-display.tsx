import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store.ts'
import {cn} from '@/lib/utils.ts'

interface TextDisplayProps {
    targetText: string
    className?: string
}

export const TextDisplay: React.FC<TextDisplayProps> = ({ targetText, className }) => {
    const userInput = useSelector((state: RootState) => state.typing.userInput)
    const cursorRef = React.useRef<HTMLSpanElement>(null)

    // Ищем текущий символ (последний введенный, считает именно порядковый номер символа), для того, чтобы привязать курсор ввода
    React.useEffect(() => {
        if (cursorRef.current) {
            const currentCharElement = document.getElementById(`char-${userInput.length}`)
            if (currentCharElement) {
                const { offsetLeft, offsetTop, offsetHeight } = currentCharElement;
                cursorRef.current.style.left = `${offsetLeft}px`;
                cursorRef.current.style.top = `${offsetTop}px`;
                cursorRef.current.style.height = `${offsetHeight}px`;
            }
        }
    }, [userInput])

    return (
        <div className={cn('relative text-xl font-mono px-2 md:px-0', className)}>
            {targetText.split('').map((char, index) => {
                const isCorrect = userInput[index] === char
                const color = isCorrect ? 'text-green-500' : 'text-red-500'
                if (char === ' ' && userInput[index] && !isCorrect) {
                    return (
                        <span
                            key={index}
                            id={`char-${index}`}
                            className={color}
                        >
                            {userInput[index]}
                        </span>
                    )
                }
                return (
                    <span
                        key={index}
                        id={`char-${index}`}
                        className={index < userInput.length ? color : 'text-gray-500'}
                    >
                        {char}
                    </span>
                )
            })}
            <span
                ref={cursorRef}
                className={`absolute ${userInput.length < targetText.length ? 'visible' : 'invisible'}`}
                style={{
                    left: '0px',
                    top: '0px',
                    height: '1em',
                }}
            >
                <span className={'block w-0.5 h-6 bg-gray-500 animate-blink'} />
            </span>
        </div>
    )
}

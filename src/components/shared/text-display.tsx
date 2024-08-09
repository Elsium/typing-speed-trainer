import {useSelector} from 'react-redux'
import {RootState} from '@/state/store.ts'

interface TextDisplayProps {
    targetText: string
}

export const TextDisplay: React.FC<TextDisplayProps> = ({ targetText }) => {
    const userInput = useSelector((state: RootState) => state.typing.userInput)

    return (
        <div className='text-xl'>
            {targetText.split('').map((char, index) => {
                const isCorrect = userInput[index] === char
                const color = isCorrect ? 'text-green-500' : 'text-red-500'
                return (
                    <span key={index} className={index < userInput.length ? color : 'text-gray-500'}>
            {char}
          </span>
                )
            })}
        </div>
    )
}
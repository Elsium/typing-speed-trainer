import React from 'react'
import {Button} from '@/components/ui'
import {useTextType} from '@/hook'
import {TextType} from '@/services/constants.ts'


export const ChooseTextType: React.FC = () => {
    const {language, setLanguage, textLength, setTextLength} = useTextType()

    return (
        <div className='mb-4'>
            <div className='flex justify-center mb-2'>
                <Button onClick={() => setLanguage(TextType.en)} variant={language !== TextType.en && 'ghost' || 'outline'}>
                    English
                </Button>
                <Button onClick={() => setLanguage(TextType.ru)} variant={language !== TextType.ru && 'ghost' || 'outline'}>
                    Русский
                </Button>
            </div>
            <div className='flex justify-center'>
                <Button onClick={() => setTextLength(TextType.short)} variant={textLength !== TextType.short && 'ghost' || 'outline'}>
                    Короткий
                </Button>
                <Button onClick={() => setTextLength(TextType.long)} variant={textLength !== TextType.long && 'ghost' || 'outline'}>
                    Длинный
                </Button>
            </div>
        </div>
    )
}
import React from 'react'
import {Button} from '@/components/ui'
import {useTextType} from '@/hook'


export const ChooseTextType: React.FC = () => {
    const {language, setLanguage, textLength, setTextLength} = useTextType()

    return (
        <div className='mb-4'>
            <div className='flex justify-center mb-2'>
                <Button onClick={() => setLanguage('en')} variant={language !== 'en' && 'ghost' || 'outline'}>
                    English
                </Button>
                <Button onClick={() => setLanguage('ru')} variant={language !== 'ru' && 'ghost' || 'outline'}>
                    Русский
                </Button>
            </div>
            <div className='flex justify-center'>
                <Button onClick={() => setTextLength('short')} variant={textLength !== 'short' && 'ghost' || 'outline'}>
                    Короткий
                </Button>
                <Button onClick={() => setTextLength('long')} variant={textLength !== 'long' && 'ghost' || 'outline'}>
                    Длинный
                </Button>
            </div>
        </div>
    )
}
import React from 'react'

export const useTextType = () => {
    const [language, setLanguage] = React.useState<'en' | 'ru'>('ru')
    const [textLength, setTextLength] = React.useState<'short' | 'long'>('short')

    return {
        language,
        setLanguage,
        textLength,
        setTextLength
    }
}
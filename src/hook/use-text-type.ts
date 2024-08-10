import React from 'react'
import {TextType} from '@/services/constants.ts'

export const useTextType = () => {
    const [language, setLanguage] = React.useState<TextType.en | TextType.ru>(TextType.ru)
    const [textLength, setTextLength] = React.useState<TextType.short | TextType.long>(TextType.short)

    return {
        language,
        setLanguage,
        textLength,
        setTextLength
    }
}
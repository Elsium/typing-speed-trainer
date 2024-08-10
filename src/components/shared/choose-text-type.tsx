import React from 'react'
import {Button, Separator} from '@/components/ui'
import {useTextType} from '@/hook'
import {TextType} from '@/services/constants.ts'
import {useSelector} from 'react-redux'
import {RootState} from '@/state/store.ts'


export const ChooseTextType: React.FC = () => {
    const {
        language,
        setLanguage,
        textLength,
        setTextLength
    } = useTextType()
    const hasStarted = useSelector((state: RootState) => state.typing.hasStarted)

    return (
        <div className={'flex flex-col gap-y-2 px-2'}>
            <div className={'grid grid-cols-2'}>
                <Button onClick={() => setLanguage(TextType.en)}
                        disabled={hasStarted}
                        variant={language !== TextType.en && 'ghost' || 'secondary'}>
                    English
                </Button>
                <Button onClick={() => setLanguage(TextType.ru)}
                        disabled={hasStarted}
                        variant={language !== TextType.ru && 'ghost' || 'secondary'}>
                    Русский
                </Button>
            </div>
            <Separator/>
            <div className={'grid grid-cols-2'}>
                <Button onClick={() => setTextLength(TextType.short)}
                        disabled={hasStarted}
                        variant={textLength !== TextType.short && 'ghost' || 'secondary'}>
                    Короткий
                </Button>
                <Button onClick={() => setTextLength(TextType.long)}
                        disabled={hasStarted}
                        variant={textLength !== TextType.long && 'ghost' || 'secondary'}>
                    Длинный
                </Button>
            </div>
        </div>
    )
}
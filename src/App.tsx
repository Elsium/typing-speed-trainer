import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '@/state/store.ts'
import {TextDisplay, TextInput, Statistics, ResultScreen, ChooseTextType, Header, Container} from '@/components/shared'
import {Button} from '@/components/ui'
import {useFetchTexts, useTyping} from '@/hook'


const App: React.FC = () => {
    const texts = useSelector((state: RootState) => state.texts)
    const {language, textLength} = useSelector((state: RootState) => state.textType)
    const {hasStarted, targetText, handleStart, isFinished} = useTyping({texts, language, textLength})

    useFetchTexts()

    return (
        <section>
            <Header/>
            <Container className={'flex justify-between gap-20 flex-col md:flex-row'}>
                <div className={'w-auto md:w-1/4 flex flex-col gap-4'}>
                    <ChooseTextType/>
                    {hasStarted && !isFinished && <Statistics className={'-order-1 md:order-none'}/>}
                </div>
                <div className={'w-full md:w-1/2 h-full flex justify-center items-center -order-1 md:order-none'}>
                    {!hasStarted && !isFinished
                        && <Button onClick={handleStart}>
                            Старт
                        </Button>}
                    {!hasStarted && isFinished && <ResultScreen targetText={targetText} onRestart={handleStart}/>}
                    {hasStarted && !isFinished && (
                        <>
                            <TextDisplay targetText={targetText}/>
                            <TextInput/>
                        </>
                    )}
                </div>
            </Container>
        </section>
    )
}

export default React.memo(App)

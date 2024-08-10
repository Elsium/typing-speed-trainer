import React from 'react'
import {Container} from '@/components/shared'
import {Separator} from '@/components/ui'
import {cn} from '@/lib/utils.ts'

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className = {cn('mb-4', className)}>
            <Container className={'flex items-center gap-2 py-3 px-2'}>
                <img src={'/Typing.svg'} alt={'T'} className={'w-10'}/>
                <h1 className='text-xl md:text-3xl font-bold'>Typing Speed Trainer</h1>
            </Container>
            <Separator/>
        </header>
    )
}
import React from 'react'
import axios from 'axios'
import {Language} from '@/services/constants.ts'
import {setLongTextsEn, setLongTextsRu, setShortTextsEn, setShortTextsRu} from '@/state/features/textSlice.ts'
import {useDispatch} from 'react-redux'
import {PayloadAction} from '@reduxjs/toolkit'
/*
 * Хук для получения текстов из API (см. services/constants.ts)
 */

export const useFetchTexts = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchAndDispatch = async (
            url: string,
            action: (data: string[]) => PayloadAction<string[]>,
        ) => {
            try {
                const response = await axios.get(url)
                dispatch(action(response.data))
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error)
            }
        }

        const fetchTexts = async () => {
            await Promise.all([
                fetchAndDispatch(Language.shortEng, setShortTextsEn),
                fetchAndDispatch(Language.longEng, setLongTextsEn),
                fetchAndDispatch(Language.shortRu, setShortTextsRu),
                fetchAndDispatch(Language.longRu, setLongTextsRu),
            ])
        }

        fetchTexts()
    }, [dispatch])
}
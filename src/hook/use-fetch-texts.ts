import React from 'react'
import axios from 'axios'
import {Language} from '@/services/constants.ts'
import {setLongTextsEn, setLongTextsRu, setShortTextsEn, setShortTextsRu} from '@/state/features/textSlice.ts'
import {useDispatch} from 'react-redux'

export const useFetchTexts = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchTexts = async () => {
            try {
                const resShortEng = await axios.get(Language.shortEng)
                const resLongEng = await axios.get(Language.longEng)
                const resShortRu = await axios.get(Language.shortRu)
                const resLongRu = await axios.get(Language.longRu)
                dispatch(setShortTextsEn(resShortEng.data))
                dispatch(setLongTextsEn(resLongEng.data))
                dispatch(setShortTextsRu(resShortRu.data))
                dispatch(setLongTextsRu(resLongRu.data))
            } catch (error) {
                console.error('Error fetching texts:', error)
            }
        }
        fetchTexts()
    }, [dispatch])
}
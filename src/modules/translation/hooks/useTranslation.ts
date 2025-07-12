import { useEffect } from 'react';
import {
    type TranslateRequest, type TranslateResponse,
    useTranslateMutation
} from '../api/service';
import {useDebounce} from "../../../core/hooks/useDebounce.ts";

export const useTranslate = (autoPlayVoice = false) => {
    const [translate, result] = useTranslateMutation();

    const debounced = useDebounce(
        (payload: TranslateRequest) => translate(payload),
        300
    );

    useEffect(() => {
        if (
            autoPlayVoice &&
            result.isSuccess &&
            result.data?.audioContent
        ) {
            new Audio(
                `data:audio/mp3;base64,${result.data.audioContent}`
            ).play().catch(console.error);
        }
    }, [autoPlayVoice, result]);

    return {
        translate: debounced,
        data: result.data as TranslateResponse | undefined,
        isLoading: result.isLoading,
        isError: result.isError,
        error: result.error,
    };
};

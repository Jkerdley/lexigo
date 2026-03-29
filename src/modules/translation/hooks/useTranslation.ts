import { useEffect, useCallback } from "react";
import { type TranslateRequest, type TranslateResponse, useTranslateMutation } from "../api/service";
import { useDebounce } from "../../../core/hooks/useDebounce";

export const useTranslate = (autoPlayVoice = false) => {
  const [translateMutation, result] = useTranslateMutation();

  const stableTranslate = useCallback(
    (payload: TranslateRequest) => {
      translateMutation(payload);
    },
    [translateMutation],
  );

  const debounced = useDebounce(stableTranslate, 400);

  useEffect(() => {
    if (autoPlayVoice && result.isSuccess && result.data?.audioContent) {
      new Audio(`data:audio/mp3;base64,${result.data.audioContent}`).play().catch(console.error);
    }
  }, [autoPlayVoice, result]);

  return {
    translate: debounced,
    data: result.data as TranslateResponse | undefined,
    isLoading: result.isLoading,
    isSuccess: result.isSuccess,
    error: result.error,
  };
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockTranslateApi } from "../../../bff/translationBff";

export interface TranslateRequest {
  text: string;
  target?: string;
  source?: string;
  speak?: boolean;
  gender?: "FEMALE" | "MALE" | "NEUTRAL";
}
export interface TranslateResponse {
  translatedText: string;
  detectedSourceLanguage?: string;
  audioContent?: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    translate: builder.mutation<TranslateResponse, TranslateRequest>({
      queryFn: async (arg) => {
        try {
          const result = await mockTranslateApi(arg);
          return { data: result };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error instanceof Error ? error.message : "Не удалось перевести",
            },
          };
        }
      },
    }),
  }),
});

export const { useTranslateMutation } = api;

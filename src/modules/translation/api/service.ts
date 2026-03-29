import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

const ENDPOINT = "https://api.keramis.com.ua/hackathon/translate/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    fetchFn: async (input, init) => {
      if (init?.body && typeof init.body !== "string") {
        init.body = JSON.stringify(init.body);
      }
      return fetch(input, init);
    },
  }),
  endpoints: (builder) => ({
    translate: builder.mutation<TranslateResponse, TranslateRequest>({
      query: (body) => ({
        url: "",
        method: "POST",
        body: {
          target: "ru",
          ...body,
        },
      }),
    }),
  }),
});

export const { useTranslateMutation } = api;

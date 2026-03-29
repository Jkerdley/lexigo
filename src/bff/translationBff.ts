import { type TranslateRequest, type TranslateResponse } from "../modules/translation/api/service";

export const mockTranslateApi = async (body: TranslateRequest): Promise<TranslateResponse> => {
  const { text, source, target } = body;

  const sl = source?.toLowerCase() || "auto";
  const tl = target?.toLowerCase() || "ru";

  try {
    const url = `/api/proxy-google?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API Error: ${response.statusText}`);
    }

    const data = await response.json();

    const translatedText = data[0].map((item: any) => item[0]).join("");

    return {
      translatedText,
      detectedSourceLanguage: sl,
      audioContent: undefined,
    };
  } catch (error) {
    console.error("BFF Translation Error:", error);
    throw error;
  }
};

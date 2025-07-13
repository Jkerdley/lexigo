import { useAppSelector } from "../../../core/store/store.ts";

export const useCurrentTranslation = () => useAppSelector((s) => s.currentTranslation.current);

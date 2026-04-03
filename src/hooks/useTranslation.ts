import { translations, type TranslationKey } from '../i18n/translations';
import { useStore } from './useStore';

export function useTranslation() {
  const locale = useStore((s) => s.locale);
  const t = (key: TranslationKey | string): string => {
    const dict = translations[locale] as Record<string, string>;
    return dict[key] ?? key;
  };
  return { t, locale };
}

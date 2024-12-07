import { fr } from '../translations/fr';

export const useTranslation = () => {
  // For now, we'll only support French
  // In the future, this could be expanded to support multiple languages
  return {
    t: (path: string) => {
      return path.split('.').reduce((obj, key) => obj?.[key], fr as any) || path;
    },
  };
};
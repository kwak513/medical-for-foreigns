import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // 번역 파일을 HTTP로 불러오기 위함

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ko',
        supportedLngs: ['ko', 'en'],
        debug: true,
        detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        },
        react: {
        useSuspense: false,
        },
        backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
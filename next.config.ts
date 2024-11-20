import i18n from "@/i18n";
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  "compilerOptions": {
    "baseUrl": "./src"
  },
  i18n: {
    locales: ['en', 'ar', 'tr'], // اللغات المدعومة
    defaultLocale: 'en', // اللغة الافتراضية
    localeDetection: undefined, // الكشف التلقائي عن اللغة
  },
  localePath: path.resolve('./assets/languages'), // مسار ملفات الترجمة
  reactStrictMode: true,
};

export default nextConfig;

import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations("hero");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
            <p className="mt-4 text-xl text-center text-gray-600">
                {t("subtitle")}
            </p>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg">
                {t("cta")}
            </button>
        </main>
    );
}

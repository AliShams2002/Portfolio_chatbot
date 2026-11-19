import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دستیار هوشمند پورتفولیو",
  description:
    "با دستیار هوشمند پورتفولیو درباره پروژه‌ها، مهارت‌ها و سوابق حرفه‌ای گفت‌وگو کنید.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

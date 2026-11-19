# دستیار هوشمند پورتفولیو

یک چت‌بات استریم‌شونده برای پورتفولیو که به بازدیدکنندگان کمک می‌کند درباره پروژه‌ها، مهارت‌ها و سوابق حرفه‌ای سؤال کنند. پاسخ‌ها با Gemini تولید می‌شوند و محتوای مرجع از فایل Markdown محلی خوانده می‌شود.

## فناوری‌ها

- Next.js 14 و App Router
- TypeScript
- Tailwind CSS با پشتیبانی از حالت تاریک
- Vercel AI SDK (`ai`)
- Google Gemini از طریق `@ai-sdk/google`

## راه‌اندازی

### پیش‌نیازها

- Node.js 20.9 یا بالاتر
- npm
- کلید API گوگل Gemini

### نصب و تنظیم کلید API

```bash
npm install
```

از فایل نمونه یک فایل محلی بسازید:

```bash
cp .env.local.example .env.local
```

سپس مقدار `GOOGLE_GENERATIVE_AI_API_KEY` را در `.env.local` قرار دهید. کلید Gemini را می‌توانید از [Google AI Studio](https://aistudio.google.com/apikey) دریافت کنید. این فایل در Git نادیده گرفته می‌شود؛ کلید را در کد یا مخزن عمومی قرار ندهید.

### شخصی‌سازی محتوا

فایل [`content/portfolio.md`](./content/portfolio.md) را با نام، پروژه‌ها، مهارت‌ها و سوابق واقعی خودتان تکمیل کنید. دستیار فقط از محتوای همین فایل برای پاسخ به پرسش‌های مربوط به پورتفولیو استفاده می‌کند.

### اجرا

```bash
npm run dev
```

برنامه را در [http://localhost:3000](http://localhost:3000) باز کنید.

برای ساخت نسخه تولید:

```bash
npm run build
npm run start
```

## ساختار پروژه

```text
app/
├── api/chat/route.ts   # API استریم چت
├── globals.css         # استایل‌های عمومی
├── layout.tsx          # قالب و metadata
└── page.tsx            # صفحه اصلی پورتفولیو
components/
├── Chat.tsx            # رابط چت و مدیریت پیام‌ها
├── ChatInput.tsx       # فرم ارسال پیام
└── ChatMessage.tsx     # نمایش پیام‌ها
content/
└── portfolio.md        # اطلاعات مرجع پورتفولیو
lib/
└── portfolio.ts        # خواندن محتوای پورتفولیو
```

## تصویر برنامه

> پس از اجرا، تصویر برنامه را اینجا اضافه کنید.

## استقرار روی Vercel

مخزن را به Vercel متصل کنید و متغیر محیطی `GOOGLE_GENERATIVE_AI_API_KEY` را در تنظیمات پروژه تعریف کنید. فایل `content/portfolio.md` باید همراه کد در مخزن موجود باشد.

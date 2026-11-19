import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <main className="relative flex min-h-screen h-full flex-col items-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-80 right-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10"
      />

      <div className="relative z-10 mb-7 text-center sm:mb-9">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/70 px-3 py-1.5 text-xs font-medium text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-slate-900/60 dark:text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          گفت‌وگوی هوشمند درباره پورتفولیو
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          پورتفولیوی <span className="text-indigo-600 dark:text-indigo-400">[علی شمس الدین]</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500 dark:text-slate-400">
          کنجکاوید بیشتر بدانید؟ از دستیار هوشمند درباره پروژه‌ها، مهارت‌ها و
          تجربه‌های حرفه‌ای بپرسید.
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-1 justify-center">
        <Chat />
      </div>

      <footer className="relative z-10 mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
        طراحی‌شده با هوش مصنوعی و با دقت به جزئیات
      </footer>
    </main>
  );
}

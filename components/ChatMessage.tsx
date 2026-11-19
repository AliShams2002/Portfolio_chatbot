type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full animate-fade-in ${isUser ? "justify-start" : "justify-end"}`}
      dir="rtl"
    >
      {!isUser && (
        <div
          aria-hidden="true"
          className="ml-3 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-base text-white shadow-md shadow-indigo-500/20"
        >
          ✦
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-[78%] ${
          isUser
            ? "rounded-tr-md bg-gradient-to-br from-indigo-600 to-violet-600 text-white"
            : "rounded-tl-md border border-slate-200/80 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
      {isUser && (
        <div
          aria-hidden="true"
          className="mr-3 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          شما
        </div>
      )}
    </div>
  );
}

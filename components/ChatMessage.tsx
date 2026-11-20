"use client";

import { useEffect, useState } from "react";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

const WORD_REVEAL_INTERVAL_MS = 35;

export function ChatMessage({
  role,
  content,
  isStreaming = false,
}: ChatMessageProps) {
  const isUser = role === "user";
  const [visibleLength, setVisibleLength] = useState(
    isUser ? content.length : 0,
  );

  useEffect(() => {
    if (isUser) {
      setVisibleLength(content.length);
      return;
    }

    if (visibleLength >= content.length) {
      return;
    }

    let nextLength = visibleLength;
    while (nextLength < content.length && /\s/u.test(content[nextLength])) {
      nextLength += 1;
    }
    while (nextLength < content.length && !/\s/u.test(content[nextLength])) {
      nextLength += 1;
    }

    if (nextLength === visibleLength) {
      return;
    }

    const hasWordBoundary =
      nextLength < content.length || /\s/u.test(content.at(-1) ?? "");
    if (isStreaming && !hasWordBoundary) {
      return;
    }

    const timeout = setTimeout(
      () => setVisibleLength(nextLength),
      WORD_REVEAL_INTERVAL_MS,
    );
    return () => clearTimeout(timeout);
  }, [content, isStreaming, isUser, visibleLength]);

  const visibleContent = content.slice(0, visibleLength);

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
        <p className="whitespace-pre-wrap">
          {visibleContent}
          {!isUser && visibleLength < content.length && (
            <span
              aria-hidden="true"
              className="mr-0.5 inline-block h-4 w-0.5 animate-pulse rounded-full bg-current align-middle"
            />
          )}
        </p>
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

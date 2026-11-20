"use client";

import { useChat } from "@ai-sdk/react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";

export function Chat() {
  const { messages, sendMessage, status, error, stop } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  const latestMessage = messages.at(-1);
  const latestAssistantText =
    latestMessage?.role === "assistant"
      ? latestMessage.parts
          .filter((part) => part.type === "text")
          .map((part) => (part.type === "text" ? part.text : ""))
          .join("")
      : "";
  const isWaitingForFirstToken =
    status === "submitted" ||
    (status === "streaming" && latestAssistantText.length === 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (error && isLoading) {
      stop();
    }
  }, [error, isLoading, stop]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    setInput("");
    void sendMessage({ text }).catch((sendError: unknown) => {
      console.error("Chat message failed:", sendError);
    });
  };

  return (
    <section
      aria-label="گفت‌وگو با دستیار هوشمند"
      className="flex h-[min(680px,calc(100dvh-220px))] min-h-[440px] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-panel backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80 sm:h-[620px]"
      dir="rtl"
    >
      <header className="flex items-center gap-4 border-b border-slate-200/80 px-5 py-4 dark:border-slate-700/80 sm:px-7">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl text-white shadow-lg shadow-indigo-500/20">
          🤖
          <span
            aria-label="آنلاین"
            className="absolute -bottom-1 -left-1 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-emerald-400 dark:border-slate-900"
          />
        </div>
        <div className="min-w-0">
          <h2 className="font-bold text-slate-900 dark:text-white">
            دستیار هوشمند
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            درباره پروژه‌ها، مهارت‌ها و تجربه‌ها بپرسید
          </p>
        </div>
        <div className="mr-auto hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          آماده پاسخ‌گویی
        </div>
      </header>

      <div
        className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-7"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {messages.length === 0 ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl dark:bg-indigo-400/10">
              ✨
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              خوش اومدی!
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
              من اینجام تا درباره پروژه‌ها، مهارت‌ها و مسیر حرفه‌ای صاحب این
              پورتفولیو بهت کمک کنم.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["درباره پروژه‌ها بگو", "با چه فناوری‌هایی کار می‌کنی؟"].map(
                (suggestion) => (
                  <span
                    key={suggestion}
                    className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400"
                  >
                    {suggestion}
                  </span>
                ),
              )}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            if (message.role !== "user" && message.role !== "assistant") {
              return null;
            }

            return (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.parts
                  .filter((part) => part.type === "text")
                  .map((part) => (part.type === "text" ? part.text : ""))
                  .join("")}
                isStreaming={
                  message.id === latestMessage?.id && status === "streaming"
                }
              />
            );
          })
        )}

        {isWaitingForFirstToken && (
          <div
            className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"
            role="status"
          >
            <span className="flex gap-1">
              <span className="h-2 w-2 animate-soft-pulse rounded-full bg-indigo-500" />
              <span className="h-2 w-2 animate-soft-pulse rounded-full bg-indigo-500 [animation-delay:200ms]" />
              <span className="h-2 w-2 animate-soft-pulse rounded-full bg-indigo-500 [animation-delay:400ms]" />
            </span>
            در حال تایپ...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300"
          >
            {error.message === "An error occurred."
              ? "پاسخ‌گویی با خطا روبه‌رو شد. ترمینال سرور را برای جزئیات بررسی کنید."
              : error.message}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200/80 bg-white/50 p-4 dark:border-slate-700/80 dark:bg-slate-900/50 sm:px-6 sm:py-5">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <p className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
          پاسخ‌ها بر اساس اطلاعات ثبت‌شده در پورتفولیو هستند.
        </p>
      </div>
    </section>
  );
}

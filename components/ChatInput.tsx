"use client";

import type { ChangeEvent, FormEvent } from "react";

type ChatInputProps = {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export function ChatInput({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const isDisabled = isLoading || input.trim().length === 0;

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-indigo-500"
      dir="rtl"
    >
      <label className="sr-only" htmlFor="chat-input">
        پیام خود را بنویسید
      </label>
      <input
        id="chat-input"
        name="message"
        value={input}
        onChange={handleInputChange}
        placeholder="درباره پروژه‌ها یا مهارت‌ها بپرسید..."
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      <button
        type="submit"
        disabled={isDisabled}
        aria-label="ارسال پیام"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
      >
        {isLoading ? (
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </form>
  );
}

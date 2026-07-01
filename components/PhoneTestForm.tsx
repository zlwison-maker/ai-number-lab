"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const loadingSteps = [
  "正在分析号码结构...",
  "正在计算易记指数...",
  "正在生成娱乐报告..."
];

export function PhoneTestForm() {
  const router = useRouter();
  const [digits, setDigits] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const formattedPhone = useMemo(() => formatPhone(digits), [digits]);
  const isReady = /^1[3-9]\d{9}$/.test(digits);

  function handleChange(value: string) {
    setDigits(value.replace(/\D/g, "").slice(0, 11));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isReady || isLoading) {
      return;
    }

    setIsLoading(true);
    setStepIndex(0);
    window.setTimeout(() => setStepIndex(1), 420);
    window.setTimeout(() => setStepIndex(2), 840);
    window.setTimeout(() => router.push(`/result?phone=${digits}`), 1250);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border-y border-neutral-200 py-8"
      data-analytics="phone-test-form"
    >
      <label
        htmlFor="phone"
        className="mb-3 block text-sm font-medium text-neutral-500"
      >
        请输入手机号
      </label>
      <input type="hidden" name="phone" value={digits} />
      <input
        id="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        value={formattedPhone}
        onChange={(event) => handleChange(event.target.value)}
        maxLength={13}
        required
        placeholder="请输入手机号"
        aria-invalid={digits.length > 0 && !isReady}
        className="h-16 w-full border-0 border-b border-neutral-950 bg-transparent px-0 text-3xl font-semibold tracking-normal text-neutral-950 outline-none placeholder:text-neutral-300 focus:border-neutral-500"
      />
      <button
        type="submit"
        disabled={!isReady || isLoading}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-neutral-950 px-5 text-base font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-[#f7f7f5] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
      >
        {isLoading ? loadingSteps[stepIndex] : "立即测评"}
      </button>
      <p className="mt-5 text-center text-xs leading-5 text-neutral-500">
        仅供娱乐参考，不作为任何交易或估值依据。
      </p>
    </form>
  );
}

function formatPhone(input: string) {
  const first = input.slice(0, 3);
  const second = input.slice(3, 7);
  const third = input.slice(7, 11);

  return [first, second, third].filter(Boolean).join(" ");
}

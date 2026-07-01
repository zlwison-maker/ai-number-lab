"use client";

import { useState } from "react";

export function ShareButton({ value }: { value: number }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = `我刚测了手机号娱乐估值：¥${value.toLocaleString("zh-CN")}\n你也来看看你的手机号有多特别👇\n${window.location.href}`;
    const shareData = {
      title: "AI 手机号娱乐测评",
      text,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-12 w-full items-center justify-center rounded-md border border-neutral-950 bg-transparent px-5 text-base font-medium text-neutral-950 transition hover:bg-neutral-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-[#f7f7f5] sm:w-auto"
      data-analytics="share-click"
    >
      {copied ? "已复制分享文案" : "分享给朋友"}
    </button>
  );
}

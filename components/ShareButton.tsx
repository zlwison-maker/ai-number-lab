"use client";

import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const shareData = {
      title: "AI 手机号娱乐测评",
      text: "看看我的手机号有多特别",
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
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
      {copied ? "链接已复制" : "分享给朋友"}
    </button>
  );
}

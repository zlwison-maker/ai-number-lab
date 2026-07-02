import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 手机号娱乐测评｜看看你的手机号有多特别",
  description: "输入手机号，生成一份 AI 娱乐分析报告，仅供娱乐参考。",
  metadataBase: new URL("https://numberlab.vip"),
  openGraph: {
    title: "AI 手机号娱乐测评",
    description: "看看你的手机号有多特别。",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f5"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}

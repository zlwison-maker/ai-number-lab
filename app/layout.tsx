import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import "./globals.css";

const siteUrl = "https://numberlab.vip";
const title = "AI 手机号娱乐测评｜看看你的手机号有多特别";
const description = "输入手机号，生成一份 AI 娱乐分析报告，仅供娱乐参考。";
const ogImage = "/opengraph-image";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/icon.svg"
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "AI Number Lab",
    locale: "zh_CN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "AI Number Lab 手机号娱乐测评"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage]
  },
  other: {
    "baidu-site-verification": "codeva-4Dm0zkfpnf"
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
        <MicrosoftClarity />
      </body>
    </html>
  );
}

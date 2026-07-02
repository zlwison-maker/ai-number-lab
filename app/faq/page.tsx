import type { Metadata } from "next";
import Link from "next/link";

const title = "常见问题｜AI Number Lab 手机号娱乐测评";
const description =
  "了解 AI Number Lab 手机号娱乐测评是否真实、结果依据、隐私保存、收费方式和后续支持的号码类型。";

const faqs = [
  {
    question: "手机号测评是真的吗？",
    answer:
      "AI Number Lab 的手机号测评是娱乐内容，不是真实估价，也不是运势判断。它会根据号码中的重复、连续、尾号结构和易记程度生成一份轻量报告，适合满足好奇心和分享。"
  },
  {
    question: "AI Number Lab 的结果依据是什么？",
    answer:
      "结果主要依据数字结构，包括重复数字、连续数字、尾号组合、数字分布均衡程度，以及 6、8、9 等常见偏好数字。所有分数和文案都由固定算法生成，不接入人工判断。"
  },
  {
    question: "为什么同一个号码在不同平台结果不同？",
    answer:
      "不同平台使用的规则、权重和表达方式都不一样。有的平台强调价格感，有的平台强调记忆度，AI Number Lab 更关注娱乐参考和数字结构解读，所以结果不同是正常的。"
  },
  {
    question: "手机号分数越高越好吗？",
    answer:
      "分数越高通常代表号码在本平台规则里更整齐、更顺口或更容易被记住。但手机号是否适合自己，还取决于使用习惯、号码归属、联系成本和个人偏好。"
  },
  {
    question: "这个结果可以作为换号依据吗？",
    answer:
      "不建议把测评结果作为唯一依据。换号涉及联系人迁移、账号绑定、安全验证和长期使用成本。AI Number Lab 的结果更适合做轻松参考，不适合作为正式决策依据。"
  },
  {
    question: "是否会保存我的手机号？",
    answer:
      "当前 MVP 不提供登录和数据库功能，也不会把手机号保存到站内数据库。测评结果基于页面参数和服务端算法即时生成。"
  },
  {
    question: "这个网站是否收费？",
    answer:
      "当前版本免费使用。你可以输入手机号生成娱乐测评报告，也可以复制链接或分享给朋友。后续如有新功能，会保持清晰说明。"
  },
  {
    question: "后续会支持哪些号码类型？",
    answer:
      "后续可能支持车牌号、微信号、QQ 号、生日、幸运数字等数字类娱乐测评。第一版会优先把手机号测评体验做轻、做稳。"
  }
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/faq"
  },
  openGraph: {
    title,
    description,
    url: "/faq",
    type: "article"
  }
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <main className="px-5 py-8 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto w-full max-w-4xl border-b border-neutral-200 pb-10 pt-4">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
        >
          AI Number Lab
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
          常见问题
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
          关于手机号娱乐测评、结果依据、隐私和后续功能，这里用更直白的方式说明。
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl divide-y divide-neutral-200">
        {faqs.map((item) => (
          <article key={item.question} className="py-8">
            <h2 className="text-xl font-semibold leading-8 text-neutral-950">
              {item.question}
            </h2>
            <p className="mt-3 text-base leading-8 text-neutral-600">
              {item.answer}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-3 border-t border-neutral-200 py-8 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          回首页测评
        </Link>
        <Link
          href="/phone-number-meaning"
          className="inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
        >
          查看数字寓意
        </Link>
      </section>
    </main>
  );
}

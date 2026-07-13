import { PhoneTestForm } from "@/components/PhoneTestForm";
import Link from "next/link";

const siteUrl = "https://www.numberlab.vip";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Number Lab",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/result?phone={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Number Lab",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`
  }
];

const featuredTopics = [
  {
    href: "/phone-number-fortune",
    title: "手机号吉凶测算",
    description: "用娱乐方式看号码结构、尾号记忆点和读法节奏。"
  },
  {
    href: "/phone-number-energy",
    title: "手机号数字能量",
    description: "把数字能量理解为结构、记忆度和文化联想。"
  },
  {
    href: "/how-to-choose-phone-number",
    title: "手机号怎么选",
    description: "从实用、好记、顺口和长期使用成本来判断。"
  },
  {
    href: "/phone-number-meaning-guide",
    title: "手机号数字寓意",
    description: "轻松理解 0-9 和常见组合，不做迷信承诺。"
  }
];

export default function Home() {
  return (
    <main className="px-5 py-8 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-5xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-neutral-950" />
            AI Number Lab
          </div>

          <p className="mb-5 text-sm font-medium text-neutral-500">
            AI 手机号娱乐测评
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-normal text-neutral-950 sm:text-7xl">
            你的手机号，
            <br />
            到底有多特别？
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
            基于号码规律、易记程度、数字结构和娱乐偏好，生成一份仅供娱乐参考的 AI 测评报告。
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-px border-y border-neutral-200 bg-neutral-200 text-sm text-neutral-600">
            {["号码结构", "易记程度", "娱乐偏好"].map((item) => (
              <div key={item} className="bg-[#f7f7f5] py-4 text-center">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-500">
            已为很多用户生成过专属号码报告
          </p>
        </div>

        <PhoneTestForm />
      </section>

      <section className="mx-auto w-full max-w-5xl border-t border-neutral-200 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-medium text-neutral-500">了解 AI Number Lab</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-neutral-950 sm:text-4xl">
              用轻松的方式，看看一个号码有哪些记忆点。
            </h2>
          </div>

          <div className="space-y-9">
            <ContentBlock title="什么是 AI 手机号测评？">
              AI 手机号测评是一种基于数字结构的娱乐分析。它会观察手机号中的重复数字、连续数字、尾号组合、易记程度和常见数字偏好，再生成一份轻量报告，帮助你从另一个角度看看这个号码是否顺口、好记、有辨识度。
            </ContentBlock>

            <ContentBlock title="这个测评适合什么场景？">
              它适合在换号前做个参考、和朋友分享测试结果、给常用号码找一个有趣标签，或者单纯满足对数字组合的好奇心。结果更像一份数字文化小测验，不适合作为交易、估值或重大决策依据。
            </ContentBlock>

            <ContentBlock title="结果如何解读？">
              娱乐估值、记忆度、稀缺度、幸运值等指标都来自同一套固定算法。同一个手机号每次会得到一致结果。分数越高通常代表结构更整齐、更容易记住，但不代表真实价格，也不代表未来运势。
            </ContentBlock>

            <ContentBlock title="仅供娱乐参考的免责声明">
              AI Number Lab 不保存手机号，不提供号码买卖、真实估价、投资建议或命运判断。页面中的分析文本和数值仅用于娱乐阅读，目的是提供轻松、有分享感的数字内容。
            </ContentBlock>

            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-7 sm:flex-row sm:items-center">
              <Link
                href="/faq"
                className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                常见问题
              </Link>
              <Link
                href="/phone-number-meaning"
                className="inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
              >
                数字寓意
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl border-t border-neutral-200 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-medium text-neutral-500">专题推荐</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-neutral-950 sm:text-4xl">
              先了解号码，再测评你的手机号。
            </h2>
          </div>

          <div className="grid gap-px bg-neutral-200 sm:grid-cols-2">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="bg-[#f7f7f5] p-5 transition hover:bg-white"
              >
                <h3 className="text-lg font-semibold text-neutral-950">
                  {topic.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ContentBlock({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
      <p className="mt-3 text-base leading-8 text-neutral-600">{children}</p>
    </section>
  );
}

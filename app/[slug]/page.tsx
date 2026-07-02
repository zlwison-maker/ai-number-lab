import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPhoneNumberMeaningPage,
  phoneNumberMeaningPages
} from "@/lib/programmaticSeo";
import { getSeoLandingPage, seoLandingPages } from "@/lib/seoLandingPages";

type PhoneNumberSeoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: PhoneNumberSeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPhoneNumberMeaningPage(slug);
  const landingPage = getSeoLandingPage(slug);

  if (landingPage) {
    return {
      title: landingPage.title,
      description: landingPage.description,
      alternates: {
        canonical: `/${landingPage.slug}`
      },
      openGraph: {
        title: landingPage.title,
        description: landingPage.description,
        url: `/${landingPage.slug}`,
        type: "article"
      },
      twitter: {
        card: "summary_large_image",
        title: landingPage.title,
        description: landingPage.description,
        images: ["/opengraph-image"]
      }
    };
  }

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image"]
    }
  };
}

export default async function PhoneNumberSeoPage({
  params
}: PhoneNumberSeoPageProps) {
  const { slug } = await params;
  const page = getPhoneNumberMeaningPage(slug);
  const landingPage = getSeoLandingPage(slug);

  if (landingPage) {
    return <SeoLandingPage page={landingPage} />;
  }

  if (!page) {
    notFound();
  }

  const relatedPages = phoneNumberMeaningPages
    .filter((item) => item.slug !== page.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
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

      <article className="mx-auto w-full max-w-4xl">
        <header className="border-b border-neutral-200 pb-10 pt-4">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            AI Number Lab
          </Link>
          <p className="mt-8 text-sm font-medium text-neutral-500">
            手机号数字寓意
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            下面从常见寓意、受欢迎原因、易记程度、娱乐指数和尾号适配度几个角度，轻松看看 {page.combo} 这个数字组合。
          </p>
        </header>

        <section className="grid gap-px border-b border-neutral-200 bg-neutral-200 py-10 sm:grid-cols-2">
          <MeaningBlock title="这个数字组合常见寓意">
            {page.commonMeaning}
          </MeaningBlock>
          <MeaningBlock title="为什么很多人喜欢它">
            {page.whyPeopleLikeIt}
          </MeaningBlock>
          <MeaningBlock title="易记程度分析">
            {page.memoryAnalysis}
          </MeaningBlock>
          <MeaningBlock title="娱乐指数分析">
            {page.entertainmentAnalysis}
          </MeaningBlock>
        </section>

        <section className="grid gap-10 border-b border-neutral-200 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="number-tabular text-7xl font-semibold leading-none text-neutral-950 sm:text-8xl">
              {page.combo}
            </p>
            <p className="mt-4 text-sm font-medium text-neutral-500">
              适合作为手机号尾号吗？
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-neutral-950">
              是否适合作为手机号尾号
            </h2>
            <p className="mt-4 text-base leading-8 text-neutral-600">
              {page.suffixFit}
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-500">
              娱乐参考免责声明：本页只解释常见数字文化、记忆点和娱乐测评语境，不提供号码买卖、真实估价、投资建议或运势判断。
            </p>
          </div>
        </section>

        <section className="border-b border-neutral-200 py-10">
          <h2 className="text-2xl font-semibold text-neutral-950">常见问题</h2>
          <div className="mt-6 divide-y divide-neutral-200">
            {page.faq.map((item) => (
              <section key={item.question} className="py-6 first:pt-0">
                <h3 className="text-lg font-semibold leading-8 text-neutral-950">
                  {item.question}
                </h3>
                <p className="mt-2 text-base leading-8 text-neutral-600">
                  {item.answer}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="border-b border-neutral-200 py-10">
          <h2 className="text-2xl font-semibold text-neutral-950">
            更多数字寓意
          </h2>
          <div className="mt-6 grid gap-px bg-neutral-200 sm:grid-cols-2">
            {relatedPages.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="bg-[#f7f7f5] p-5 transition hover:bg-white"
              >
                <p className="number-tabular text-3xl font-semibold text-neutral-950">
                  {item.combo}
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {item.h1}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            立即测评你的手机号
          </Link>
          <Link
            href="/phone-number-meaning"
            className="inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            返回数字寓意页
          </Link>
        </section>
      </article>
    </main>
  );
}

function MeaningBlock({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#f7f7f5] p-6">
      <h2 className="text-xl font-semibold text-neutral-950">{title}</h2>
      <p className="mt-4 text-base leading-8 text-neutral-600">{children}</p>
    </section>
  );
}

function SeoLandingPage({
  page
}: {
  page: NonNullable<ReturnType<typeof getSeoLandingPage>>;
}) {
  const relatedPages = seoLandingPages
    .filter((item) => item.slug !== page.slug)
    .slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: `https://numberlab.vip/${page.slug}`,
    author: {
      "@type": "Organization",
      name: "AI Number Lab"
    },
    publisher: {
      "@type": "Organization",
      name: "AI Number Lab",
      logo: {
        "@type": "ImageObject",
        url: "https://numberlab.vip/icon.svg"
      }
    }
  };

  return (
    <main className="px-5 py-8 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto w-full max-w-4xl">
        <header className="border-b border-neutral-200 pb-10 pt-4">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            AI Number Lab
          </Link>
          <p className="mt-8 text-sm font-medium text-neutral-500">
            手机号专题
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            {page.intro}
          </p>
        </header>

        <section className="border-b border-neutral-200 py-10">
          <div className="space-y-11">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold leading-tight text-neutral-950">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-neutral-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-b border-neutral-200 py-10">
          <h2 className="text-2xl font-semibold text-neutral-950">常见问题</h2>
          <div className="mt-6 divide-y divide-neutral-200">
            {page.faq.map((item) => (
              <section key={item.question} className="py-6 first:pt-0">
                <h3 className="text-lg font-semibold leading-8 text-neutral-950">
                  {item.question}
                </h3>
                <p className="mt-2 text-base leading-8 text-neutral-600">
                  {item.answer}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-neutral-200 py-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-neutral-950">
              娱乐免责声明
            </h2>
          </div>
          <p className="text-base leading-8 text-neutral-600">
            本页内容仅用于解释手机号数字结构、常见文化联想和娱乐测评思路，不提供号码买卖、真实估价、投资建议、运势判断或任何结果承诺。请把它当作轻松参考，真正选择号码时仍以实际使用体验为准。
          </p>
        </section>

        <section className="border-b border-neutral-200 py-10">
          <h2 className="text-2xl font-semibold text-neutral-950">
            相关专题
          </h2>
          <div className="mt-6 grid gap-px bg-neutral-200 sm:grid-cols-2">
            {relatedPages.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="bg-[#f7f7f5] p-5 transition hover:bg-white"
              >
                <p className="text-base font-semibold leading-7 text-neutral-950">
                  {item.h1}
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            立即测评我的手机号 →
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            点击返回首页进行测评。
          </Link>
        </section>
      </article>
    </main>
  );
}

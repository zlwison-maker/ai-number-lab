import type { Metadata } from "next";
import Link from "next/link";
import { phoneNumberMeaningPages } from "@/lib/programmaticSeo";

const title = "手机号数字寓意大全：0-9 数字分别代表什么？｜AI Number Lab";
const description =
  "用克制、娱乐参考的方式了解手机号中 0-9 数字的常见寓意，以及如何看待手机号数字组合。";

const numberMeanings = [
  {
    number: "0",
    meaning: "完整、起点、留白",
    detail: "0 常被理解为一个完整的圆，也可以代表新的开始。在号码里，它更像一种停顿，让整体读法更平稳。"
  },
  {
    number: "1",
    meaning: "开始、独立、明确",
    detail: "1 给人的感觉直接、清晰，适合作为一串数字的开头或节奏点。手机号以 1 开头，也让它天然带有起始感。"
  },
  {
    number: "2",
    meaning: "连接、配合、平衡",
    detail: "2 往往让人想到成双、协作和关系。出现在号码中时，它可以让数字节奏显得更柔和。"
  },
  {
    number: "3",
    meaning: "表达、成长、变化",
    detail: "3 在中文数字文化里常带有展开和变化的感觉。它不一定代表特别含义，但能让号码读起来更活跃。"
  },
  {
    number: "4",
    meaning: "秩序、稳定、结构",
    detail: "4 有时会被不同人用不同方式理解。理性来看，它更适合被看作结构感和稳定感的一部分，不需要过度解读。"
  },
  {
    number: "5",
    meaning: "中间、协调、日常",
    detail: "5 位于 0-9 的中段，常给人中性、均衡的印象。它在号码中可以降低过强的刻意感。"
  },
  {
    number: "6",
    meaning: "顺畅、顺手、好读",
    detail: "6 是中文语境里比较受欢迎的数字之一。放在手机号里，更多体现为读音顺、传播时容易留下印象。"
  },
  {
    number: "7",
    meaning: "个性、探索、辨识",
    detail: "7 常被看作更有个性的数字。它在组合中能增加一点差异感，但是否好记仍取决于整体结构。"
  },
  {
    number: "8",
    meaning: "偏好、记忆点、积极联想",
    detail: "8 在中文数字文化里有很强的积极联想，因此也更容易被注意到。但它的娱乐价值仍要结合重复、尾号和整体读法来看。"
  },
  {
    number: "9",
    meaning: "长久、稳定、收束",
    detail: "9 常被理解为长久和完整前的收束。出现在尾号或重复组合中时，容易形成比较明确的结尾感。"
  }
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/phone-number-meaning"
  },
  openGraph: {
    title,
    description,
    url: "/phone-number-meaning",
    type: "article"
  }
};

export default function PhoneNumberMeaningPage() {
  return (
    <main className="px-5 py-8 sm:px-8">
      <section className="mx-auto w-full max-w-4xl border-b border-neutral-200 pb-10 pt-4">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
        >
          AI Number Lab
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
          手机号数字寓意大全：0-9 数字分别代表什么？
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
          数字寓意是一种轻量的文化解读。它可以帮助我们理解号码为什么顺口、好记或有辨识度，但不应该被当作现实结果的保证。
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-4xl gap-px border-b border-neutral-200 bg-neutral-200 py-10 sm:grid-cols-2">
        {numberMeanings.map((item) => (
          <article key={item.number} className="bg-[#f7f7f5] p-6">
            <div className="flex items-baseline gap-4">
              <p className="number-tabular text-5xl font-semibold leading-none text-neutral-950">
                {item.number}
              </p>
              <h2 className="text-lg font-semibold text-neutral-950">
                {item.meaning}
              </h2>
            </div>
            <p className="mt-4 text-base leading-8 text-neutral-600">
              {item.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid w-full max-w-4xl gap-10 border-b border-neutral-200 py-10 lg:grid-cols-2">
        <article>
          <h2 className="text-2xl font-semibold text-neutral-950">
            如何看待手机号数字组合
          </h2>
          <p className="mt-4 text-base leading-8 text-neutral-600">
            看手机号时，不必只盯着某一个数字。更实用的方式是观察整体结构：尾号是否顺口，是否有 AAA、AABB、ABAB 或连续数字，数字分布是否过于集中，以及别人听一遍后是否容易记住。
          </p>
          <p className="mt-4 text-base leading-8 text-neutral-600">
            一个号码让人感觉特别，通常来自组合节奏，而不是单个数字。AI Number Lab 的测评也更关注结构、记忆点和娱乐表达。
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold text-neutral-950">
            娱乐参考免责声明
          </h2>
          <p className="mt-4 text-base leading-8 text-neutral-600">
            本页内容只用于解释常见数字文化和娱乐测评语境，不代表真实价格、交易建议或未来判断。你可以把它当作一个轻松的数字阅读入口，而不是严肃结论。
          </p>
        </article>
      </section>

      <section className="mx-auto w-full max-w-4xl border-b border-neutral-200 py-10">
        <h2 className="text-2xl font-semibold text-neutral-950">
          热门手机号尾号寓意
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">
          下面是第一批常见搜索数字组合，每个页面都会从寓意、易记程度、娱乐指数和尾号适配度几个角度展开。
        </p>
        <div className="mt-6 grid gap-px bg-neutral-200 sm:grid-cols-2">
          {phoneNumberMeaningPages.map((item) => (
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

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-3 py-8 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          回首页测评
        </Link>
        <Link
          href="/faq"
          className="inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
        >
          查看常见问题
        </Link>
      </section>
    </main>
  );
}

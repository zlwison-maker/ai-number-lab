import Link from "next/link";
import { AnimatedValue } from "@/components/AnimatedValue";
import { ShareButton } from "@/components/ShareButton";
import { analyzePhone, isValidPhone, normalizePhone } from "@/lib/phoneAnalysis";

type ResultPageProps = {
  searchParams: Promise<{
    phone?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const phone = normalizePhone(params.phone ?? "");

  if (!isValidPhone(phone)) {
    return (
      <main className="flex min-h-screen items-center px-5 py-8">
        <section className="mx-auto w-full max-w-xl border-y border-neutral-200 py-10">
          <p className="text-sm font-medium text-neutral-500">AI Number Lab</p>
          <h1 className="mt-4 text-4xl font-semibold text-neutral-950">
            号码格式不太对
          </h1>
          <p className="mt-4 leading-7 text-neutral-600">
            请输入有效的 11 位中国大陆手机号，再生成娱乐测评报告。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-5 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            重新输入
          </Link>
        </section>
      </main>
    );
  }

  const report = analyzePhone(phone);

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              AI Number Lab
            </Link>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
              {report.maskedPhone}
            </h1>
            <p className="mt-4 text-base text-neutral-500">
              仅供娱乐参考，不作为任何交易依据。
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-neutral-500">AI 人格标签</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-950">
              {report.label}
            </p>
          </div>
        </header>

        <section className="grid gap-10 border-b border-neutral-200 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-neutral-500">娱乐估值</p>
            <div className="mt-4 text-6xl font-semibold leading-none tracking-normal text-neutral-950 sm:text-8xl">
              <AnimatedValue value={report.value} />
            </div>
            <p className="mt-5 max-w-xl leading-7 text-neutral-600">
              估值由号码结构、尾号记忆点、重复与连续特征综合生成，不代表真实交易价值。
            </p>
          </div>

          <div className="space-y-8">
            <Metric label="稀缺指数" value={report.rarity} />
            <Metric label="幸运指数" value={report.luck} />
          </div>
        </section>

        <section className="grid gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium text-neutral-500">号码亮点</p>
            <ul className="mt-5 space-y-3">
              {report.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-lg font-medium text-neutral-950"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 text-sm">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <ReportBlock title="AI 解读">{report.interpretation}</ReportBlock>
            <ReportBlock title="AI 建议">{report.advice}</ReportBlock>
            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center">
              <ShareButton />
              <Link
                href="/"
                className="inline-flex h-12 w-full items-center justify-center rounded-md px-5 text-base font-medium text-neutral-500 transition hover:text-neutral-950 sm:w-auto"
              >
                再测一个
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-neutral-500">{label}</p>
        <p className="number-tabular text-3xl font-semibold text-neutral-950">
          {value}
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-neutral-950"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ReportBlock({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-sm font-medium text-neutral-500">{title}</p>
      <p className="mt-4 text-lg leading-8 text-neutral-700">{children}</p>
    </section>
  );
}

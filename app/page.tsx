import { PhoneTestForm } from "@/components/PhoneTestForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center px-5 py-8 sm:px-8">
      <section className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
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
    </main>
  );
}

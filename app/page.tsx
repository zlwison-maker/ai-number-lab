export default function Home() {
  return (
    <main className="flex min-h-screen items-center px-5 py-8 sm:px-8">
      <section className="mx-auto grid w-full max-w-5xl gap-16 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-neutral-500">
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
            输入手机号，30 秒生成专属娱乐分析。轻松看看号码结构、记忆点和一份刚刚好的情绪价值。
          </p>
        </div>

        <form
          action="/result"
          className="w-full border-y border-neutral-200 py-8"
          data-analytics="phone-test-form"
        >
          <label
            htmlFor="phone"
            className="mb-3 block text-sm font-medium text-neutral-500"
          >
            请输入手机号
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            pattern="1[3-9][0-9]{9}"
            required
            placeholder="13800138000"
            className="h-16 w-full border-0 border-b border-neutral-950 bg-transparent px-0 text-3xl font-semibold tracking-normal text-neutral-950 outline-none placeholder:text-neutral-300 focus:border-neutral-500"
          />
          <button
            type="submit"
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-neutral-950 px-5 text-base font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-[#f7f7f5]"
          >
            立即测评 →
          </button>
          <p className="mt-5 text-center text-xs leading-5 text-neutral-500">
            仅供娱乐参考，不作为任何交易依据。
          </p>
        </form>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center px-5 py-8 sm:px-8">
      <section className="mx-auto w-full max-w-xl border-y border-neutral-200 py-10">
        <p className="text-sm font-medium text-neutral-500">AI Number Lab</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950">
          这个号码，暂时没有找到。
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-5 text-base font-medium text-white transition hover:bg-neutral-800"
        >
          返回首页
        </Link>
      </section>
    </main>
  );
}

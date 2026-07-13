const SITEMAP_URL = "https://www.numberlab.vip/sitemap.xml";
const BAIDU_SUBMIT_API =
  "http://data.zz.baidu.com/urls?site=https://www.numberlab.vip&token=DM3s9ID8TZvCEGiU";
const BATCH_SIZE = 2000;

type BaiduSubmitResult = {
  success?: number;
  remain?: number;
  not_same_site?: string[];
  not_valid?: string[];
  error?: number;
  message?: string;
};

function extractUrlsFromSitemap(xml: string): string[] {
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => decodeXmlEntity(match[1].trim()))
    .filter(Boolean);

  return Array.from(new Set(urls));
}

function decodeXmlEntity(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function chunkUrls(urls: string[], batchSize: number): string[][] {
  const chunks: string[][] = [];

  for (let index = 0; index < urls.length; index += batchSize) {
    chunks.push(urls.slice(index, index + batchSize));
  }

  return chunks;
}

async function fetchSitemap(): Promise<string> {
  const response = await fetch(SITEMAP_URL);

  if (!response.ok) {
    throw new Error(
      `sitemap 获取失败：${response.status} ${response.statusText}`
    );
  }

  return response.text();
}

async function submitBatch(
  urls: string[],
  batchIndex: number,
  batchTotal: number
): Promise<BaiduSubmitResult> {
  console.log(
    `正在提交第 ${batchIndex}/${batchTotal} 批，共 ${urls.length} 个 URL...`
  );

  const response = await fetch(BAIDU_SUBMIT_API, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: urls.join("\n")
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `百度 API 请求失败：${response.status} ${response.statusText}\n${responseText}`
    );
  }

  try {
    return JSON.parse(responseText) as BaiduSubmitResult;
  } catch {
    throw new Error(`百度 API 返回内容不是有效 JSON：${responseText}`);
  }
}

async function main() {
  try {
    console.log(`正在获取 sitemap：${SITEMAP_URL}`);

    const sitemap = await fetchSitemap();
    console.log("sitemap 获取成功");

    const urls = extractUrlsFromSitemap(sitemap);
    console.log(`发现 URL 数量：${urls.length}`);

    if (urls.length === 0) {
      console.log("没有发现可提交的 URL，已停止。");
      return;
    }

    const batches = chunkUrls(urls, BATCH_SIZE);
    console.log(`提交数量：${urls.length}`);
    console.log(`分批数量：${batches.length} 批，每批最多 ${BATCH_SIZE} 个 URL`);

    for (const [index, batch] of batches.entries()) {
      const result = await submitBatch(batch, index + 1, batches.length);
      console.log("百度返回结果：", JSON.stringify(result, null, 2));
    }

    console.log("百度 URL 主动推送完成。");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("百度 URL 主动推送失败。");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();

export type PhoneAnalysis = {
  phone: string;
  maskedPhone: string;
  score: number;
  value: number;
  rarity: number;
  luck: number;
  label: string;
  highlights: string[];
  interpretation: string;
  advice: string;
};

const labels = [
  "财富积累型",
  "事业成长型",
  "稳定可靠型",
  "社交达人型",
  "幸运体质型",
  "数字收藏家",
  "高辨识度型",
  "长期主义型"
];

const positiveOpeners = [
  "你的号码整体数字结构比较清晰",
  "这个号码的节奏感不错",
  "从娱乐测评角度看，这个号码有自己的记忆点",
  "你的号码呈现出比较稳的数字气质"
];

export function analyzePhone(rawPhone: string): PhoneAnalysis {
  const phone = normalizePhone(rawPhone);

  if (!isValidPhone(phone)) {
    throw new Error("请输入有效的 11 位中国大陆手机号");
  }

  const digits = phone.split("").map(Number);
  const tail = phone.slice(-4);
  const freq = getFrequency(digits);
  const uniqueCount = Object.keys(freq).length;
  const longestRun = getLongestRun(digits);
  const longestSame = getLongestSame(phone);
  const tailSame = getLongestSame(tail);
  const balance = Math.round((uniqueCount / 10) * 100);
  const luckyDigits = digits.filter((digit) => [6, 8, 9].includes(digit)).length;
  const symmetry = getSymmetryScore(phone);
  const stableSeed = hashPhone(phone);

  let score = 38;
  score += longestRun >= 3 ? 18 : longestRun === 2 ? 8 : 0;
  score += longestSame >= 4 ? 22 : longestSame === 3 ? 15 : longestSame === 2 ? 6 : 0;
  score += tailSame >= 3 ? 16 : tailSame === 2 ? 8 : 0;
  score += luckyDigits * 3;
  score += balance >= 70 ? 8 : balance >= 50 ? 4 : 0;
  score += symmetry;
  score += stableSeed % 9;
  score = clamp(score, 40, 99);

  const rarity = clamp(score + (longestSame >= 3 ? 4 : 0) - Math.max(0, uniqueCount - 8), 35, 100);
  const luck = clamp(45 + luckyDigits * 7 + (stableSeed % 23) + (tail.includes("8") ? 6 : 0), 35, 100);
  const value = Math.round((18000 + score ** 2 * 31 + rarity * 860 + (stableSeed % 9000)) / 1000) * 1000;
  const label = labels[(score + stableSeed) % labels.length];
  const highlights = buildHighlights({
    phone,
    tail,
    uniqueCount,
    longestRun,
    longestSame,
    tailSame,
    luckyDigits,
    balance
  });

  return {
    phone,
    maskedPhone: `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`,
    score,
    value,
    rarity,
    luck,
    label,
    highlights,
    interpretation: buildInterpretation({
      phone,
      label,
      highlights,
      opener: positiveOpeners[stableSeed % positiveOpeners.length],
      balance,
      tail
    }),
    advice: buildAdvice(score, rarity)
  };
}

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isValidPhone(phone: string) {
  return /^1[3-9]\d{9}$/.test(phone);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getFrequency(digits: number[]) {
  return digits.reduce<Record<string, number>>((acc, digit) => {
    acc[digit] = (acc[digit] ?? 0) + 1;
    return acc;
  }, {});
}

function getLongestRun(digits: number[]) {
  let best = 1;
  let current = 1;

  for (let index = 1; index < digits.length; index += 1) {
    if (digits[index] === digits[index - 1] + 1) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  return best;
}

function getLongestSame(input: string) {
  let best = 1;
  let current = 1;

  for (let index = 1; index < input.length; index += 1) {
    if (input[index] === input[index - 1]) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  return best;
}

function getSymmetryScore(phone: string) {
  const tail = phone.slice(-4);
  const reversedTail = tail.split("").reverse().join("");
  return tail === reversedTail ? 10 : tail[0] === tail[3] || tail[1] === tail[2] ? 5 : 0;
}

function hashPhone(phone: string) {
  let hash = 2166136261;

  for (const char of phone) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function buildHighlights({
  phone,
  tail,
  uniqueCount,
  longestRun,
  longestSame,
  tailSame,
  luckyDigits,
  balance
}: {
  phone: string;
  tail: string;
  uniqueCount: number;
  longestRun: number;
  longestSame: number;
  tailSame: number;
  luckyDigits: number;
  balance: number;
}) {
  const highlights: string[] = [];

  if (longestRun >= 3) highlights.push("连续数字");
  if (longestSame >= 3 || tailSame >= 2) highlights.push("尾号重复");
  if (balance >= 60) highlights.push("数字平衡");
  if (tailSame >= 2 || uniqueCount <= 7) highlights.push("易记忆");
  if (longestSame >= 3 || phone.includes("888") || phone.includes("666")) {
    highlights.push("稀有组合");
  }
  if (luckyDigits >= 3) highlights.push("高能数字");
  if (tail[0] === tail[3] || tail[1] === tail[2]) highlights.push("尾号呼应");

  return Array.from(new Set(highlights)).slice(0, 5);
}

function buildInterpretation({
  label,
  highlights,
  opener,
  balance,
  tail
}: {
  phone: string;
  label: string;
  highlights: string[];
  opener: string;
  balance: number;
  tail: string;
}) {
  const featureText = highlights.length
    ? `其中「${highlights.slice(0, 3).join("」「")}」让它更容易被注意到`
    : "没有夸张的特殊排列，反而显得自然耐看";
  const balanceText =
    balance >= 70
      ? "数字分布也比较均衡，读起来不容易产生负担"
      : "尾号部分承担了主要辨识度，整体风格更偏简洁直接";

  return `${opener}，尾号 ${tail} 有一定辨识度，${featureText}。${balanceText}。如果把号码当作一个轻量的个人符号，它更接近「${label}」：不张扬，但有存在感，适合长期使用，也适合拿来做一张有趣的分享截图。以上只是基于数字结构生成的娱乐分析，不代表真实价值或任何未来判断。`;
}

function buildAdvice(score: number, rarity: number) {
  if (score >= 88 || rarity >= 90) {
    return "建议继续保留。这个号码在娱乐测评里已经有不错的识别度，没必要轻易换掉。";
  }

  if (score >= 70) {
    return "可以继续使用。如果未来遇到尾号更整齐、更好记的号码，再考虑升级也不迟。";
  }

  return "保持轻松就好。号码本身够日常、够自然，如果想追求分享效果，可以优先关注尾号更有记忆点的选择。";
}

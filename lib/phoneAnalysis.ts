export type PhoneMetric = {
  label: string;
  value: number;
};

export type PhoneAnalysis = {
  phone: string;
  maskedPhone: string;
  score: number;
  stars: number;
  value: number;
  rarity: number;
  luck: number;
  memory: number;
  business: number;
  spread: number;
  label: string;
  oneLineAdvice: string;
  highlights: string[];
  metrics: PhoneMetric[];
  interpretation: string;
  advice: string;
};

const labels = [
  "高辨识度号码",
  "财富积累型",
  "事业成长型",
  "稳定可靠型",
  "社交达人型",
  "幸运体质型",
  "数字收藏家"
];

const positiveOpeners = [
  "这个号码最大的特点不是价格，而是它比较容易被记住",
  "从娱乐测评角度看，这个号码有一种克制但清晰的辨识度",
  "你的号码整体数字结构比较稳定，读起来没有明显负担",
  "这个号码的尾号承担了主要记忆点，整体观感比较自然"
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
  const hasAbab = isAbab(tail);
  const hasAabb = isAabb(tail);
  const hasAaaa = tailSame >= 4 || /(\d)\1{3}/.test(phone);
  const hasAaa = longestSame >= 3;
  const symmetry = getSymmetryScore(phone);
  const stableSeed = hashPhone(phone);

  let score = 38;
  score += longestRun >= 4 ? 22 : longestRun === 3 ? 16 : longestRun === 2 ? 6 : 0;
  score += hasAaaa ? 24 : hasAaa ? 16 : longestSame === 2 ? 6 : 0;
  score += tailSame >= 3 ? 16 : tailSame === 2 ? 8 : 0;
  score += hasAbab ? 13 : 0;
  score += hasAabb ? 12 : 0;
  score += luckyDigits * 3;
  score += balance >= 70 ? 8 : balance >= 50 ? 4 : 0;
  score += symmetry;
  score += stableSeed % 8;
  score = clamp(score, 42, 99);

  const memory = clamp(
    45 + longestRun * 7 + longestSame * 5 + tailSame * 6 + (hasAbab ? 12 : 0) + (hasAabb ? 10 : 0),
    35,
    100
  );
  const rarity = clamp(score + (hasAaaa ? 7 : hasAaa ? 4 : 0) - Math.max(0, uniqueCount - 8), 35, 100);
  const luck = clamp(44 + luckyDigits * 7 + (stableSeed % 20) + (tail.includes("8") ? 6 : 0), 35, 100);
  const business = clamp(48 + Math.round(balance / 3) + (tailSame >= 2 ? 8 : 0) + (stableSeed % 14), 35, 100);
  const spread = clamp(Math.round(memory * 0.58 + rarity * 0.24 + luck * 0.18), 35, 100);
  const value = Math.round((18000 + score ** 2 * 31 + rarity * 860 + memory * 420 + (stableSeed % 9000)) / 1000) * 1000;
  const stars = clamp(Math.round(score / 20), 3, 5);
  const label = labels[(score + stableSeed) % labels.length];
  const oneLineAdvice = buildOneLineAdvice(score, memory);
  const highlights = buildHighlights({
    phone,
    tail,
    uniqueCount,
    longestRun,
    longestSame,
    tailSame,
    luckyDigits,
    balance,
    hasAbab,
    hasAabb,
    hasAaaa
  });
  const metrics = [
    { label: "记忆度", value: memory },
    { label: "稀缺度", value: rarity },
    { label: "幸运值", value: luck },
    { label: "商务感", value: business },
    { label: "传播感", value: spread }
  ];

  return {
    phone,
    maskedPhone: `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`,
    score,
    stars,
    value,
    rarity,
    luck,
    memory,
    business,
    spread,
    label,
    oneLineAdvice,
    highlights,
    metrics,
    interpretation: buildInterpretation({
      label,
      highlights,
      opener: positiveOpeners[stableSeed % positiveOpeners.length],
      balance,
      tail,
      memory
    }),
    advice: buildAdvice(score)
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

function isAbab(input: string) {
  return input.length === 4 && input[0] === input[2] && input[1] === input[3] && input[0] !== input[1];
}

function isAabb(input: string) {
  return input.length === 4 && input[0] === input[1] && input[2] === input[3] && input[0] !== input[2];
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
  balance,
  hasAbab,
  hasAabb,
  hasAaaa
}: {
  phone: string;
  tail: string;
  uniqueCount: number;
  longestRun: number;
  longestSame: number;
  tailSame: number;
  luckyDigits: number;
  balance: number;
  hasAbab: boolean;
  hasAabb: boolean;
  hasAaaa: boolean;
}) {
  const highlights: string[] = [];

  if (hasAaaa) highlights.push("包含 AAAA 结构，视觉记忆点更强");
  if (longestSame >= 3 || tailSame >= 2) highlights.push("尾号重复，辨识度更高");
  if (longestRun >= 3) highlights.push("包含连续数字，容易记忆");
  if (hasAbab) highlights.push("尾号 ABAB 呼应，读起来更顺口");
  if (hasAabb) highlights.push("尾号 AABB 成组，结构更清晰");
  if (balance >= 60) highlights.push("数字分布较均衡");
  if (tailSame >= 2 || uniqueCount <= 7 || hasAbab || hasAabb) highlights.push("结构顺口，适合长期使用");
  if (phone.includes("888") || phone.includes("666") || luckyDigits >= 3) {
    highlights.push("包含常见偏好数字，娱乐感更强");
  }
  if (tail[0] === tail[3] || tail[1] === tail[2]) highlights.push("尾号前后呼应，整体更整齐");

  return Array.from(new Set(highlights)).slice(0, 5);
}

function buildInterpretation({
  label,
  highlights,
  opener,
  balance,
  tail,
  memory
}: {
  label: string;
  highlights: string[];
  opener: string;
  balance: number;
  tail: string;
  memory: number;
}) {
  const featureText = highlights.length
    ? `尤其是「${highlights.slice(0, 2).join("」「")}」这类特征，让它更适合被记住`
    : "它没有夸张的特殊排列，反而显得自然、低调";
  const balanceText =
    balance >= 70
      ? "整体数字分布也比较均衡，不会给人过于刻意的感觉"
      : "尾号部分承担了主要辨识度，风格更偏简洁直接";
  const memoryText = memory >= 80 ? "作为长期联系号码，它的分享和识别优势会更明显" : "作为日常联系号码，它的优势在于稳定和耐看";

  return `${opener}。尾号 ${tail} 有一定辨识度，${featureText}。${balanceText}。从娱乐偏好来看，它更接近「${label}」，${memoryText}。这份报告只基于数字结构生成，不代表真实市场价格或交易建议。`;
}

function buildOneLineAdvice(score: number, memory: number) {
  if (score >= 88) return "继续保留";
  if (memory >= 82) return "值得长期使用";
  if (score >= 70) return "可以作为长期联系号码";
  return "有升级空间";
}

function buildAdvice(score: number) {
  if (score >= 85) {
    return "建议继续保留。这样的号码不一定真的昂贵，但从易记程度和辨识度来看，很适合作为长期联系号码。";
  }

  if (score >= 65) {
    return "可以继续使用。如果未来遇到更顺口、更有记忆点的号码，也可以考虑升级。";
  }

  return "普通但稳定。它未必有很强的稀缺感，但胜在自然、低调，适合作为日常联系号码。";
}

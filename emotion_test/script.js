/******************************
 * 情绪安稳度测评 - 第一版 UI + 本地兑换码版
 * 不再依赖飞书 / Netlify，仅前端 + codes.json
 ******************************/

// =====================
// 题库（保持第一版）
// =====================
const QUESTIONS = [
  { id: 1, text: "我能觉察到情绪的起伏，并尝试温柔地安放它们。", dimension: "emotion_fluctuation" },
  { id: 2, text: "遇到压力时，我会给自己留出喘息的空间再继续。", dimension: "stress_tolerance" },
  { id: 3, text: "和亲近的人交流时，我能够表达需求并保持舒适。", dimension: "interpersonal_sensitivity" },
  { id: 4, text: "情绪低落后，我通常能在不久后恢复到平稳状态。", dimension: "self_repair" },
  { id: 5, text: "即使有波动，我也能保持对生活的温柔期待。", dimension: "emotion_fluctuation" },
  { id: 6, text: "面对突发状况，我能逐步梳理并稳住情绪。", dimension: "stress_tolerance" },
  { id: 7, text: "在人际互动中，我能体察到自己的界限与舒适度。", dimension: "interpersonal_sensitivity" },
  { id: 8, text: "我有一些让自己放松的方式，比如呼吸、写字或散步。", dimension: "self_repair" },
  { id: 9, text: "当心情亮起来时，我会好好接住这种轻盈感。", dimension: "emotion_fluctuation" },
  { id: 10, text: "压力来临时，我会先确认优先级，而不是让自己慌乱。", dimension: "stress_tolerance" },
  { id: 11, text: "与他人相处时，我能察觉到对方的细微情绪并温和回应。", dimension: "interpersonal_sensitivity" },
  { id: 12, text: "经历不顺后，我愿意给自己时间慢慢修复。", dimension: "self_repair" },
  { id: 13, text: "我可以接受偶尔的情绪起伏，不会苛责自己。", dimension: "emotion_fluctuation" },
  { id: 14, text: "面对挑战，我能保持镇定并寻找支援。", dimension: "stress_tolerance" },
  { id: 15, text: "和朋友聊天时，我能坦然分享感受，感到被理解。", dimension: "interpersonal_sensitivity" },
  { id: 16, text: "当情绪受伤时，我会做一些让自己慢慢被治愈的事情。", dimension: "self_repair" },
  { id: 17, text: "我能温柔接受自己的敏感，并让它成为一种觉察力。", dimension: "emotion_fluctuation" },
  { id: 18, text: "压力大的时候，我会用小休息或深呼吸来温柔地稳住自己。", dimension: "stress_tolerance" },
  { id: 19, text: "在社交中，如果感到不适，我能礼貌表达并调整。", dimension: "interpersonal_sensitivity" },
  { id: 20, text: "我相信自己有能力从困境中一点点修复。", dimension: "self_repair" },
  { id: 21, text: "我能分辨情绪的不同层次，并允许它们存在。", dimension: "emotion_fluctuation" },
  { id: 22, text: "遇到紧迫任务时，我会拆解步骤而不是陷入焦虑。", dimension: "stress_tolerance" },
  { id: 23, text: "与他人产生误会时，我愿意耐心沟通并倾听。", dimension: "interpersonal_sensitivity" },
  { id: 24, text: "即便经历挫折，我依旧能感受到生活里的小确幸。", dimension: "self_repair" },
  { id: 25, text: "我可以接纳自己的情绪敏感，并视其为温柔的感受力。", dimension: "emotion_fluctuation" },
  { id: 26, text: "当事情变多时，我会慢慢理清并安排，不让压力压过自己。", dimension: "stress_tolerance" },
  { id: 27, text: "在人际互动中，我会尊重彼此的节奏，不强迫自己。", dimension: "interpersonal_sensitivity" },
  { id: 28, text: "我有让自己恢复能量的惯例，比如睡前放松或音乐。", dimension: "self_repair" },
  { id: 29, text: "我能觉察到情绪波动的信号，并提前照顾自己。", dimension: "emotion_fluctuation" },
  { id: 30, text: "当压力积累时，我愿意向可信赖的人求助。", dimension: "stress_tolerance" }
];

const OPTION_TEXTS = ["非常不符合", "有点不符合", "一般般", "比较符合", "非常符合"];

// 画像 & 文案（第一版）
const EMOTION_PROFILES = {
  A: {
    typeName: "稳定型",
    summary: "你的情绪像一汪平稳的水，柔软而有力量，能温柔接住日常的起伏。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}。情绪波动觉察 ${scores.emotion_fluctuation}，说明你能细致观察并陪伴自己的心绪；压力承受 ${scores.stress_tolerance}，让你在忙碌中仍保留呼吸感；人际敏感度 ${scores.interpersonal_sensitivity}，帮助你温柔回应他人；自我修复力 ${scores.self_repair}，支持你在消耗后慢慢补能。</p>
      <p>这份稳定与敏感并存的能量，让你能以柔韧的姿态照顾自己，也给身边人带来安心。</p>
    `,
    healingQuotes: [
      "你的温柔，也是力量。",
      "情绪有潮汐，而你有岸。",
      "慢慢来，心会把答案送到你手心。"
    ],
    gentleSuggestions: [
      "保持充足睡眠与清淡饮食，让身体支撑这份稳定。",
      "每天 5 分钟呼吸或冥想，像打磨一面柔软的盾牌。",
      "散步、晒太阳或触摸植物，让自然继续滋养你的韧性。"
    ]
  },
  B: {
    typeName: "轻波动型",
    summary: "你大多时候平稳，只是偶尔起伏，需要一点节奏照顾就能回到舒适。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}。情绪波动觉察 ${scores.emotion_fluctuation}，你能察觉细微变化；压力承受 ${scores.stress_tolerance}，提示你在忙碌时记得小憩；人际敏感度 ${scores.interpersonal_sensitivity}，让你温柔感知关系中的细节；自我修复力 ${scores.self_repair}，帮助你在波动后恢复。</p>
      <p>当你愿意放慢脚步、补充能量，稳定感会更常驻。</p>
    `,
    healingQuotes: [
      "情绪有潮汐，停一停也很好。",
      "你敏感的心，也在寻找温柔的支点。",
      "小小的照顾，也能让能量慢慢回到身体。"
    ],
    gentleSuggestions: [
      "保证 7-8 小时睡眠，少量多次补水，保持轻盈感。",
      "心绪起伏时试试 4-7-8 呼吸或写下当下想法。",
      "安排短暂散步或拉伸，让身体带动情绪舒展。"
    ]
  },
  C: {
    typeName: "高敏波动型",
    summary: "你的感受力很细腻，需要更多空间与支持，让心慢慢恢复平衡。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}。情绪波动觉察 ${scores.emotion_fluctuation}，显示你能感知细微的心绪波澜；压力承受 ${scores.stress_tolerance}，提醒你用更温柔的步调面对任务；人际敏感度 ${scores.interpersonal_sensitivity}，让你对善意与细节尤为在意；自我修复力 ${scores.self_repair}，正在积累让自己被治愈的方式。</p>
      <p>敏感并非负担，它需要被理解和照顾。当你慢下来、被支持，能量会一点点回到身体。</p>
    `,
    healingQuotes: [
      "你可以慢一点，没有关系。",
      "被理解之前，也要先理解自己。",
      "你值得被温柔以待。"
    ],
    gentleSuggestions: [
      "保持规律作息，睡前少刷屏，用温水泡脚帮助放松。",
      "紧绷时捂住心口或做 5 分钟呼吸，让身体先安定。",
      "去阳台或公园走走，看看绿植、感受风与阳光。"
    ]
  }
};

let currentQuestionIndex = 0;
let selectedOption = null;

// 当前从 codes.json 读到的合法兑换码列表（全部大写）
let validCodes = null;

// =====================
// 小工具函数
// =====================
function addEmojisToTitles() {
  const emojis = ["🌿", "✨", "🍃", "🌙"];
  document.querySelectorAll(".section-title").forEach((title, index) => {
    if (!title.dataset.emojified) {
      const span = document.createElement("span");
      span.textContent = emojis[index % emojis.length];
      title.prepend(span);
      title.dataset.emojified = "true";
    }
  });
}

function getStoredAnswers() {
  const stored = localStorage.getItem("emotionTestAnswers");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === QUESTIONS.length) {
        return parsed;
      }
    } catch (e) {
      return Array(QUESTIONS.length).fill(null);
    }
  }
  return Array(QUESTIONS.length).fill(null);
}

function saveAnswers(answers) {
  localStorage.setItem("emotionTestAnswers", JSON.stringify(answers));
}

// ========= 兑换码相关：读取 codes.json + 本地核销 =========

// 从 codes.json 读取所有可用兑换码
async function loadCodes() {
  if (validCodes !== null) return validCodes;
  try {
    const resp = await fetch("codes.json?ts=" + Date.now());
    if (!resp.ok) throw new Error("load codes.json failed");
    const data = await resp.json();
    const list = Array.isArray(data.codes) ? data.codes : [];
    validCodes = list
      .map((item) =>
        typeof item === "string"
          ? item.trim().toUpperCase()
          : String(item.code || "").trim().toUpperCase()
      )
      .filter(Boolean);
  } catch (err) {
    console.error("加载兑换码失败：", err);
    validCodes = [];
  }
  return validCodes;
}

function getUsedCodes() {
  try {
    const raw = localStorage.getItem("usedCodes");
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function isCodeUsedLocally(code) {
  const upper = (code || "").toUpperCase();
  return getUsedCodes().includes(upper);
}

function markCodeUsed(code, score) {
  const upper = (code || "").toUpperCase();
  if (!upper) return;
  const used = getUsedCodes();
  if (!used.includes(upper)) {
    used.push(upper);
    localStorage.setItem("usedCodes", JSON.stringify(used));
  }
  // 记录简单的使用信息（仅本机）
  let detail = {};
  try {
    detail = JSON.parse(localStorage.getItem("usedCodeDetails") || "{}");
  } catch (e) {
    detail = {};
  }
  detail[upper] = {
    score: score,
    time: new Date().toISOString()
  };
  localStorage.setItem("usedCodeDetails", JSON.stringify(detail));
}

// =====================
// 首页逻辑（兑换 + 进入测评）
// =====================
function setupHomePage() {
  const startBtn = document.getElementById("redeemBtn");
  const redeemInput = document.getElementById("redeemInput");
  const redeemMessage = document.getElementById("redeemMessage");

  if (!startBtn || !redeemInput) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get("needCode") === "1" && redeemMessage) {
    redeemMessage.textContent = "请先输入兑换码，再开始测评～";
  }

  startBtn.addEventListener("click", async () => {
    const rawCode = redeemInput.value || "";
    const code = rawCode.trim().toUpperCase();

    if (!code) {
      if (redeemMessage) {
        redeemMessage.textContent = "先输入兑换码，才能为你开启专属测评哦～";
        redeemMessage.style.color = "#c0392b";
      }
      return;
    }

    if (redeemMessage) {
      redeemMessage.textContent = "正在校验兑换码…";
      redeemMessage.style.color = "#5f6f65";
    }

    const list = await loadCodes();

    if (!list.includes(code)) {
      if (redeemMessage) {
        redeemMessage.textContent = "兑换码不存在或已失效";
        redeemMessage.style.color = "#c0392b";
      }
      return;
    }

    if (isCodeUsedLocally(code)) {
      if (redeemMessage) {
        redeemMessage.textContent = "该兑换码在本设备上已使用，如需多设备使用需要更专业的核销系统～";
        redeemMessage.style.color = "#c0392b";
      }
      return;
    }

    // 校验通过：记录兑换码、初始化答案
    localStorage.setItem("redeem_code", code);
    localStorage.setItem("redeemCode", code);
    localStorage.setItem("emotionTestAnswers", JSON.stringify(Array(QUESTIONS.length).fill(null)));

    if (redeemMessage) {
      redeemMessage.textContent = "兑换成功，正在为你开启测评…";
      redeemMessage.style.color = "#1f7a5a";
    }

    setTimeout(() => {
      window.location.href = "test.html";
    }, 400);
  });
}

// =====================
// 答题页逻辑（和第一版一致，只是最后不再发请求）
// =====================
function clearActiveOptions(optionsEl) {
  if (!optionsEl) return;
  optionsEl.querySelectorAll(".option-btn").forEach((btn) => btn.classList.remove("active"));
}

function ensureRedeemAccess() {
  const code = localStorage.getItem("redeem_code") || localStorage.getItem("redeemCode");
  if (!code) {
    window.location.href = "index.html?needCode=1";
    return false;
  }
  return true;
}

function renderQuestion(index, answers) {
  currentQuestionIndex = index;
  selectedOption = null;
  const totalQuestions = QUESTIONS.length;

  const questionNumberEl = document.getElementById("question-number");
  const completionTextEl = document.getElementById("completion-text");
  const progressEl = document.getElementById("progress-bar");
  const questionTextEl = document.getElementById("question-text");
  const optionsEl = document.getElementById("options");

  const current = QUESTIONS[index];
  if (questionNumberEl) questionNumberEl.textContent = `第 ${index + 1} 题 / 共 ${totalQuestions} 题`;
  if (questionTextEl) questionTextEl.textContent = current.text;

  const completedCount = answers.filter((v) => v !== null).length;
  if (completionTextEl) {
    completionTextEl.textContent = `已完成：${completedCount} / ${totalQuestions} | 选择后自动跳到下一题`;
  }
  if (progressEl) {
    progressEl.style.width = `${(completedCount / totalQuestions) * 100}%`;
  }

  if (optionsEl) {
    optionsEl.innerHTML = "";
    const createdButtons = [];
    OPTION_TEXTS.forEach((text, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = `${"ABCDE"[idx]} ${text}`;
      btn.addEventListener("click", (evt) =>
        handleOptionSelect(index, idx + 1, answers, evt.currentTarget)
      );
      optionsEl.appendChild(btn);
      createdButtons.push(btn);
    });
    clearActiveOptions(optionsEl);
    selectedOption = null;
  }
}

function handleOptionSelect(index, value, answers, buttonEl) {
  selectedOption = value;
  const wasNull = answers[index] === null;
  answers[index] = value;
  saveAnswers(answers);
  const optionsEl = document.getElementById("options");
  clearActiveOptions(optionsEl);
  if (buttonEl) {
    buttonEl.classList.add("active");
  }
  updateProgress(answers);

  const nextIndex = index + 1 < QUESTIONS.length ? index + 1 : index;
  if (nextIndex !== index) {
    setTimeout(() => renderQuestion(nextIndex, answers), 1000);
  } else {
    setTimeout(() => {
      submitFinalAnswers(answers);
    }, 1000);
  }
}

function updateProgress(answers) {
  const completionTextEl = document.getElementById("completion-text");
  const progressEl = document.getElementById("progress-bar");
  const questionNumberEl = document.getElementById("question-number");
  const totalQuestions = QUESTIONS.length;
  const completedCount = answers.filter((v) => v !== null).length;

  if (completionTextEl) {
    completionTextEl.textContent = `已完成：${completedCount} / ${totalQuestions} | 选择后自动跳到下一题`;
  }
  if (progressEl) {
    progressEl.style.width = `${(completedCount / totalQuestions) * 100}%`;
  }
  if (questionNumberEl) {
    const text = questionNumberEl.textContent || "";
    const match = text.match(/第 (\d+) 题/);
    if (match) {
      const currentIndex = Number(match[1]) - 1;
      questionNumberEl.textContent = `第 ${currentIndex + 1} 题 / 共 ${totalQuestions} 题`;
    }
  }
}

let isSubmitting = false;

async function submitFinalAnswers(answers) {
  const errorEl = document.getElementById("error-message");
  if (errorEl) errorEl.textContent = "";

  const allDone = answers.every((item) => item !== null);
  if (!allDone || isSubmitting) return;
  isSubmitting = true;

  const result = calculateResults();
  if (!result) {
    isSubmitting = false;
    return;
  }

  const score = result.totalScore;
  const code =
    localStorage.getItem("redeem_code") || localStorage.getItem("redeemCode") || "";

  if (code) {
    markCodeUsed(code, score);
  }

  isSubmitting = false;
  window.location.href = "result.html";
}

function setupTestPage() {
  const questionNumberEl = document.getElementById("question-number");
  if (!questionNumberEl) return;
  if (!ensureRedeemAccess()) return;

  const answers = getStoredAnswers();
  let currentIndex = 0;

  const params = new URLSearchParams(window.location.search);
  const restoreIndex = Number(params.get("q"));
  if (!Number.isNaN(restoreIndex) && restoreIndex >= 1 && restoreIndex <= QUESTIONS.length) {
    currentIndex = restoreIndex - 1;
  }

  renderQuestion(currentIndex, answers);
  addEmojisToTitles();
  updateProgress(answers);

  const prevBtn = document.getElementById("prev-question-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentQuestionIndex = Math.max(0, currentQuestionIndex - 1);
      renderQuestion(currentQuestionIndex, answers);
    });
  }
}

// =====================
// 计算结果 & 渲染结果页（保持第一版逻辑）
// =====================
function calculateResults() {
  const answers = getStoredAnswers();
  const completedCount = answers.filter((v) => v !== null).length;
  if (completedCount !== QUESTIONS.length) {
    window.location.href = "test.html";
    return null;
  }

  const totalScore = answers.reduce((sum, v) => sum + (v || 0), 0);
  const stableIndex = Math.round((totalScore / 150) * 100);

  const dimensionTotals = {
    emotion_fluctuation: 0,
    stress_tolerance: 0,
    interpersonal_sensitivity: 0,
    self_repair: 0
  };

  QUESTIONS.forEach((q, idx) => {
    dimensionTotals[q.dimension] += answers[idx] || 0;
  });

  const dimensionScores = Object.keys(dimensionTotals).reduce((acc, key) => {
    acc[key] = Math.max(
      0,
      Math.min(100, Math.round((dimensionTotals[key] / 37.5) * 100))
    );
    return acc;
  }, {});

  let type = "A";
  if (stableIndex >= 75) type = "A";
  else if (stableIndex >= 45) type = "B";
  else type = "C";

  localStorage.setItem("emotionTestTotalScore", String(totalScore));
  localStorage.setItem("emotionTestStableIndex", String(stableIndex));
  localStorage.setItem("emotionTestDimensions", JSON.stringify(dimensionScores));
  localStorage.setItem("emotionTestType", type);

  return { answers, totalScore, stableIndex, dimensionScores, type };
}

function buildPortraitText(profile, scores, stableIndex) {
  return profile.profileHtml(scores, stableIndex);
}

function renderRadar(dimensionScores) {
  const radarCtx = document.getElementById("emotion-radar");
  if (!radarCtx || typeof Chart === "undefined") return;
  const radarLabels = [
    `情绪波动（${dimensionScores.emotion_fluctuation}）`,
    `压力承受（${dimensionScores.stress_tolerance}）`,
    `人际敏感度（${dimensionScores.interpersonal_sensitivity}）`,
    `自我修复力（${dimensionScores.self_repair}）`
  ];
  const radarData = [
    dimensionScores.emotion_fluctuation,
    dimensionScores.stress_tolerance,
    dimensionScores.interpersonal_sensitivity,
    dimensionScores.self_repair
  ];

  new Chart(radarCtx, {
    type: "radar",
    data: {
      labels: radarLabels,
      datasets: [
        {
          label: "得分",
          data: radarData,
          backgroundColor: "rgba(127, 184, 164, 0.22)",
          borderColor: "rgba(92, 156, 133, 0.9)",
          pointBackgroundColor: "rgba(92, 156, 133, 1)",
          pointBorderColor: "#fff",
          pointRadius: 4,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            display: true,
            stepSize: 20,
            backdropColor: "transparent",
            color: "#4a5b52",
            font: { size: 11 }
          },
          grid: {
            color: "rgba(92, 156, 133, 0.2)"
          },
          angleLines: {
            color: "rgba(92, 156, 133, 0.25)"
          },
          pointLabels: {
            color: "#2e3d33",
            font: { size: 12 },
            padding: 8
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      }
    }
  });
}

function renderResultPage() {
  const stableIndexEl = document.getElementById("stable-index");
  if (!stableIndexEl) return;

  const result = calculateResults();
  if (!result) return;

  const { stableIndex, dimensionScores, type } = result;
  const profile = EMOTION_PROFILES[type] || EMOTION_PROFILES.B;

  const emotionTypeEl = document.getElementById("emotion-type");
  const shortSummaryEl = document.getElementById("short-summary");

  stableIndexEl.textContent = `${stableIndex}`;
  if (emotionTypeEl) emotionTypeEl.textContent = `${type} ｜ ${profile.typeName}`;
  if (shortSummaryEl) shortSummaryEl.textContent = profile.summary;

  const portraitEl = document.getElementById("profile-html");
  if (portraitEl) portraitEl.innerHTML = buildPortraitText(profile, dimensionScores, stableIndex);

  const suggestionsEl = document.getElementById("gentle-suggestions");
  if (suggestionsEl) {
    suggestionsEl.innerHTML = "";
    profile.gentleSuggestions.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      suggestionsEl.appendChild(li);
    });
  }

  const quoteBlock = document.getElementById("healing-quote-block");
  if (quoteBlock) {
    const [q1, q2, q3] = profile.healingQuotes;
    const line1 = document.getElementById("quote-line-1");
    const line2 = document.getElementById("quote-line-2");
    const line3 = document.getElementById("quote-line-3");
    if (line1) line1.textContent = `🌿 ${q1}`;
    if (line2) line2.textContent = `🌿 ${q2}`;
    if (line3) line3.textContent = `🌿 ${q3}`;
  }

  renderRadar(dimensionScores);
  addEmojisToTitles();

  const saveBtn = document.getElementById("save-report-btn");
  if (saveBtn && typeof html2canvas !== "undefined") {
    saveBtn.addEventListener("click", () => {
      const target = document.getElementById("report-root");
      if (!target) return;
      html2canvas(target, { scale: 2, useCORS: true, backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "emotion-report.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    });
  }
}

// =====================
// 全局初始化
// =====================
function init() {
  addEmojisToTitles();
  setupHomePage();
  setupTestPage();
  renderResultPage();
}

document.addEventListener("DOMContentLoaded", init);


/******************************
 * 情绪安稳度测评 - 静态版（带兑换码）
 * - 不依赖飞书、不依赖 Netlify 函数
 * - 兑换码从根目录 codes.json 读取
 * - 题目 & 结果逻辑 = 你第一版的内容
 ******************************/

// =====================
// 题库（30 题）
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
  { id: 19, text: "在人际中，如果感到不适，我能礼貌表达并调整。", dimension: "interpersonal_sensitivity" },
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

// =====================
// 结果画像 & 文案（第一版）
// =====================
const EMOTION_PROFILES = {
  A: {
    typeName: "柔韧自持型",
    summary: "你能很好照顾自己的节奏，在压力中保持从容和稳度。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}。整体来看，情绪波动觉察 ${scores.emotion_fluctuation}，说明你能看见细微的起伏并愿意陪伴；压力承受 ${scores.stress_tolerance}，让你在忙碌中仍能找到调节节奏的小口子；人际敏感度 ${scores.interpersonal_sensitivity}，支持你在关系里细腻感知善意与距离；自我修复力 ${scores.self_repair}，帮助你在消耗之后慢慢补能。</p>
      <p>这种自持与柔软的平衡，会让你在不同场景里保持从容。</p>
    `,
    healingQuotes: [
      "不必一次完成所有改变，小步也能抵达。",
      "当你看见自己的努力，温柔就留在心里。",
      "允许自己偶尔靠岸，才能带着能量再出发。"
    ],
    gentleSuggestions: [
      "保持规律作息与简单饮食，让身体成为稳稳的底座。",
      "压力多时，先写下三件做得好的小行动，慢慢推进。",
      "每天给自己一段独处的时间，听音乐、写字或做深呼吸。"
    ]
  },
  B: {
    typeName: "轻波动型",
    summary: "你大多时候是平稳的，只是偶尔起伏，需要一点节奏照顾就能回到舒适。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}。情绪波动觉察 ${scores.emotion_fluctuation}，说明你能注意到内心的小波澜；压力承受 ${scores.stress_tolerance}，提醒你在忙碌时记得小憩；人际敏感度 ${scores.interpersonal_sensitivity}，让你在互动中更懂得照顾彼此感受；自我修复力 ${scores.self_repair}，支持你在疲惫后慢慢恢复。</p>
      <p>当你愿意为自己保留喘息空间，稳定感会更常驻。</p>
    `,
    healingQuotes: [
      "情绪有潮汐，停一停也很好。",
      "你敏感的心，也在寻找温柔的支点。",
      "小小的照顾，也能让能量慢慢回到身体。"
    ],
    gentleSuggestions: [
      "保证 7–8 小时睡眠，少量多次补水，保持轻盈感。",
      "心绪起伏时试试 4–7–8 呼吸法，或写下当下的想法。",
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
      "在被理解之前，也要先理解自己。",
      "你值得被温柔以待。"
    ],
    gentleSuggestions: [
      "睡前减少刷屏，用温水泡脚或拉伸，帮身体先放松下来。",
      "紧绷时试着把手放在心口，做 5 分钟缓慢呼吸，告诉自己“我在陪着你”。",
      "感到压抑时，去阳台或楼下走走，看看绿植、感受风和阳光。"
    ]
  }
};

// =====================
// 工具函数：标题加 emoji
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

// =====================
// 本地存储答题
// =====================
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

// =====================
// 加载兑换码列表（从 codes.json）
// =====================
let __codesCache = null;

async function loadCodes() {
  if (__codesCache) return __codesCache;
  const res = await fetch("codes.json", { cache: "no-cache" });
  if (!res.ok) {
    throw new Error("兑换码列表加载失败");
  }
  const data = await res.json();
  __codesCache = Array.isArray(data.codes) ? data.codes : [];
  return __codesCache;
}

// 记录本设备已经用过的兑换码（防重复）
function markCodeUsedLocally(code) {
  const raw = localStorage.getItem("usedCodes") || "[]";
  let arr;
  try {
    arr = JSON.parse(raw);
  } catch {
    arr = [];
  }
  if (!arr.includes(code)) {
    arr.push(code);
    localStorage.setItem("usedCodes", JSON.stringify(arr));
  }
}

function isCodeUsedLocally(code) {
  const raw = localStorage.getItem("usedCodes") || "[]";
  try {
    const arr = JSON.parse(raw);
    return arr.includes(code);
  } catch {
    return false;
  }
}

// =====================
// 首页：兑换逻辑（index.html）
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
      redeemMessage.textContent = "正在校验兑换码，请稍候…";
      redeemMessage.style.color = "#5f6f65";
    }

    try {
      const list = await loadCodes();
      const found = list.find((item) => (item.code || "").toUpperCase() === code);

      if (!found) {
        if (redeemMessage) {
          redeemMessage.textContent = "兑换码不存在或已失效，请核对后再试～";
          redeemMessage.style.color = "#c0392b";
        }
        return;
      }

      if (isCodeUsedLocally(code)) {
        if (redeemMessage) {
          redeemMessage.textContent = "这个兑换码已经在本设备使用过啦～";
          redeemMessage.style.color = "#c0392b";
        }
        return;
      }

      // 通过校验，写入本地 & 进入答题页
      localStorage.setItem("redeem_code", code);
      localStorage.setItem("redeemCode", code);
      localStorage.removeItem("emotionTestAnswers"); // 清理旧答案
      markCodeUsedLocally(code);

      if (redeemMessage) {
        redeemMessage.textContent = "兑换成功，正在为你开启测评…";
        redeemMessage.style.color = "#2e7d32";
      }

      setTimeout(() => {
        window.location.href = "test.html";
      }, 500);
    } catch (error) {
      console.error(error);
      if (redeemMessage) {
        redeemMessage.textContent = "网络有点小波动，请稍后再试～";
        redeemMessage.style.color = "#c0392b";
      }
    }
  });
}

// =====================
// 答题页：权限 + 渲染题目
// =====================
function ensureRedeemAccess() {
  const code = localStorage.getItem("redeem_code") || localStorage.getItem("redeemCode");
  if (!code) {
    window.location.href = "index.html?needCode=1";
    return false;
  }
  return true;
}

let currentQuestionIndex = 0;
let selectedOption = null;

function clearActiveOptions(optionsEl) {
  if (!optionsEl) return;
  optionsEl.querySelectorAll(".option-btn").forEach((btn) => btn.classList.remove("active"));
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
    OPTION_TEXTS.forEach((text, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = `${"ABCDE"[idx]} ${text}`;
      btn.addEventListener("click", (evt) =>
        handleOptionSelect(index, idx + 1, answers, evt.currentTarget)
      );
      optionsEl.appendChild(btn);
    });
    clearActiveOptions(optionsEl);
    selectedOption = null;
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

function handleOptionSelect(index, value, answers, buttonEl) {
  const errorEl = document.getElementById("error-message");
  if (errorEl) errorEl.textContent = "";

  const wasNull = answers[index] === null;
  answers[index] = value;
  saveAnswers(answers);

  const optionsEl = document.getElementById("options");
  clearActiveOptions(optionsEl);
  if (buttonEl) buttonEl.classList.add("active");

  updateProgress(answers);

  const nextIndex = index + 1 < QUESTIONS.length ? index + 1 : index;
  if (nextIndex !== index) {
    setTimeout(() => renderQuestion(nextIndex, answers), 700);
  } else {
    // 最后一题，直接跳结果
    if (isSubmitting) return;
    isSubmitting = true;
    setTimeout(() => {
      window.location.href = "result.html";
    }, 500);
  }
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
// 结果计算 & 渲染
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
          grid: { color: "rgba(92, 156, 133, 0.2)" },
          angleLines: { color: "rgba(92, 156, 133, 0.25)" },
          pointLabels: {
            color: "#2e3d33",
            font: { size: 12 },
            padding: 8,
            callback: (v) => v
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
  if (portraitEl) {
    portraitEl.innerHTML = buildPortraitText(profile, dimensionScores, stableIndex);
  }

  const suggestionsEl = document.getElementById("gentle-suggestions");
  if (suggestionsEl) {
    suggestionsEl.innerHTML = "";
    profile.gentleSuggestions.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      suggestionsEl.appendChild(li);
    });
  }

  const line1 = document.getElementById("quote-line-1");
  const line2 = document.getElementById("quote-line-2");
  const line3 = document.getElementById("quote-line-3");
  const [q1, q2, q3] = profile.healingQuotes;
  if (line1) line1.textContent = `🌿 ${q1}`;
  if (line2) line2.textContent = `🌿 ${q2}`;
  if (line3) line3.textContent = `🌿 ${q3}`;

  renderRadar(dimensionScores);
  addEmojisToTitles();

  const saveBtn = document.getElementById("save-report-btn");
  if (saveBtn && typeof html2canvas !== "undefined") {
    saveBtn.addEventListener("click", () => {
      const target = document.getElementById("report-root");
      if (!target) return;
      html2canvas(target, { scale: 2, useCORS: true, backgroundColor: null }).then(
        (canvas) => {
          const link = document.createElement("a");
          link.download = "emotion-report.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      );
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

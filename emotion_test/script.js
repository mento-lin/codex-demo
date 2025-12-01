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

const VALID_REDEEM_CODES = ["GREEN2024", "CALMHEAL", "SOFTCARE"];

function validateRedeemCode(code) {
  const trimmed = (code || "").trim();
  if (!trimmed) return { ok: false, error: "empty" };
  if (VALID_REDEEM_CODES.length === 0 || VALID_REDEEM_CODES.includes(trimmed)) {
    return { ok: true };
  }
  return { ok: false, error: "invalid" };
}

const EMOTION_PROFILES = {
  S: {
    typeName: "温柔稳定型",
    summary: "你像一片稳稳的湖面，能以柔软接住情绪的起伏。拥有成熟而柔和的力量。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}，像清晨湖水般平稳。情绪波动觉察 ${scores.emotion_fluctuation}，你能敏锐捕捉并接住起伏；压力承受 ${scores.stress_tolerance}，说明你会在忙碌中保持呼吸感；人际敏感 ${scores.interpersonal_sensitivity}，让你能温柔回应他人；自我修复 ${scores.self_repair}，让恢复力像缓缓流动的河。</p>
      <p>这份柔韧的稳定，让你能以宽和的节奏照顾自己，也给身边人带来安定。</p>
    `,
    smallSignals: [
      "你能轻易分辨身体与情绪的小波动，并及时回应。",
      "面对复杂信息时，仍能保持从容的排序和选择。",
      "偶尔需要独处时，会温柔地为自己留出空间。"
    ],
    hiddenStrengthsHtml: `
      <p>成熟的情绪调频能力，让你在变化里保持柔软的稳度。</p>
      <p>你能将敏感转化为共情，也能用界限保护自己。</p>
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
  A: {
    typeName: "柔韧自持型",
    summary: "你能很好照顾自己的节奏，在压力中保持从容和稳度。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}，整体柔韧。情绪波动觉察 ${scores.emotion_fluctuation}，说明你看见起伏并愿意陪伴；压力承受 ${scores.stress_tolerance}，能在紧张时调整节奏；人际敏感 ${scores.interpersonal_sensitivity}，让你在互动中温柔而有界限；自我修复 ${scores.self_repair}，支持你在消耗后慢慢补能。</p>
      <p>这种自持与柔软的平衡，会让你在不同场景里保持从容。</p>
    `,
    smallSignals: [
      "忙碌时会主动安排小休息，避免过度耗竭。",
      "在人际中能表达需求，同时留意他人感受。",
      "当心绪涌现时，会找一处安静角落缓和自己。"
    ],
    hiddenStrengthsHtml: `
      <p>你能将压力拆解成可行步骤，也能在需要时寻求支持。</p>
      <p>你的敏感帮助你捕捉细节，同时守住舒适边界。</p>
    `,
    healingQuotes: [
      "不必一次完成所有改变，小步也能抵达。",
      "当你看见自己的努力，温柔就留在心里。",
      "允许自己偶尔靠岸，才能带着能量再出发。"
    ],
    gentleSuggestions: [
      "保持规律作息与简单饮食，让身体成为稳固的底座。",
      "压力多时，先写下三步可做的小行动，慢慢推进。",
      "每天给自己一段独处时间，听音乐、写字或做深呼吸。"
    ]
  },
  B: {
    typeName: "波动调节型",
    summary: "你大多数时候是稳定的，只是偶尔会产生小波动；你的恢复力很强。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}，整体平衡中带着些许波动。情绪波动觉察 ${scores.emotion_fluctuation}，说明你能察觉变化；压力承受 ${scores.stress_tolerance}，在忙碌时仍需更多喘息；人际敏感 ${scores.interpersonal_sensitivity}，让你温柔而细腻；自我修复 ${scores.self_repair}，帮助你在起伏后恢复。</p>
      <p>你已经具备良好的调节基础，只需多一点节奏照顾，稳定感会更常驻。</p>
    `,
    smallSignals: [
      "在信息较多的日子里会短暂紧绷，但能意识到并调整。",
      "偶尔想一个人安静下来，给自己留些空间。",
      "注意到人际细节时，会希望得到更多确认与理解。"
    ],
    hiddenStrengthsHtml: `
      <p>你的觉察力让你能及时发现需要，被提醒后能迅速调整。</p>
      <p>你具备恢复与学习的能力，每次波动都在累积经验。</p>
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
    typeName: "敏感易波型",
    summary: "你的感觉细腻敏感，偶尔起波动，这不是弱点，只是需要更多空间照顾。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}，说明近期可能更敏感。情绪波动觉察 ${scores.emotion_fluctuation}，你能清楚感受每一次起伏；压力承受 ${scores.stress_tolerance}，提醒你在紧张时放慢脚步；人际敏感 ${scores.interpersonal_sensitivity}，让你容易被情绪感染；自我修复 ${scores.self_repair}，正在学习如何让恢复更柔软。</p>
      <p>这些感觉都是宝贵的信号，你可以用更温柔的方式陪伴它们。</p>
    `,
    smallSignals: [
      "当声音或节奏过快时，容易感到紧绷，需要安静角落。",
      "在意他人反应，偶尔会因为细节而情绪波动。",
      "低落时更需要陪伴、光照或触摸柔软物。"
    ],
    hiddenStrengthsHtml: `
      <p>你的细腻让你具备高敏感的感受力，也更能共情他人。</p>
      <p>你在尝试的每个自我照顾动作，都是韧性正在被养成。</p>
    `,
    healingQuotes: [
      "请照顾好那份敏感，它让你看到别人忽略的美好。",
      "当情绪像波浪，岸就在你心里。",
      "你值得被温柔对待，包括来自自己。"
    ],
    gentleSuggestions: [
      "保持规律作息，睡前少刷屏，用温水泡脚帮助放松。",
      "紧绷时捂住心口或做 5 分钟呼吸，让身体先安定。",
      "去阳台或公园走走，看看绿植、感受风与阳光。"
    ]
  },
  D: {
    typeName: "情绪疲惫型",
    summary: "你最近可能很累，值得多一些休息、支持与拥抱。慢慢来，没有关系。",
    profileHtml: (scores, esi) => `
      <p>你的情绪安稳指数为 ${esi}，说明近期能量可能偏低。情绪波动觉察 ${scores.emotion_fluctuation}，显示你感到起伏明显；压力承受 ${scores.stress_tolerance}，提示你需要更温柔的支撑；人际敏感 ${scores.interpersonal_sensitivity}，让你更易受到外界影响；自我修复 ${scores.self_repair}，正在寻找恢复的方法。</p>
      <p>这不是评判，而是邀请你多给自己休息、靠近支持，慢慢恢复。</p>
    `,
    smallSignals: [
      "容易疲倦或分心，处理信息时需要更长时间。",
      "在社交后可能感到消耗，需要独处充电。",
      "情绪低落时，渴望有人陪伴或一个安全的角落。"
    ],
    hiddenStrengthsHtml: `
      <p>即便疲惫，你仍在努力照顾自己，这本身就是温柔的勇气。</p>
      <p>你的敏感让你对善意格外珍惜，也能成为日后复原的力量。</p>
    `,
    healingQuotes: [
      "慢慢来，没有关系。",
      "你值得被好好照顾，包括被自己照顾。",
      "休息也是向前的一部分。"
    ],
    gentleSuggestions: [
      "保证规律饮食与睡眠，必要时让自己多睡一会儿。",
      "安排轻量的自我安抚：热水淋浴、写字、深呼吸。",
      "选择温和的运动，如散步、伸展或晒晒太阳，慢慢补能。"
    ]
  }
};

let currentQuestionIndex = 0;
let selectedOption = null;

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

function setupHomePage() {
  const startBtn = document.getElementById("start-test-btn");
  const redeemInput = document.getElementById("redeem-code-input");
  const redeemMessage = document.getElementById("redeem-message");
  const params = new URLSearchParams(window.location.search);
  if (params.get("needCode") === "1" && redeemMessage) {
    redeemMessage.textContent = "请先输入兑换码，再开始测评～";
  }
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const code = redeemInput ? redeemInput.value : "";
      const result = validateRedeemCode(code);
      if (!result.ok) {
        if (redeemMessage) {
          redeemMessage.textContent =
            result.error === "invalid"
              ? "兑换码不存在或已被使用"
              : "先输入兑换码，才能为你开启专属测评哦～";
        }
        return;
      }
      if (redeemMessage) {
        redeemMessage.textContent = "兑换码验证通过，正在为你开启测评...";
      }
      localStorage.setItem("redeemCode", (code || "").trim());
      setTimeout(() => {
        window.location.href = "test.html";
      }, 300);
    });
  }
}

function clearActiveOptions(optionsEl) {
  if (!optionsEl) return;
  optionsEl.querySelectorAll(".option-btn").forEach((btn) => btn.classList.remove("active"));
}

function ensureRedeemAccess() {
  const code = localStorage.getItem("redeemCode");
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
      btn.addEventListener("click", (evt) => handleOptionSelect(index, idx + 1, answers, evt.currentTarget));
      optionsEl.appendChild(btn);
      createdButtons.push(btn);
    });
    clearActiveOptions(optionsEl);
    const storedAnswer = answers[index];
    if (storedAnswer) {
      selectedOption = storedAnswer;
      const matchBtn = createdButtons[storedAnswer - 1];
      if (matchBtn) {
        matchBtn.classList.add("active");
      }
    }
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
  if (wasNull) {
    updateProgress(answers);
  } else {
    updateProgress(answers);
  }
  const nextIndex = index + 1 < QUESTIONS.length ? index + 1 : index;
  if (nextIndex !== index) {
    setTimeout(() => renderQuestion(nextIndex, answers), 1000);
  } else {
    setTimeout(() => {
      window.location.href = "result.html";
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
    acc[key] = Math.max(0, Math.min(100, Math.round((dimensionTotals[key] / 37.5) * 100)));
    return acc;
  }, {});

  let type = "B";
  if (stableIndex >= 85) type = "S";
  else if (stableIndex >= 75) type = "A";
  else if (stableIndex >= 60) type = "B";
  else if (stableIndex >= 45) type = "C";
  else type = "D";

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
  if (!radarCtx) return;
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
  const profile = EMOTION_PROFILES[type];

  const emotionTypeEl = document.getElementById("emotion-type");
  const shortSummaryEl = document.getElementById("short-summary");

  stableIndexEl.textContent = `${stableIndex}`;
  if (emotionTypeEl) emotionTypeEl.textContent = `${type} ｜ ${profile.typeName}`;
  if (shortSummaryEl) shortSummaryEl.textContent = profile.summary;

  const portraitEl = document.getElementById("profile-html");
  if (portraitEl) portraitEl.innerHTML = buildPortraitText(profile, dimensionScores, stableIndex);

  const signalsEl = document.getElementById("small-signals");
  if (signalsEl) {
    signalsEl.innerHTML = "";
    profile.smallSignals.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      signalsEl.appendChild(li);
    });
  }

  const strengthsEl = document.getElementById("hidden-strengths");
  if (strengthsEl) strengthsEl.innerHTML = profile.hiddenStrengthsHtml;

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
  if (saveBtn) {
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

function init() {
  addEmojisToTitles();
  setupHomePage();
  setupTestPage();
  renderResultPage();
}

document.addEventListener("DOMContentLoaded", init);
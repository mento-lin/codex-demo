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
// 通用数据
const optionLabels = ["非常不符合", "不太符合", "一般", "比较符合", "非常符合"];
const questionBank = [
  { text: "过去一周，你是否常感到情绪像过山车般忽高忽低？", dimension: "emotion_fluctuation" },
  { text: "面对紧急任务时，你能否快速稳定情绪并投入行动？", dimension: "stress_tolerance" },
  { text: "当身边的人语气变化时，你是否会立刻揣测对方想法？", dimension: "interpersonal_sensitivity" },
  { text: "遇到挫折后，你会主动寻找让自己平静的方法吗？", dimension: "self_repair" },
  { text: "小事出差错时，你会不会瞬间情绪低落或沮丧？", dimension: "emotion_fluctuation" },
  { text: "工作/学习压力大时，你是否仍能按计划完成关键事项？", dimension: "stress_tolerance" },
  { text: "与人相处时，你会频繁揣测“是不是我哪里做错了”？", dimension: "interpersonal_sensitivity" },
  { text: "夜晚情绪低落时，你会尝试写日记、散步或冥想来缓冲吗？", dimension: "self_repair" },
  { text: "突发事件时，你的情绪是否容易被放大并影响决策？", dimension: "emotion_fluctuation" },
  { text: "高压下，你能否把注意力放在当下、而非担心最坏结果？", dimension: "stress_tolerance" },
  { text: "当别人无回应或回复简短时，你会不会过度解读？", dimension: "interpersonal_sensitivity" },
  { text: "感到疲惫时，你会主动给自己留出充电休息的时间吗？", dimension: "self_repair" },
  { text: "你是否经常在一天里出现多次情绪波动？", dimension: "emotion_fluctuation" },
  { text: "压力来袭时，你是否能分解任务、逐步推进？", dimension: "stress_tolerance" },
  { text: "社交场合里，你会不会为了一句不经意的话反复回想？", dimension: "interpersonal_sensitivity" },
  { text: "情绪低谷时，你是否愿意向信任的人寻求支持？", dimension: "self_repair" },
  { text: "在同一件事情上，你的心情是否常从期待跳到失望？", dimension: "emotion_fluctuation" },
  { text: "面对超出预期的挑战，你能否维持基本节奏而不失控？", dimension: "stress_tolerance" },
  { text: "别人表情略有变化时，你会迅速联想到自己被否定吗？", dimension: "interpersonal_sensitivity" },
  { text: "当情绪受伤时，你会不会写下正向提醒、鼓励自己？", dimension: "self_repair" },
  { text: "日常琐事的波动是否经常牵动你的心情？", dimension: "emotion_fluctuation" },
  { text: "突如其来的压力下，你能否保持清晰思路？", dimension: "stress_tolerance" },
  { text: "当关系中的界限模糊时，你会容易不安或敏感吗？", dimension: "interpersonal_sensitivity" },
  { text: "忙碌后，你是否会给自己安排小小的奖赏或松弛时间？", dimension: "self_repair" },
  { text: "情绪激动后，你需要很久才能恢复到平静状态吗？", dimension: "emotion_fluctuation" },
  { text: "遇到不可控的事情，你能接受现状并寻找可行解吗？", dimension: "stress_tolerance" },
  { text: "听到他人批评时，你会不会立刻否定自我？", dimension: "interpersonal_sensitivity" },
  { text: "经历低谷后，你能否总结经验并带着好奇再出发？", dimension: "self_repair" },
  { text: "你是否容易因为别人的情绪而迅速被带偏？", dimension: "emotion_fluctuation" },
  { text: "当计划被打乱时，你能否迅速调整、重新安排优先级？", dimension: "stress_tolerance" },
];

// LocalStorage 工具
const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

function setStatus(el, message, isError = false) {
  if (!el) return;
  el.textContent = message || "";
  el.style.color = isError ? "#d64545" : "#1f7a5a";
}

async function redeemCode(code) {
  const resp = await fetch(`/api/check-code?code=${encodeURIComponent(code)}`, {
    method: "GET",
  });
  return resp.json();
}

async function submitResult(uid, score, dimensions) {
  const resp = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, score, dimensions }),
  });
  return resp.json();
}

function computeScores(answers) {
  const dimensions = {
    emotion_fluctuation: 0,
    stress_tolerance: 0,
    interpersonal_sensitivity: 0,
    self_repair: 0,
  };
  let total = 0;
  answers.forEach((value, idx) => {
    if (typeof value === "number") {
      total += value;
      const dim = questionBank[idx].dimension;
      dimensions[dim] += value;
    }
  });
  const stabilityIndex = Math.round((total / 150) * 100);
  return { total, stabilityIndex, dimensions };
}

function classifyType(index) {
  if (index >= 85) return "S";
  if (index >= 70) return "A";
  if (index >= 55) return "B";
  if (index >= 40) return "C";
  return "D";
}

const insightsByGrade = {
  S: {
    name: "松弛掌控型",
    portrait: "你的情绪像被阳光晕染的湖面，偶有微澜但总体平稳，能在关键时刻保持清晰判断。",
    signals: "偶尔的小焦虑更多来自责任感，留意不要为完美主义加码。",
    strengths: "高水平的自洽与压稳力，能安抚他人情绪并带动团队定心。",
    suggestions: "继续保持规律的作息与边界感，给自己留出无性能的松弛时刻。",
    quote: "你已经足够稳，允许自己偶尔慢下来，静听内心的柔软回响。",
  },
  A: {
    name: "稳步向前型",
    portrait: "你大多时候保持平衡，压力来时能自我调节，偶尔的小波动也能很快复位。",
    signals: "当外界反馈模糊时会短暂敏感，提醒自己先确认事实，再回应情绪。",
    strengths: "具备稳定的执行力和温柔的共情力，能给周围人带来安定感。",
    suggestions: "练习在忙碌后做短暂停顿，比如 5 分钟深呼吸，让情绪有落脚点。",
    quote: "稳步向前的你，值得把温柔也分给自己，让能量慢慢蓄满。",
  },
  B: {
    name: "波澜可控型",
    portrait: "情绪偶有波动，但你愿意自我观察并寻找平衡点，整体处于可调节状态。",
    signals: "在关系与期待受挫时会敏感，容易陷入反复回想。",
    strengths: "自省力较强，能主动尝试工具（记录、运动、对话）来修复心绪。",
    suggestions: "设定“情绪缓冲区”，在情绪起伏时先暂停 10 分钟，让自己从事件中抽离。",
    quote: "波澜会有，但你已经在学会撑伞与靠岸，每一步都算数。",
  },
  C: {
    name: "易感修复型",
    portrait: "你对外界变化敏感，情绪容易被带动，但也在寻找修复的节奏。",
    signals: "高压或关系不确定时，容易陷入自我否定或过度揣测。",
    strengths: "真诚且细腻，愿意为重要的人和事付出，具备温柔的洞察力。",
    suggestions: "为自己建立清晰的支持清单：呼吸练习、短途散步、向可信的人表达需求。",
    quote: "请相信，情绪的波动不是缺陷，而是你对世界的深刻感知。",
  },
  D: {
    name: "高敏调适型",
    portrait: "目前的情绪波动较大，压力与关系反馈会迅速牵动你的内在。",
    signals: "可能频繁自我怀疑或被情绪拉扯，难以专注当下。",
    strengths: "敏感是一种天赋，你能捕捉微小的信号，也拥有重新塑造节奏的潜力。",
    suggestions: "尝试为自己设立每日情绪检查点，记录 3 个让你感到安稳的小事，并寻求专业/信任的支持。",
    quote: "你值得被温柔对待，也值得把温柔给自己，慢慢来，已经很好。",
  },
};

function normalizeDimensions(dimensions) {
  const counts = {
    emotion_fluctuation: questionBank.filter((q) => q.dimension === "emotion_fluctuation").length,
    stress_tolerance: questionBank.filter((q) => q.dimension === "stress_tolerance").length,
    interpersonal_sensitivity: questionBank.filter((q) => q.dimension === "interpersonal_sensitivity").length,
    self_repair: questionBank.filter((q) => q.dimension === "self_repair").length,
  };
  const normalized = {};
  Object.keys(dimensions).forEach((key) => {
    const max = counts[key] * 5 || 1;
    normalized[key] = Math.round((dimensions[key] / max) * 100);
  });
  return normalized;
}

function renderRadarChart(dimensions) {
  const ctx = document.getElementById("radar-chart");
  if (!ctx || typeof Chart === "undefined") return null;
  const labels = ["情绪波动", "压力承载", "关系敏感", "自我修复"];
  const data = [
    dimensions.emotion_fluctuation,
    dimensions.stress_tolerance,
    dimensions.interpersonal_sensitivity,
    dimensions.self_repair,
  ];
  return new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "情绪维度",
          data,
          backgroundColor: "rgba(45, 160, 122, 0.18)",
          borderColor: "#2da07a",
          borderWidth: 2,
          pointBackgroundColor: "#2da07a",
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { display: false },
          grid: { color: "rgba(45,160,122,0.15)" },
          angleLines: { color: "rgba(45,160,122,0.2)" },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}

function bindSaveReport() {
  const btn = document.getElementById("save-report");
  const status = document.getElementById("result-message");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const card = document.getElementById("report-card");
    if (!card || typeof html2canvas === "undefined") return;
    setStatus(status, "正在生成图片…", false);
    const canvas = await html2canvas(card);
    const link = document.createElement("a");
    link.download = "情绪安稳度报告.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setStatus(status, "报告图片已保存。", false);
  });
}

function initRedeemPage() {
  const codeInput = document.getElementById("redeem-code");
  const orderInput = document.getElementById("order-id");
  const submitBtn = document.getElementById("redeem-submit");
  const message = document.getElementById("redeem-message");

  if (!submitBtn) return;
  submitBtn.addEventListener("click", async () => {
    const code = codeInput?.value?.trim();
    const orderId = orderInput?.value?.trim();
    if (!code) {
      setStatus(message, "请填写兑换码噢~", true);
      return;
    }
    submitBtn.disabled = true;
    setStatus(message, "正在校验兑换码…", false);
    try {
      const result = await redeemCode(code, orderId);
      if (result.success) {
        storage.set("et_code", code);
        storage.set("et_order", orderId || "");
        storage.set("et_uid", orderId || code);
        storage.set("et_answers", Array(questionBank.length).fill(null));
        storage.set("et_progress", 0);
        storage.remove("et_result");
        window.location.href = "test.html";
      } else {
        setStatus(message, result.message || "兑换失败，请稍后重试", true);
      }
    } catch (err) {
      setStatus(message, "服务暂时不可用，请稍后重试", true);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function renderQuestion(index, answers) {
  const questionText = document.getElementById("question-text");
  const optionList = document.getElementById("option-list");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");

  const question = questionBank[index];
  if (!questionText || !optionList || !question) return;

  questionText.textContent = question.text;
  optionList.innerHTML = "";
  optionLabels.forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn" + (answers[index] === idx + 1 ? " selected" : "");
    btn.textContent = label;
    btn.type = "button";
    btn.dataset.value = String(idx + 1);
    btn.addEventListener("click", () => handleAnswer(index, idx + 1));
    optionList.appendChild(btn);
  });

  if (progressText) progressText.textContent = `第 ${index + 1} / ${questionBank.length} 题`;
  if (progressBar) progressBar.style.width = `${((index + 1) / questionBank.length) * 100}%`;
}

function handleAnswer(index, value) {
  const message = document.getElementById("test-message");
  const answers = storage.get("et_answers", Array(questionBank.length).fill(null));
  answers[index] = value;
  storage.set("et_answers", answers);

  if (index < questionBank.length - 1) {
    const nextIndex = index + 1;
    storage.set("et_progress", nextIndex);
    renderQuestion(nextIndex, answers);
  } else {
    finalizeTest(answers, message);
  }
}

async function finalizeTest(answers, messageEl) {
  if (answers.some((v) => v === null)) {
    setStatus(messageEl, "还有未完成的题目哦~", true);
    return;
  }
  const uid = storage.get("et_uid", "");
  if (!uid) {
    setStatus(messageEl, "身份信息缺失，请重新兑换进入。", true);
    setTimeout(() => (window.location.href = "index.html"), 1500);
    return;
  }

  const { total, stabilityIndex, dimensions } = computeScores(answers);
  const grade = classifyType(stabilityIndex);
  const normalized = normalizeDimensions(dimensions);
  const result = { score: total, stabilityIndex, dimensions: normalized, grade };
  storage.set("et_result", result);

  setStatus(messageEl, "正在提交结果…", false);
  try {
    const resp = await submitResult(uid, total, normalized);
    if (!resp.success) {
      setStatus(messageEl, resp.message || "提交失败，请稍后重试", true);
      return;
    }
    setStatus(messageEl, "提交成功，正在生成报告…", false);
    setTimeout(() => {
      window.location.href = "result.html";
    }, 400);
  } catch (err) {
    setStatus(messageEl, "提交失败，请稍后重试", true);
  }
}

function initTestPage() {
  const uid = storage.get("et_uid", "");
  if (!uid) {
    window.location.href = "index.html";
    return;
  }
  const answers = storage.get("et_answers", Array(questionBank.length).fill(null));
  const startIndex = Math.min(storage.get("et_progress", 0) || 0, questionBank.length - 1);
  renderQuestion(startIndex, answers);
}

function initResultPage() {
  const result = storage.get("et_result", null);
  const message = document.getElementById("result-message");
  if (!result) {
    setStatus(message, "未找到测评数据，请重新开始。", true);
    return;
  }
  const profile = insightsByGrade[result.grade] || insightsByGrade.D;
  const typeLabel = document.getElementById("type-label");
  const scoreNumber = document.getElementById("score-number");
  const emotionPortrait = document.getElementById("emotion-portrait");
  const smallSignals = document.getElementById("small-signals");
  const hiddenStrengths = document.getElementById("hidden-strengths");
  const suggestions = document.getElementById("suggestions");
  const goldenLine = document.getElementById("golden-line");
  const dimensionList = document.getElementById("dimension-list");

  if (typeLabel) typeLabel.textContent = `${result.grade} · ${profile.name}`;
  if (scoreNumber) scoreNumber.textContent = `${result.stabilityIndex}`;
  if (emotionPortrait) emotionPortrait.textContent = profile.portrait;
  if (smallSignals) smallSignals.textContent = profile.signals;
  if (hiddenStrengths) hiddenStrengths.textContent = profile.strengths;
  if (suggestions) suggestions.textContent = profile.suggestions;
  if (goldenLine) goldenLine.textContent = profile.quote;

  if (dimensionList) {
    dimensionList.innerHTML = "";
    const labels = {
      emotion_fluctuation: "情绪波动",
      stress_tolerance: "压力承载",
      interpersonal_sensitivity: "关系敏感",
      self_repair: "自我修复",
    };
    Object.keys(result.dimensions).forEach((key) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${labels[key] || key}</span><strong>${result.dimensions[key]}</strong>`;
      dimensionList.appendChild(li);
    });
  }

  renderRadarChart(result.dimensions);
  bindSaveReport();
}

function initPage() {
  const page = document.body.dataset.page;
  if (page === "redeem") initRedeemPage();
  if (page === "test") initTestPage();
  if (page === "result") initResultPage();
}

document.addEventListener("DOMContentLoaded", initPage);


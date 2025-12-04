/******************************
 *  情绪安稳度测评 - 最终本地版
 *  无需飞书，无需 API，无需 /api
 ******************************/

// =====================
// 题库（30题）
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
  { id: 30, text: "当压力积累时，我愿意向可信赖的人求助。", dimension: "stress_tolerance" },
];

const OPTION_TEXTS = ["非常不符合", "有点不符合", "一般般", "比较符合", "非常符合"];

// 本地兑换码（你可随时修改）
const VALID_REDEEM_CODES = ["GREEN2024", "CALMHEAL", "SOFTCARE"];

// =====================
// 本地校验兑换码
// =====================
function validateRedeemCode(code) {
  const trimmed = (code || "").trim();
  if (!trimmed) return { ok: false, error: "empty" };
  if (VALID_REDEEM_CODES.includes(trimmed)) return { ok: true };
  return { ok: false, error: "invalid" };
}

// =====================
// 页面初始化（index）
// =====================
function setupHomePage() {
  const startBtn = document.getElementById("redeem-submit");
  if (!startBtn) return;

  startBtn.addEventListener("click", () => {
    const codeInput = document.getElementById("redeem-code");
    const message = document.getElementById("redeem-message");
    const code = codeInput.value.trim();

    const check = validateRedeemCode(code);
    if (!check.ok) {
      message.textContent = check.error === "empty" ? "请输入兑换码" : "兑换码无效";
      message.style.color = "#d33";
      return;
    }

    // 保存兑换码
    localStorage.setItem("redeemCode", code);
    localStorage.setItem("emotionTestAnswers", JSON.stringify(Array(QUESTIONS.length).fill(null)));

    message.textContent = "兑换成功，正在跳转…";
    message.style.color = "#2e7";

    setTimeout(() => (window.location.href = "test.html"), 400);
  });
}

// =====================
// test.html 渲染题目
// =====================
function renderTestPage() {
  if (!document.body.dataset.page === "test") return;

  const answers = JSON.parse(localStorage.getItem("emotionTestAnswers")) || Array(QUESTIONS.length).fill(null);
  let index = 0;

  function renderQuestion(i) {
    index = i;

    document.getElementById("question-text").textContent = QUESTIONS[i].text;
    document.getElementById("question-number").textContent = `第 ${i + 1} 题 / 共 30 题`;

    const optionsEl = document.getElementById("options");
    optionsEl.innerHTML = "";

    OPTION_TEXTS.forEach((text, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = `${"ABCDE"[idx]}  ${text}`;
      btn.onclick = () => handleSelect(idx + 1);
      if (answers[i] === idx + 1) btn.classList.add("active");
      optionsEl.appendChild(btn);
    });

    document.getElementById("progress-bar").style.width = `${(i / 30) * 100}%`;
  }

  function handleSelect(val) {
    answers[index] = val;
    localStorage.setItem("emotionTestAnswers", JSON.stringify(answers));

    if (index < 29) {
      setTimeout(() => renderQuestion(index + 1), 600);
    } else {
      setTimeout(() => (window.location.href = "result.html"), 600);
    }
  }

  renderQuestion(0);
}

// =====================
// 计算结果
// =====================
function calculateResult() {
  const answers = JSON.parse(localStorage.getItem("emotionTestAnswers")) || [];
  if (answers.length !== 30 || answers.includes(null)) {
    window.location.href = "test.html";
    return;
  }

  const total = answers.reduce((a, b) => a + b, 0);
  const stableIndex = Math.round((total / 150) * 100);

  const dims = { emotion_fluctuation: 0, stress_tolerance: 0, interpersonal_sensitivity: 0, self_repair: 0 };
  QUESTIONS.forEach((q, i) => (dims[q.dimension] += answers[i]));

  const normalize = (val) => Math.round((val / 37.5) * 100);

  return {
    stableIndex,
    dimensions: {
      emotion_fluctuation: normalize(dims.emotion_fluctuation),
      stress_tolerance: normalize(dims.stress_tolerance),
      interpersonal_sensitivity: normalize(dims.interpersonal_sensitivity),
      self_repair: normalize(dims.self_repair),
    },
  };
}

// =====================
// 渲染结果页
// =====================
function renderResultPage() {
  if (document.body.dataset.page !== "result") return;

  const res = calculateResult();
  if (!res) return;

  document.getElementById("stable-index").textContent = res.stableIndex;

  // 分类方式
  let type = "B";
  if (res.stableIndex >= 85) type = "S";
  else if (res.stableIndex >= 75) type = "A";
  else if (res.stableIndex >= 60) type = "B";
  else if (res.stableIndex >= 45) type = "C";
  else type = "D";

  document.getElementById("emotion-type").textContent = type;

  // 雷达图
  new Chart(document.getElementById("emotion-radar"), {
    type: "radar",
    data: {
      labels: ["情绪波动", "压力承受", "人际敏感度", "自我修复力"],
      datasets: [
        {
          data: [
            res.dimensions.emotion_fluctuation,
            res.dimensions.stress_tolerance,
            res.dimensions.interpersonal_sensitivity,
            res.dimensions.self_repair,
          ],
          backgroundColor: "rgba(127, 184, 164, 0.25)",
          borderColor: "rgba(92, 156, 133, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: { scales: { r: { min: 0, max: 100 } }, plugins: { legend: { display: false } } },
  });
}

// =====================
// 全局初始化
// =====================
document.addEventListener("DOMContentLoaded", () => {
  setupHomePage();
  renderTestPage();
  renderResultPage();
});


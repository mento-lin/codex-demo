/***************************************************
 * 情绪安稳度测评 —— 最终稳定版（本地 codes.json 兑换）
 * 适配 index.html / test.html / result.html 原始结构
 ***************************************************/

// ============ 读取兑换码 ===================
async function loadCodes() {
  try {
    const resp = await fetch("codes.json");
    return await resp.json();
  } catch (err) {
    console.error("codes.json 加载失败", err);
    return { codes: [] };
  }
}

// 验证兑换码
async function validateRedeemCode(inputCode) {
  const db = await loadCodes();
  if (!db.codes || db.codes.length === 0) return { ok: false };

  const item = db.codes.find(c => c.code === inputCode);
  if (!item) return { ok: false, error: "invalid" };

  return { ok: true };
}


// ============ 首页（index.html） ============

function setupHomePage() {
  const btn = document.getElementById("redeem-submit");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const code = document.getElementById("redeem-code").value.trim();
    const msg = document.getElementById("redeem-message");

    if (!code) {
      msg.textContent = "请输入兑换码";
      msg.style.color = "#d33";
      return;
    }

    const result = await validateRedeemCode(code);
    if (!result.ok) {
      msg.textContent = "兑换码无效";
      msg.style.color = "#d33";
      return;
    }

    // 保存兑换码 + 初始化答案
    localStorage.setItem("redeemCode", code);
    localStorage.setItem("emotionTestAnswers", JSON.stringify(Array(30).fill(null)));

    msg.textContent = "兑换成功，跳转中…";
    msg.style.color = "#2e7";

    setTimeout(() => {
      window.location.href = "test.html";
    }, 300);
  });
}


// ============ 题目（test.html） ============

const QUESTIONS = [...Array(30)].map((_, i) => ({
  id: i + 1,
  text: `【示例题目 ${i + 1}】请在 script.js 中替换为正式题库`, // 你可以换成正式题
}));

const OPTION_TEXTS = ["非常不符合", "有点不符合", "一般般", "比较符合", "非常符合"];

function setupTestPage() {
  if (document.body.dataset.page !== "test") return;

  const answers = JSON.parse(localStorage.getItem("emotionTestAnswers")) || Array(30).fill(null);
  let index = 0;

  const qText = document.getElementById("question-text");
  const qNum = document.getElementById("question-number");
  const optionsEl = document.getElementById("options");
  const bar = document.getElementById("progress-bar");

  function render(i) {
    index = i;

    qText.textContent = QUESTIONS[i].text;
    qNum.textContent = `第 ${i + 1} 题 / 共 30 题`;

    optionsEl.innerHTML = "";
    OPTION_TEXTS.forEach((txt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = `${"ABCDE"[idx]}  ${txt}`;
      if (answers[i] === idx + 1) btn.classList.add("active");

      btn.onclick = () => select(idx + 1);
      optionsEl.appendChild(btn);
    });

    bar.style.width = `${(i / 30) * 100}%`;
  }

  function select(val) {
    answers[index] = val;
    localStorage.setItem("emotionTestAnswers", JSON.stringify(answers));

    if (index < 29) {
      setTimeout(() => render(index + 1), 500);
    } else {
      setTimeout(() => {
        window.location.href = "result.html";
      }, 500);
    }
  }

  render(0);
}


// ============ 结果页（result.html） ============

function setupResultPage() {
  if (document.body.dataset.page !== "result") return;

  const answers = JSON.parse(localStorage.getItem("emotionTestAnswers")) || [];

  if (answers.length !== 30 || answers.includes(null)) {
    window.location.href = "test.html";
    return;
  }

  const total = answers.reduce((a, b) => a + b, 0);
  const stableIndex = Math.round((total / 150) * 100);

  document.getElementById("stable-index").textContent = stableIndex;

  let type = "B";
  if (stableIndex >= 85) type = "S";
  else if (stableIndex >= 75) type


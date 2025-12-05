/* =========================================================
   兑换码：从 /emotion_test/codes.json 本地读取
========================================================= */
async function loadCodes() {
  try {
    const res = await fetch("/codes.json", {
      headers: { "Cache-Control": "no-cache" }
    });

    if (!res.ok) {
      console.error("加载 codes.json 失败：", res.status);
      return [];
    }

    const data = await res.json();
    return data.codes.map(c => c.code.toUpperCase());
  } catch (err) {
    console.error("读取兑换码异常：", err);
    return [];
  }
}

/* =========================================================
   首页 / 兑换入口
========================================================= */
function setupHomePage() {
  const startBtn = document.getElementById("redeemBtn");
  const redeemInput = document.getElementById("redeemInput");
  const redeemMessage = document.getElementById("redeemMessage");

  if (!startBtn || !redeemInput) return;

  startBtn.addEventListener("click", async () => {
    const raw = redeemInput.value || "";
    const code = raw.trim().toUpperCase();

    if (!code) {
      redeemMessage.textContent = "请输入兑换码才能开始测评噢～";
      redeemMessage.style.color = "#e03e3e";
      return;
    }

    const list = await loadCodes();
    if (!list.includes(code)) {
      redeemMessage.textContent = "兑换码无效，请检查是否输入正确～";
      redeemMessage.style.color = "#e03e3e";
      return;
    }

    redeemMessage.textContent = "兑换成功！正在进入测评...";
    redeemMessage.style.color = "#4CAF50";

    localStorage.setItem("emotion_test_redeem", code);

    setTimeout(() => {
      window.location.href = "test.html";
    }, 500);
  });
}

/* =========================================================
   测题逻辑
========================================================= */
const questions = [
  "我能觉察到情绪的起伏，并尝试温柔地安放它们。",
  "遇到压力时，我通常能保持一定的冷静。",
  "我能较快从情绪波动中恢复。",
  "在紧张或变化时，我仍能维持基本节奏。",
  "情绪来临时，我不会压抑，而是允许它出现。",
  "我能注意到身体发出的紧张信号，如呼吸或心跳变化。",
  "我能在情绪不佳时，主动寻求让自己安稳的方法。",
  "遇到问题时，我能先停一下，而不是立刻慌乱。",
  "我能区分“情绪”和“事实”，不容易被情绪带着跑。",
  "我能在表达需求时保持平和。",
  "我能觉察“我现在可能累了，需要休息”。",
  "我能在混乱中找到一点秩序，让自己安定下来。",
  "我能感觉到哪些事情容易触发我，并尝试避免或调整。",
  "我能对自己保持耐心，不会强迫自己快速好起来。",
  "我愿意花时间照顾自己的感受，而不是忽略它们。",
  "在压力大的情况下，我依然能完成必要的任务。",
  "我能觉察到别人情绪，并保持适度共情但不被吞没。",
  "我能识别出“我现在可能想太多了”。",
  "我能接受自己暂时状态不佳，而不是责怪自己。",
  "我能在混乱里找到一种安全感。",
  "我能较好恢复精力，而不会持续低落太久。",
  "我能识别情绪的来源，而不是只看到表面。",
  "我能在困难中保持希望感。",
  "我会主动寻找让自己放松的方式。",
  "我能稳定处理多件事情，而不会一下被压垮。",
  "当事情变多时，我会慢慢理清并安排，不让压力压过自己。",
  "我能在内心混乱时停下来整理思绪。",
  "我能较好维持生活节奏，不会突然完全乱掉。",
  "我能觉察到自己正在情绪化，并尝试调整。",
  "我能在崩溃前察觉信号并采取措施避免。"
];

function setupTestPage() {
  const qText = document.getElementById("question");
  const progress = document.getElementById("progress");
  const options = document.querySelectorAll(".option");
  const indexText = document.getElementById("index");

  if (!qText) return;

  let index = Number(localStorage.getItem("emotion_test_index") || 0);
  let answers = JSON.parse(localStorage.getItem("emotion_test_answers") || "[]");

  function render() {
    if (index >= questions.length) {
      window.location.href = "result.html";
      return;
    }
    qText.textContent = questions[index];
    indexText.textContent = `${index + 1} / ${questions.length}`;
    progress.style.width = `${((index) / questions.length) * 100}%`;
  }

  options.forEach((btn, score) => {
    btn.addEventListener("click", () => {
      answers[index] = score + 1; // 1～5分
      localStorage.setItem("emotion_test_answers", JSON.stringify(answers));

      index++;
      localStorage.setItem("emotion_test_index", index);

      if (index >= questions.length) {
        window.location.href = "result.html";
      } else {
        render();
      }
    });
  });

  render();
}

/* =========================================================
   结果页渲染
========================================================= */
function setupResultPage() {
  const scoreText = document.getElementById("final-score");
  if (!scoreText) return;

  const answers = JSON.parse(localStorage.getItem("emotion_test_answers") || "[]");
  const sum = answers.reduce((a, b) => a + b, 0);
  const total = questions.length * 5;
  const score = Math.round((sum / total) * 100);

  scoreText.textContent = score;

  // 渲染雷达图（占位）
  const radar = document.getElementById("radar");
  if (radar) {
    radar.textContent = "（此处呈现雷达图，可后续替换成 Canvas 图表）";
  }
}

/* =========================================================
   生成图片（保存报告）
========================================================= */
document.addEventListener("click", e => {
  if (e.target.id === "save-report-btn") {
    const target = document.getElementById("report-root");
    if (!target) return;

    html2canvas(target, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "emotion-report.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
});

/* =========================================================
   页面入口
========================================================= */
function init() {
  setupHomePage();
  setupTestPage();
  setupResultPage();
}

document.addEventListener("DOMContentLoaded", init);


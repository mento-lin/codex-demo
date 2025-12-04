const axios = require("axios");
const { getTenantAccessToken } = require("./redeem");

async function getTenantToken() {
  const resp = await axios.post(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
    }
  );
  return resp.data.tenant_access_token;
const {
  FEISHU_BASE_ID,
  RESULTS_TABLE_ID,
} = process.env;

function sendError(res, statusCode, message, detail) {
  if (detail) {
    console.error("submit error detail", detail?.response?.data || detail.message || detail);
  }
  res.status(statusCode).json({ success: false, message });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { score, uid } = req.body;
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch (err) {
      return res.status(400).json({ success: false, message: "请求体格式错误" });
    }
  }

  const { uid, score, dimensions } = body || {};
  if (!uid || typeof uid !== "string" || typeof score !== "number") {
    return res.status(400).json({ success: false, message: "uid 或 score 无效" });
  }

  try {
    const token = await getTenantToken();
    const token = await getTenantAccessToken();
    const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${RESULTS_TABLE_ID}/records`;
    const fields = {
      uid,
      score,
      created_at: new Date().toISOString(),
    };

    if (dimensions && typeof dimensions === "object") {
      const { emotion_fluctuation, stress_tolerance, interpersonal_sensitivity, self_repair } = dimensions;
      if (typeof emotion_fluctuation === "number") fields.emotion_fluctuation = emotion_fluctuation;
      if (typeof stress_tolerance === "number") fields.stress_tolerance = stress_tolerance;
      if (typeof interpersonal_sensitivity === "number") fields.interpersonal_sensitivity = interpersonal_sensitivity;
      if (typeof self_repair === "number") fields.self_repair = self_repair;
      fields.dimensions = JSON.stringify(dimensions);
    }

    await axios.post(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.RESULTS_TABLE_ID}/records`,
      {
        fields: { uid, score }
      },
      url,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json({ success: true });
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).json({ success: false, message: "提交失败" });
    return res.status(200).json({ success: true, message: "记录成功" });
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      return res.status(200).json({ success: false, message: "服务暂时不可用，请稍后重试" });
    }
    return sendError(res, 500, "服务暂时不可用，请稍后重试", err);
  }
};







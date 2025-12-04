// 测试结果写入接口
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
const FEISHU_BASE_ID = process.env.FEISHU_BASE_ID;
const RESULTS_TABLE_ID = process.env.RESULTS_TABLE_ID;

function sendError(res, statusCode, message, detail) {
  if (detail) {
    console.error("[submit]", detail);
  }
  return res.status(statusCode).json({ success: false, message });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
    res.setHeader("Allow", "POST");
    return sendError(res, 405, "Method Not Allowed");
  }

  const { score, uid } = req.body;
  const { uid, score } = req.body || {};
  if (!uid || typeof uid !== "string" || typeof score !== "number" || Number.isNaN(score)) {
    return res.status(400).json({ success: false, message: "参数不完整，需包含 uid 与 score（数字）" });
  }

  try {
    const token = await getTenantToken();
    const token = await getTenantAccessToken();
    const payload = {
      records: [
        {
          fields: {
            uid,
            score,
            created_at: new Date().toISOString()
          }
        }
      ]
    };

    await axios.post(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.RESULTS_TABLE_ID}/records`,
      {
        fields: { uid, score }
      },
    const createResp = await axios.post(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${RESULTS_TABLE_ID}/records`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ success: true });
  } catch (e) {
    console.error(e.response?.data || e);
    res.status(500).json({ success: false, message: "提交失败" });
    const createData = createResp.data;
    if (createData.code !== 0) {
      return sendError(res, 500, "服务暂时不可用，请稍后重试", createData);
    }

    return res.json({ success: true, message: "结果已保存" });
  } catch (error) {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.error("[submit] feishu auth", error.response.data);
      return res
        .status(503)
        .json({ success: false, message: "服务暂时不可用，请稍后重试" });
    }
    return sendError(res, 500, "服务器异常，请稍后再试", error.response?.data || error.message);
  }
};





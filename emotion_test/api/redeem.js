const axios = require("axios");

async function getTenantToken() {
  const resp = await axios.post(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
    }
  );
const {
  FEISHU_APP_ID,
  FEISHU_APP_SECRET,
  FEISHU_BASE_ID,
  REDEEM_TABLE_ID,
} = process.env;

// 获取 tenant_access_token
async function getTenantAccessToken() {
  const url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal";
  const payload = {
    app_id: FEISHU_APP_ID,
    app_secret: FEISHU_APP_SECRET,
  };
  const resp = await axios.post(url, payload, { headers: { "Content-Type": "application/json" } });
  if (resp.data?.code !== 0 || !resp.data?.tenant_access_token) {
    throw new Error(`获取 tenant_access_token 失败: ${JSON.stringify(resp.data)}`);
  }
  return resp.data.tenant_access_token;
}

function sendError(res, statusCode, message, detail) {
  if (detail) {
    console.error("redeem error detail", detail?.response?.data || detail.message || detail);
  }
  res.status(statusCode).json({ success: false, message });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { code, order_id } = req.body;
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch (err) {
      return res.status(400).json({ success: false, message: "请求体格式错误" });
    }
  }

  if (!code) {
    return res.status(400).json({ success: false, message: "兑换码不能为空" });
  const { code, order_id } = body || {};
  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(200).json({ success: false, message: "兑换码不能为空" });
  }

  try {
    const token = await getTenantToken();
    const token = await getTenantAccessToken();
    const baseUrl = `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${REDEEM_TABLE_ID}/records`;
    const filter = encodeURIComponent(`CurrentValue.code=\"${code}\"`);
    const listResp = await axios.get(`${baseUrl}?filter=${filter}&page_size=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 查找兑换码
    const search = await axios.get(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records?filter=CurrentValue.code="${code}"`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const record = search.data?.data?.items?.[0];
    if (!record) {
      return res.json({ success: false, message: "兑换码不存在" });
    const records = listResp.data?.data?.items || [];
    if (!records.length) {
      return res.status(200).json({ success: false, message: "兑换码不存在" });
    }

    if (record.fields.status !== "未使用") {
      return res.json({ success: false, message: "兑换码已被使用" });
    const record = records[0];
    const status = record.fields?.status;
    if (status !== "未使用") {
      return res.status(200).json({ success: false, message: "兑换码已被使用" });
    }

    // 更新记录
    await axios.patch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records/${record.record_id}`,
    const recordId = record.record_id;
    const now = new Date().toISOString();
    await axios.put(
      `${baseUrl}/${recordId}`,
      {
        fields: {
          status: "已使用",
          order_id,
          used_time: new Date().toISOString()
        }
          order_id: order_id || "",
          used_time: now,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.json({ success: true, message: "兑换成功，可以开始测试" });

  } catch (e) {
    console.error(e.response?.data || e);
    return res.status(500).json({ success: false, message: "服务器错误" });
    return res.status(200).json({ success: true, message: "兑换成功" });
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      return res.status(200).json({ success: false, message: "服务暂时不可用，请稍后重试" });
    }
    return sendError(res, 500, "服务暂时不可用，请稍后重试", err);
  }
};

module.exports.getTenantAccessToken = getTenantAccessToken;


const axios = require("axios");
const FEISHU_BASE_ID = process.env.FEISHU_BASE_ID;
const REDEEM_TABLE_ID = process.env.REDEEM_TABLE_ID;
const APP_ID = process.env.FEISHU_APP_ID;
const APP_SECRET = process.env.FEISHU_APP_SECRET;

async function getTenantToken() {
  const resp = await axios.post(
async function getTenantAccessToken() {
  const response = await fetch(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
    }
  );
  return resp.data.tenant_access_token;
  const data = await response.json();
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(data.msg || "获取 tenant_access_token 失败");
  }
  return data.tenant_access_token;
}

function sendError(res, status, message, detail) {
  if (detail) console.error(detail);
  return res.status(status).json({ success: false, message });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
    return sendError(res, 405, "Method Not Allowed");
  }

  const { code, order_id } = req.body;

  const { code, order_id } = req.body || {};
  if (!code) {
    return res.status(400).json({ success: false, message: "兑换码不能为空" });
    return sendError(res, 400, "兑换码不能为空");
  }

  try {
    const token = await getTenantToken();
    const token = await getTenantAccessToken();

    // 查找兑换码
    const search = await axios.get(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records?filter=CurrentValue.code="${code}"`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    const filter = encodeURIComponent(`CurrentValue.code="${code}"`);
    const searchResp = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${REDEEM_TABLE_ID}/records?filter=${filter}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const searchData = await searchResp.json();
    if (searchData.code !== 0) {
      return sendError(res, 500, "查询兑换码失败", searchData);
    }

    const record = search.data?.data?.items?.[0];
    const record = searchData.data?.items?.[0];
    if (!record) {
      return res.json({ success: false, message: "兑换码不存在" });
      return sendError(res, 404, "兑换码不存在");
    }

    if (record.fields.status !== "未使用") {
      return res.json({ success: false, message: "兑换码已被使用" });
    const status = record.fields?.status;
    if (status !== "未使用") {
      return sendError(res, 400, "兑换码已被使用");
    }

    // 更新记录
    await axios.patch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records/${record.record_id}`,
      {
        fields: {
          status: "已使用",
          order_id,
          used_time: new Date().toISOString()
        }
      },
    const patchResp = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${REDEEM_TABLE_ID}/records/${record.record_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            status: "已使用",
            order_id: order_id || record.fields?.order_id || "",
            used_time: new Date().toISOString()
          }
        })
      }
    );

    return res.json({ success: true, message: "兑换成功，可以开始测试" });
    const patchData = await patchResp.json();
    if (patchData.code !== 0) {
      return sendError(res, 500, "更新兑换码状态失败", patchData);
    }

  } catch (e) {
    console.error(e.response?.data || e);
    return res.status(500).json({ success: false, message: "服务器错误" });
    return res.json({ success: true, message: "兑换成功，可以开始测试" });
  } catch (error) {
    return sendError(res, 500, "服务器异常，请稍后再试", error);
  }
};


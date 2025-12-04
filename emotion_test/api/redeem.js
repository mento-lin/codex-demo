// 兑换码校验与状态更新接口
const axios = require("axios");

async function getTenantToken() {
  const resp = await axios.post(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
const FEISHU_BASE_ID = process.env.FEISHU_BASE_ID;
const REDEEM_TABLE_ID = process.env.REDEEM_TABLE_ID;
const APP_ID = process.env.FEISHU_APP_ID;
const APP_SECRET = process.env.FEISHU_APP_SECRET;

// 统一错误输出
function sendError(res, statusCode, message, detail) {
  if (detail) {
    console.error("[redeem]", detail);
  }
  return res.status(statusCode).json({ success: false, message });
}

// 获取 tenant_access_token
async function getTenantAccessToken() {
  try {
    const response = await axios.post(
      "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
      {
        app_id: APP_ID,
        app_secret: APP_SECRET
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data;
    if (data.code !== 0 || !data.tenant_access_token) {
      throw new Error(data.msg || "获取 tenant_access_token 失败");
    }
  );
  return resp.data.tenant_access_token;
    return data.tenant_access_token;
  } catch (error) {
    console.error("[redeem] token error", error.response?.data || error.message);
    throw new Error("获取 tenant_access_token 失败");
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
    res.setHeader("Allow", "POST");
    return sendError(res, 405, "Method Not Allowed");
  }

  const { code, order_id } = req.body;

  const { code, order_id } = req.body || {};
  if (!code) {
    return res.status(400).json({ success: false, message: "兑换码不能为空" });
  }

  try {
    const token = await getTenantToken();
    const token = await getTenantAccessToken();

    // 查找兑换码
    const search = await axios.get(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records?filter=CurrentValue.code="${code}"`,
    // 查询兑换码
    const listResp = await axios.get(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${REDEEM_TABLE_ID}/records`,
      {
        params: {
          filter: `CurrentValue.code="${code}"`
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const record = search.data?.data?.items?.[0];
    const listData = listResp.data;
    if (listData.code !== 0) {
      return sendError(res, 500, "服务暂时不可用，请稍后重试", listData);
    }

    const record = listData.data?.items?.[0];
    if (!record) {
      return res.json({ success: false, message: "兑换码不存在" });
      return res.status(404).json({ success: false, message: "兑换码不存在" });
    }

    if (record.fields.status !== "未使用") {
      return res.json({ success: false, message: "兑换码已被使用" });
    if (record.fields?.status !== "未使用") {
      return res.status(400).json({ success: false, message: "兑换码已被使用" });
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
    // 更新状态
    const updatePayload = {
      fields: {
        status: "已使用",
        used_time: new Date().toISOString(),
        ...(order_id ? { order_id } : {})
      }
    };

    const updateResp = await axios.patch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_ID}/tables/${REDEEM_TABLE_ID}/records/${record.record_id}`,
      updatePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.json({ success: true, message: "兑换成功，可以开始测试" });
    const updateData = updateResp.data;
    if (updateData.code !== 0) {
      return sendError(res, 500, "服务暂时不可用，请稍后重试", updateData);
    }

  } catch (e) {
    console.error(e.response?.data || e);
    return res.status(500).json({ success: false, message: "服务器错误" });
    return res.json({ success: true, message: "兑换成功，可以开始测试" });
  } catch (error) {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.error("[redeem] feishu auth", error.response.data);
      return res
        .status(503)
        .json({ success: false, message: "服务暂时不可用，请稍后重试" });
    }
    return sendError(res, 500, "服务器异常，请稍后再试", error.response?.data || error.message);
  }
};

module.exports.getTenantAccessToken = getTenantAccessToken;


const axios = require("axios");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code, order_id } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "兑换码不能为空" });
  }

  try {
    // 搜记录
    const searchResp = await axios.get(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records?filter=CurrentValue.code="${code}"`,
      { headers: { Authorization: `Bearer ${process.env.FEISHU_APP_SECRET}` } }
    );

    const record = searchResp.data?.data?.items?.[0];
    if (!record) {
      return res.json({ success: false, message: "兑换码不存在" });
    }

    if (record.fields.status !== "未使用") {
      return res.json({ success: false, message: "兑换码已被使用" });
    }

    // 更新记录
    await axios.patch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.REDEEM_TABLE_ID}/records/${record.record_id}`,
      {
        fields: {
          status: "已使用",
          order_id,
          used_at: new Date().toISOString()
        }
      },
      { headers: { Authorization: `Bearer ${process.env.FEISHU_APP_SECRET}` } }
    );

    return res.json({ success: true, message: "兑换成功，可以开始测试" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

